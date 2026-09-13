import { useState } from 'react'
import { deliveryTasks as seed, homeworkRemindText } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Homework() {
  const { toast, copyText } = useToast()
  const [tasks, setTasks] = useState(
    seed.filter((t) => t.type === '作业' || t.type === '会前').concat([
      {
        id: 'hw-extra',
        caseAlias: '晓月',
        type: '作业',
        title: '作业已回传 · 待会前核验',
        due: '今日',
        done: true,
        priority: '低' as const,
      },
    ]),
  )
  const [filter, setFilter] = useState<'全部' | '待办' | '完成'>('全部')
  const [remind, setRemind] = useState(homeworkRemindText)
  const [showRemind, setShowRemind] = useState(false)

  const visible = tasks.filter((t) => {
    if (filter === '待办') return !t.done
    if (filter === '完成') return t.done
    return true
  })

  return (
    <>
      <p className="page-intro">作业提醒：筛选待办、一键复制话术并标记完成。</p>
      <div className="tabs" style={{ marginBottom: 12 }}>
        {(['全部', '待办', '完成'] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>提醒话术</h3>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setShowRemind((v) => !v)}
          >
            {showRemind ? '收起' : '编辑话术'}
          </button>
        </div>
        {showRemind && (
          <textarea
            className="field-area"
            style={{ marginTop: 10 }}
            rows={6}
            value={remind}
            onChange={(e) => setRemind(e.target.value)}
          />
        )}
        {!showRemind && (
          <p className="empty-hint" style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
            {remind.slice(0, 80)}…
          </p>
        )}
      </div>
      <div className="card">
        <ul className="list">
          {visible.map((t) => (
            <li className="list-item" key={t.id}>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setTasks((prev) =>
                      prev.map((x) =>
                        x.id === t.id ? { ...x, done: !x.done } : x,
                      ),
                    )
                  }
                />
                <div>
                  <div className={`title ${t.done ? 'done' : ''}`}>
                    {t.caseAlias} · {t.title}
                  </div>
                  <div className="meta">
                    {t.type} · 截止 {t.due}
                  </div>
                </div>
              </label>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                disabled={t.done}
                onClick={() => {
                  copyText(remind, `提醒话术已复制 · ${t.caseAlias}`)
                  setTasks((prev) =>
                    prev.map((x) => (x.id === t.id ? { ...x, done: true } : x)),
                  )
                }}
              >
                发送提醒
              </button>
            </li>
          ))}
        </ul>
        <div className="btn-row">
          <button
            type="button"
            className="btn"
            onClick={() => {
              const pending = tasks.filter((t) => !t.done)
              setTasks((prev) => prev.map((t) => ({ ...t, done: true })))
              toast(`已批量提醒 ${pending.length} 人（本地示意）`)
            }}
          >
            批量提醒
          </button>
        </div>
      </div>
    </>
  )
}
