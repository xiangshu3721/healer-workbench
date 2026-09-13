import { useMemo, useState } from 'react'
import { salesLeads as seed, type SalesLead } from '../../data/mock'
import { useToast } from '../../components/Toast'

const stages: SalesLead['stage'][] = ['新私信', '已回复', '待体验', '已报价', '已搁置']

export default function DM() {
  const { toast, copyText } = useToast()
  const [leads, setLeads] = useState(seed)
  const [filter, setFilter] = useState<'全部' | SalesLead['stage']>('全部')
  const [openId, setOpenId] = useState<string | null>(seed[0]?.id ?? null)

  const list = useMemo(
    () => leads.filter((l) => filter === '全部' || l.stage === filter),
    [leads, filter],
  )

  const update = (id: string, patch: Partial<SalesLead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  return (
    <>
      <p className="page-intro">私信初筛：按阶段筛选、编辑回复草稿、推进线索状态。</p>
      <div className="tabs" style={{ marginBottom: 12 }}>
        {(['全部', ...stages] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`tab ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="card">
        <ul className="list">
          {list.map((l) => (
            <li
              className="list-item"
              key={l.id}
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div className="person-row">
                  <img className="avatar" src={l.avatar} alt="" />
                  <div>
                    <div className="title">
                      {l.name} · {l.channel}
                    </div>
                    <div className="meta">「{l.msg}」</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                  <span className={`tag ${l.tag}`}>{l.score}</span>
                  <span className="tag">{l.stage}</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setOpenId((id) => (id === l.id ? null : l.id))}
                  >
                    {openId === l.id ? '收起' : '回复'}
                  </button>
                </div>
              </div>
              {openId === l.id && (
                <>
                  <textarea
                    className="field-area"
                    style={{ marginTop: 10 }}
                    rows={8}
                    value={l.replyDraft}
                    onChange={(e) => update(l.id, { replyDraft: e.target.value })}
                  />
                  <div className="btn-row" style={{ marginTop: 8 }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        update(l.id, { stage: '已回复' })
                        toast(`已标记「${l.name}」为已回复`)
                      }}
                    >
                      标记已回复
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => copyText(l.replyDraft, '回复草稿已复制')}
                    >
                      复制回复
                    </button>
                    <select
                      value={l.stage}
                      onChange={(e) =>
                        update(l.id, { stage: e.target.value as SalesLead['stage'] })
                      }
                    >
                      {stages.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
