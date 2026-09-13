import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useToast } from './Toast'

const titles: Record<string, string> = {
  '/': '工作台首页',
  '/practice/pre': '会前准备',
  '/practice/during': '会中辅助',
  '/practice/post': '会后整理',
  '/practice/cases': '个案档案',
  '/practice/compliance': '合规提醒',
  '/content/topics': '选题灵感',
  '/content/adapt': '多平台改编',
  '/content/moments': '朋友圈',
  '/content/poster': '海报示意',
  '/content/persona': '人设护栏',
  '/sales/dm': '私信初筛',
  '/sales/diagnosis': '诊断提纲',
  '/sales/quote': '方案报价',
  '/sales/objection': '异议库',
  '/delivery/open': '开个案',
  '/delivery/homework': '作业提醒',
  '/delivery/stage': '阶段小结',
  '/delivery/closing': '结案复购',
  '/delivery/reputation': '口碑回流',
  '/growth/reflection': '私人反思',
  '/growth/skills': '能力主题',
  '/growth/burnout': '倦怠预警',
  '/settings/account': '账号设置',
  '/settings/brand': '品牌语气',
  '/settings/templates': '模板库',
}

export default function Layout() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? '疗愈师工作台'
  const { toast } = useToast()
  const [panel, setPanel] = useState<'session' | 'assistant' | null>(null)
  const [sessionForm, setSessionForm] = useState({
    name: '',
    time: '15:00',
    mode: '视频',
    theme: '',
    note: '',
  })
  const [assistantInput, setAssistantInput] = useState('')
  const [assistantLog, setAssistantLog] = useState<
    { role: 'user' | 'bot'; text: string }[]
  >([
    {
      role: 'bot',
      text: '我可以帮你整理会前要点、润色作业提醒，或起草朋友圈文案。选一个快捷指令，或直接输入。',
    },
  ])

  const close = () => setPanel(null)

  const saveSession = () => {
    if (!sessionForm.name.trim()) {
      toast('请填写来访者化名')
      return
    }
    toast(`已加入今日排期：${sessionForm.time} · ${sessionForm.name}`)
    setSessionForm({ name: '', time: '15:00', mode: '视频', theme: '', note: '' })
    close()
  }

  const sendAssistant = (text?: string) => {
    const msg = (text ?? assistantInput).trim()
    if (!msg) return
    const replies: Record<string, string> = {
      会前摘要:
        '建议摘要：回顾上次身体信号练习 → 核验作业完成度 → 今日意图：巩固边界表达并引入需求清单。',
      作业提醒:
        '话术草稿：你好，轻轻提醒一下上周的小练习。若这周忙，完成一条也很珍贵。我在这里。',
      朋友圈:
        '文案草稿：边界不是墙，是一扇可以温柔开关的门。本周个案位已满，下月预约开放中。',
    }
    const bot =
      replies[msg] ??
      `已记录你的问题「${msg}」。本地示意回复：可从会前清单、作业粒度或人设语气三处切入。`
    setAssistantLog((prev) => [
      ...prev,
      { role: 'user', text: msg },
      { role: 'bot', text: bot },
    ])
    setAssistantInput('')
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <h2>{title}</h2>
          </div>
          <div className="topbar-actions">
            <button type="button" className="btn" onClick={() => setPanel('session')}>
              新建场次
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPanel('assistant')}
            >
              AI 助手
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>

      {panel && (
        <div className="modal-backdrop" onClick={close} role="presentation">
          <div
            className="modal drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {panel === 'session' ? (
              <>
                <h3>新建场次</h3>
                <p>填写后加入本机今日排期（本地状态，刷新可重置）。</p>
                <div className="form-stack">
                  <label className="field">
                    <span>来访者化名</span>
                    <input
                      value={sessionForm.name}
                      onChange={(e) =>
                        setSessionForm((s) => ({ ...s, name: e.target.value }))
                      }
                      placeholder="例如：晚舟"
                    />
                  </label>
                  <label className="field">
                    <span>时间</span>
                    <input
                      value={sessionForm.time}
                      onChange={(e) =>
                        setSessionForm((s) => ({ ...s, time: e.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>形式</span>
                    <select
                      value={sessionForm.mode}
                      onChange={(e) =>
                        setSessionForm((s) => ({ ...s, mode: e.target.value }))
                      }
                    >
                      <option>视频</option>
                      <option>线下</option>
                      <option>语音</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>主题</span>
                    <input
                      value={sessionForm.theme}
                      onChange={(e) =>
                        setSessionForm((s) => ({ ...s, theme: e.target.value }))
                      }
                      placeholder="例如：焦虑与睡眠"
                    />
                  </label>
                  <label className="field">
                    <span>会前备注</span>
                    <textarea
                      rows={3}
                      value={sessionForm.note}
                      onChange={(e) =>
                        setSessionForm((s) => ({ ...s, note: e.target.value }))
                      }
                      placeholder="可选：上次焦点、风险提示…"
                    />
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={close}>
                    取消
                  </button>
                  <button type="button" className="btn btn-primary" onClick={saveSession}>
                    加入排期
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>AI 助手</h3>
                <p>本地示意对话，不连接真实模型。</p>
                <div className="chip-row" style={{ marginBottom: 10 }}>
                  {['会前摘要', '作业提醒', '朋友圈'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="btn btn-sm"
                      onClick={() => sendAssistant(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="chat-log">
                  {assistantLog.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.role}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                <label className="field" style={{ marginTop: 12 }}>
                  <span>输入</span>
                  <textarea
                    rows={3}
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder="例如：帮我缩短予安的作业粒度"
                  />
                </label>
                <div className="modal-actions">
                  <button type="button" className="btn btn-ghost" onClick={close}>
                    关闭
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => sendAssistant()}
                  >
                    发送
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
