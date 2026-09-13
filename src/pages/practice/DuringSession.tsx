import { useState } from 'react'
import { duringQuestions, metaphors } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function DuringSession() {
  const { toast, copyText } = useToast()
  const [selected, setSelected] = useState<string[]>([])
  const [metaIdx, setMetaIdx] = useState(0)
  const [fav, setFav] = useState<string[]>([])
  const [protocolOpen, setProtocolOpen] = useState(false)
  const [notes, setNotes] = useState('')

  const toggleQ = (q: string) => {
    setSelected((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q],
    )
    toast(selected.includes(q) ? '已取消选用' : '已加入会中备选')
  }

  return (
    <>
      <p className="page-intro">
        会中辅助：静默提示卡、隐喻与提问备选。可选用、收藏，并在下方记录会中笔记。
      </p>
      <div className="grid grid-3">
        <div className="card">
          <h3>
            提问备选
            <span className="card-sub">已选 {selected.length}</span>
          </h3>
          <ul className="list">
            {duringQuestions.map((q) => (
              <li className="list-item" key={q}>
                <div className="meta" style={{ margin: 0 }}>
                  {q}
                </div>
                <button
                  type="button"
                  className={`btn btn-sm ${selected.includes(q) ? 'btn-primary' : ''}`}
                  onClick={() => toggleQ(q)}
                >
                  {selected.includes(q) ? '已选' : '选用'}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>隐喻库</h3>
          <div className="note-block">{metaphors[metaIdx]}</div>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={() => setMetaIdx((i) => (i + 1) % metaphors.length)}
            >
              换一条
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                const m = metaphors[metaIdx]
                if (!fav.includes(m)) setFav((f) => [...f, m])
                toast('已收藏隐喻')
              }}
            >
              收藏
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(metaphors[metaIdx], '隐喻已复制')}
            >
              复制
            </button>
          </div>
          {fav.length > 0 && (
            <div className="chip-row">
              {fav.map((f) => (
                <span className="tag jade" key={f.slice(0, 12)}>
                  已藏 · {f.slice(0, 10)}…
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3>风险静默提示</h3>
          <p className="empty-hint">当关键词触发时，侧栏轻提示（不打断来访者）。</p>
          <div className="chip-row">
            <span className="tag rose">自伤相关 → 协议路径</span>
            <span className="tag amber">危机升级 → 转介清单</span>
          </div>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setProtocolOpen((v) => !v)}
            >
              {protocolOpen ? '收起协议' : '查看协议'}
            </button>
          </div>
          {protocolOpen && (
            <div className="note-block" style={{ marginTop: 10 }}>
              1. 保持在场与安全评估{'\n'}
              2. 启用本地转介清单{'\n'}
              3. 必要时联系紧急联系人{'\n'}
              4. 会后完成危机记录
            </div>
          )}
        </div>
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <h3>会中速记</h3>
        <textarea
          className="field-area"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="静默记录关键词、身体信号、选用的提问…"
        />
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => toast('会中速记已保存')}
          >
            保存速记
          </button>
          {selected.length > 0 && (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() =>
                copyText(selected.join('\n'), '已复制选用提问')
              }
            >
              复制已选提问
            </button>
          )}
        </div>
      </div>
    </>
  )
}
