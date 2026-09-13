import { useState } from 'react'
import { objections as seed } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Objection() {
  const { toast, copyText } = useToast()
  const [items, setItems] = useState(seed)
  const [rewriteId, setRewriteId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [nq, setNq] = useState('')
  const [na, setNa] = useState('')

  return (
    <>
      <p className="page-intro">异议库：复制回应、改写语气，或新增条目。</p>
      <div className="card">
        <ul className="list">
          {items.map((o) => (
            <li
              className="list-item"
              key={o.id}
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div className="title">「{o.q}」</div>
              {rewriteId === o.id ? (
                <textarea
                  className="field-area"
                  style={{ marginTop: 8 }}
                  rows={6}
                  value={o.a}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === o.id ? { ...x, a: e.target.value } : x,
                      ),
                    )
                  }
                />
              ) : (
                <div className="meta">{o.a}</div>
              )}
              <div className="meta">使用 {o.used} 次</div>
              <div className="btn-row" style={{ marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => copyText(o.a, '回应已复制')}
                >
                  复制回应
                </button>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => {
                    if (rewriteId === o.id) {
                      setRewriteId(null)
                      toast('改写已保存')
                    } else {
                      setItems((prev) =>
                        prev.map((x) =>
                          x.id === o.id
                            ? {
                                ...x,
                                a: `${x.a.replace(/。$/, '')}。我们可以按你的节奏慢慢来。`,
                              }
                            : x,
                        ),
                      )
                      setRewriteId(o.id)
                      toast('已生成更柔和版本，可继续编辑')
                    }
                  }}
                >
                  {rewriteId === o.id ? '完成改写' : '改写语气'}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAdd((v) => !v)}
          >
            {showAdd ? '取消' : '新增异议'}
          </button>
        </div>
        {showAdd && (
          <div style={{ marginTop: 12 }}>
            <label className="field">
              <span>来访者顾虑</span>
              <input value={nq} onChange={(e) => setNq(e.target.value)} />
            </label>
            <label className="field">
              <span>温和回应</span>
              <textarea rows={6} value={na} onChange={(e) => setNa(e.target.value)} />
            </label>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (!nq.trim() || !na.trim()) {
                    toast('请填写完整')
                    return
                  }
                  setItems((prev) => [
                    ...prev,
                    { id: `o${Date.now()}`, q: nq, a: na, used: 0 },
                  ])
                  setNq('')
                  setNa('')
                  setShowAdd(false)
                  toast('已新增异议条目')
                }}
              >
                保存条目
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
