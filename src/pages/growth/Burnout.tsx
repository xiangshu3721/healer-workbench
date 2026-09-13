import { useState } from 'react'
import { loadReminders } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Burnout() {
  const { toast, copyText } = useToast()
  const [signals, setSignals] = useState(
    loadReminders.map((r, i) => ({ ...r, id: `b${i}`, ack: false })),
  )
  const [plan, setPlan] = useState(
    '本周至少留出半天空白；晚场后不做内容创作；与督导预约 1 次。',
  )
  const [reduced, setReduced] = useState(false)

  return (
    <>
      <p className="page-intro">倦怠预警：确认信号、编辑复位计划，并可标记减负。</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>当前信号</h3>
          <ul className="list">
            {signals.map((r) => (
              <li className="list-item" key={r.id}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={r.ack}
                    onChange={() =>
                      setSignals((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, ack: !x.ack } : x,
                        ),
                      )
                    }
                  />
                  <div className={`meta ${r.ack ? 'done' : ''}`} style={{ margin: 0 }}>
                    {r.text}
                  </div>
                </label>
                <span
                  className={`tag ${
                    r.level === '预警' ? 'rose' : r.level === '提醒' ? 'amber' : ''
                  }`}
                >
                  {r.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>复位建议</h3>
          <textarea
            className="field-area"
            rows={5}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
          <label className="check-row" style={{ marginTop: 10 }}>
            <input
              type="checkbox"
              checked={reduced}
              onChange={(e) => setReduced(e.target.checked)}
            />
            <span>本周已减少 1–2 场排期</span>
          </label>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setPlan(
                  (p) =>
                    `${p.trim()}\n\n附加：每天睡前 10 分钟无屏幕；周六上午空白。`,
                )
                toast('复位计划已生成')
              }}
            >
              生成复位计划
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setReduced(true)
                toast('已标记排期减负')
              }}
            >
              减少排期
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(plan, '复位计划已复制')}
            >
              复制计划
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
