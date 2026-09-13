import { useState } from 'react'
import { quoteNoteExample } from '../../data/mock'
import { useToast } from '../../components/Toast'

const plans = [
  {
    id: 'p1',
    name: '单次体验',
    price: '¥560',
    desc: '50 分钟 · 了解匹配度与主诉焦点，体验后可获简要书面建议（非诊断）。',
  },
  {
    id: 'p2',
    name: '起步包 · 4 次',
    price: '¥2,080',
    desc: '含会前知情同意、作业跟进、一次阶段小小结；适合主题清晰、希望建立节奏的来访者。',
  },
  {
    id: 'p3',
    name: '深度陪伴 · 12 次',
    price: '¥5,760',
    desc: '含阶段信、结案复盘与巩固建议；适合需要持续练习与模式重整的主题。',
  },
]

export default function Quote() {
  const { toast, copyText } = useToast()
  const [selected, setSelected] = useState('p2')
  const [client, setClient] = useState('阿柚')
  const [note, setNote] = useState(quoteNoteExample)
  const [quoteText, setQuoteText] = useState('')

  const plan = plans.find((p) => p.id === selected)!

  const gen = () => {
    const text = `方案报价单

来访者：${client}
方案：${plan.name}
费用：${plan.price}
说明：${plan.desc}

包含：
- 约定形式与时长内的一对一陪伴
- 会前知情同意与基本作业跟进
- （起步包及以上）阶段小结 / 结案相关文书

不含：
- 医疗诊疗与开药建议
- 危机紧急处置（将按协议协助转介）

备注：${note}

有效期：7 日
如有疑问，欢迎随时回复，我们按你的节奏确认。`
    setQuoteText(text)
    toast('报价单已生成')
  }

  return (
    <>
      <p className="page-intro">方案报价：选择套餐、填写对象，生成可复制的报价单文案。</p>
      <div className="grid grid-3">
        {plans.map((p) => (
          <div
            className="card"
            key={p.id}
            style={{
              outline: selected === p.id ? '2px solid var(--accent-soft)' : undefined,
              cursor: 'pointer',
            }}
            onClick={() => setSelected(p.id)}
          >
            <h3>
              {p.name}
              {selected === p.id && <span className="tag jade">已选</span>}
            </h3>
            <div
              className="num"
              style={{
                fontSize: 26,
                fontFamily: 'var(--serif)',
                color: 'var(--accent-deep)',
              }}
            >
              {p.price}
            </div>
            <p className="empty-hint" style={{ whiteSpace: 'pre-wrap' }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <div className="grid grid-2">
          <label className="field">
            <span>报价对象</span>
            <input value={client} onChange={(e) => setClient(e.target.value)} />
          </label>
          <label className="field">
            <span>备注</span>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={gen}>
            生成报价单
          </button>
        </div>
        {quoteText && (
          <>
            <textarea
              className="field-area"
              style={{ marginTop: 12 }}
              rows={16}
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
            />
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => copyText(quoteText, '报价单已复制')}
              >
                复制报价单
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
