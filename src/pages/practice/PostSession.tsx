import { useState } from 'react'
import { sessionNoteExample } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function PostSession() {
  const { toast, copyText } = useToast()
  const [notes, setNotes] = useState(sessionNoteExample.notes)
  const [homework, setHomework] = useState(sessionNoteExample.homework)
  const [nextPlan, setNextPlan] = useState(sessionNoteExample.nextPlan)
  const [actions, setActions] = useState([
    { id: 'a1', text: '发送作业提醒（微信模板）', done: false },
    { id: 'a2', text: '更新个案进度标签', done: false },
    { id: 'a3', text: '同步下次日历', done: true },
    { id: 'a4', text: '私人督导备忘（仅自己可见）', done: false },
  ])

  const polish = () => {
    setNotes(
      (n) =>
        `${n.trim()}\n\n（润色）本次工作焦点清晰：身体信号 → 命名感受 → 边界表达练习，语气由生硬转柔。来访者已能在真实争论中出现「停下来」的瞬间，下一步可引入需求清单，并留意加班周的情绪波动。`,
    )
    toast('记录已润色并写入本地状态')
  }

  return (
    <>
      <p className="page-intro">
        会后整理：可编辑场次记录、作业与下次计划，并勾选会后动作。
      </p>
      <div className="grid grid-2">
        <div className="card">
          <h3>
            场次记录
            <span className="card-sub">
              {sessionNoteExample.caseName} · {sessionNoteExample.date} ·{' '}
              {sessionNoteExample.duration}
            </span>
          </h3>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 8px' }}>
            焦点：{sessionNoteExample.focus}
          </p>
          {sessionNoteExample.mediaThumbs?.length > 0 && (
            <div className="media-row" style={{ marginBottom: 12 }}>
              {sessionNoteExample.mediaThumbs.map((src) => (
                <img key={src} className="media-thumb" src={src} alt="会后附图" />
              ))}
            </div>
          )}
          <label className="field">
            <span>过程记录</span>
            <textarea rows={12} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <label className="field">
            <span>作业</span>
            <textarea
              rows={6}
              value={homework}
              onChange={(e) => setHomework(e.target.value)}
            />
          </label>
          <label className="field">
            <span>下次计划</span>
            <textarea
              rows={5}
              value={nextPlan}
              onChange={(e) => setNextPlan(e.target.value)}
            />
          </label>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={polish}>
              AI 润色记录
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                toast('已生成 PDF 导出任务（本地示意）')
              }}
            >
              导出 PDF
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() =>
                copyText(
                  `${notes}\n\n作业：${homework}\n下次：${nextPlan}`,
                  '整段记录已复制',
                )
              }
            >
              复制全文
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => toast('会后记录已保存')}
            >
              保存
            </button>
          </div>
        </div>
        <div className="card">
          <h3>会后动作</h3>
          <ul className="list">
            {actions.map((x) => (
              <li className="list-item" key={x.id}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={x.done}
                    onChange={() =>
                      setActions((prev) =>
                        prev.map((a) =>
                          a.id === x.id ? { ...a, done: !a.done } : a,
                        ),
                      )
                    }
                  />
                  <div className={`title ${x.done ? 'done' : ''}`}>{x.text}</div>
                </label>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => {
                    setActions((prev) =>
                      prev.map((a) =>
                        a.id === x.id ? { ...a, done: true } : a,
                      ),
                    )
                    toast(`已执行：${x.text}`)
                  }}
                >
                  执行
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
