import { useState } from 'react'
import { cases, todaySessions } from '../../data/mock'
import { useToast } from '../../components/Toast'

const checklistInit = [
  { id: '1', text: '空间与设备就绪', done: false },
  { id: '2', text: '知情同意 / 隐私再确认', done: true },
  { id: '3', text: '情绪着陆 2 分钟', done: false },
  { id: '4', text: '打开个案要点卡', done: false },
]

export default function PreSession() {
  const focus = cases[0]
  const { toast, copyText } = useToast()
  const [intent, setIntent] = useState(
    '巩固边界表达，引入「需求清单」小练习：我需要什么 / 我愿意给什么 / 我暂不能给什么。留意近两周情绪波动，作业粒度可按加班周缩短。',
  )
  const [summary, setSummary] = useState('')
  const [checks, setChecks] = useState(checklistInit)
  const [hwOk, setHwOk] = useState(false)
  const [showNarrative, setShowNarrative] = useState(false)

  return (
    <>
      <p className="page-intro">
        会前：回顾上次要点、核对作业、设定今日意图。以「{focus.alias}」为例，可编辑并保存。
      </p>
      <div className="grid grid-2">
        <div className="card">
          <h3>下一场 · {todaySessions[1]?.time ?? '14:30'}</h3>
          <div className="list-item" style={{ marginBottom: 12 }}>
            <div className="person-row">
              <img className="avatar-lg" src={focus.avatar} alt={focus.alias} />
              <div>
                <div className="title">
                  {focus.name}（{focus.alias}）
                </div>
                <div className="meta">
                  {focus.theme} · 第 {focus.sessions + 1} 次
                </div>
              </div>
            </div>
            {focus.risk && <span className="tag rose">{focus.risk}</span>}
          </div>
          <div className="note-block">
            {focus.historySummary}
            {'\n\n'}上次焦点：识别讨好冲动的身体信号。
            {'\n'}作业：记录 2 次停下来的瞬间（{hwOk ? '已核验' : '待核验'}）。
          </div>
          {focus.mediaThumbs?.length > 0 && (
            <div className="media-row">
              {focus.mediaThumbs.map((src) => (
                <img key={src} className="media-thumb" src={src} alt="" />
              ))}
            </div>
          )}
          <div className="btn-row" style={{ marginTop: 10 }}>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setShowNarrative((v) => !v)}
            >
              {showNarrative ? '收起自述' : '看来访者自述'}
            </button>
          </div>
          {showNarrative && (
            <div className="note-block" style={{ marginTop: 10 }}>
              <strong>来访者自述</strong>
              {'\n'}
              {focus.selfNarrative}
              {'\n\n'}
              <strong>问卷要点</strong>
              {'\n'}
              {focus.questionnaire}
            </div>
          )}
          <label className="field" style={{ marginTop: 12 }}>
            <span>今日意图</span>
            <textarea
              rows={4}
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
            />
          </label>
          {summary && <div className="note-block" style={{ marginTop: 12 }}>{summary}</div>}
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSummary(
                  `会前摘要：${focus.alias} · ${focus.theme}\n意图：${intent}\n作业：${hwOk ? '已核验' : '待提醒'}\n风险：${focus.risk ?? '常规'}\n建议开场：先身体着陆，再回顾「五分钟」练习。`,
                )
                toast('会前摘要已生成')
              }}
            >
              生成会前摘要
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setHwOk(true)
                toast('作业已标记核验')
              }}
            >
              {hwOk ? '作业已核验' : '核对作业'}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(intent, '今日意图已复制')}
            >
              复制意图
            </button>
          </div>
        </div>
        <div className="card">
          <h3>
            会前清单
            <span className="card-sub">
              {checks.filter((c) => c.done).length}/{checks.length}
            </span>
          </h3>
          <ul className="list">
            {checks.map((x) => (
              <li className="list-item" key={x.id}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={x.done}
                    onChange={() =>
                      setChecks((prev) =>
                        prev.map((c) =>
                          c.id === x.id ? { ...c, done: !c.done } : c,
                        ),
                      )
                    }
                  />
                  <div className={`title ${x.done ? 'done' : ''}`}>{x.text}</div>
                </label>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                setChecks((prev) => prev.map((c) => ({ ...c, done: true })))
                toast('清单已全部完成')
              }}
            >
              全部完成
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
