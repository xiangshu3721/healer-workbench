import { useState } from 'react'
import { complianceItems } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Compliance() {
  const { toast, copyText } = useToast()
  const [items, setItems] = useState(complianceItems)
  const [report, setReport] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const checkedCount = items.filter((i) => i.checked).length

  return (
    <>
      <p className="page-intro">
        合规提醒：勾选清单项、展开说明并生成检查报告。不构成法律建议。
      </p>
      <div className="card">
        <h3>
          合规清单
          <span className="card-sub">
            {checkedCount}/{items.length} 已勾选
          </span>
        </h3>
        <ul className="list">
          {items.map((i) => (
            <li
              className="list-item"
              key={i.id}
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={i.checked}
                    onChange={() =>
                      setItems((prev) =>
                        prev.map((x) =>
                          x.id === i.id ? { ...x, checked: !x.checked } : x,
                        ),
                      )
                    }
                  />
                  <div className="title">{i.title}</div>
                </label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={`tag ${i.level}`}>{i.status}</span>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setOpenId((id) => (id === i.id ? null : i.id))
                    }
                  >
                    {openId === i.id ? '收起' : '查看'}
                  </button>
                </div>
              </div>
              {openId === i.id && (
                <div className="note-block" style={{ marginTop: 8 }}>
                  「{i.title}」说明：请按本地执业规范定期复核。状态：{i.status}。
                  可在设置 → 模板中绑定对应文档。
                </div>
              )}
            </li>
          ))}
        </ul>
        {report && <div className="note-block" style={{ marginTop: 12 }}>{report}</div>}
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const pending = items.filter((i) => !i.checked).map((i) => i.title)
              const text = `合规检查报告\n已勾选 ${checkedCount}/${items.length}\n待办：${pending.length ? pending.join('、') : '无'}`
              setReport(text)
              toast('报告已生成')
            }}
          >
            生成合规检查报告
          </button>
          {report && (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(report, '报告已复制')}
            >
              复制报告
            </button>
          )}
        </div>
      </div>
    </>
  )
}
