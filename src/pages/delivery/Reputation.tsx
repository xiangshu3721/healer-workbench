import { useState } from 'react'
import { useToast } from '../../components/Toast'

const templates = [
  {
    id: 'r1',
    t: '感谢卡',
    d: '结案后 3 日发送，不索取好评',
    body: '谢谢你愿意被看见。这段路你已经走得很勇敢。不必回复，只是想把这份感谢轻轻放在这里。',
  },
  {
    id: 'r2',
    t: '转介话术',
    d: '「如果你身边有人……」温和版本',
    body: '如果你身边有人正在寻找一位能慢慢陪走的人，可以把我介绍给他们。没有压力，顺其自然就好。',
  },
  {
    id: 'r3',
    t: '匿名推荐',
    d: '可公开的一句话（经同意）',
    body: '「第一次觉得，说不也可以很温柔。」——来访者匿名',
  },
]

export default function Reputation() {
  const { toast, copyText } = useToast()
  const [open, setOpen] = useState<string | null>('r1')
  const [bodies, setBodies] = useState(
    Object.fromEntries(templates.map((t) => [t.id, t.body])),
  )
  const [sent, setSent] = useState<string[]>([])

  return (
    <>
      <p className="page-intro">口碑回流：打开模板、编辑文案，标记已发送。</p>
      <div className="grid grid-3">
        {templates.map((x) => (
          <div className="card" key={x.id}>
            <h3>
              {x.t}
              {sent.includes(x.id) && <span className="tag jade">已发送</span>}
            </h3>
            <p className="empty-hint">{x.d}</p>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setOpen((id) => (id === x.id ? null : x.id))}
            >
              {open === x.id ? '收起' : '打开模板'}
            </button>
            {open === x.id && (
              <>
                <textarea
                  className="field-area"
                  style={{ marginTop: 10 }}
                  rows={5}
                  value={bodies[x.id]}
                  onChange={(e) =>
                    setBodies((prev) => ({ ...prev, [x.id]: e.target.value }))
                  }
                />
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => copyText(bodies[x.id], `${x.t}已复制`)}
                  >
                    复制
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      setSent((prev) =>
                        prev.includes(x.id) ? prev : [...prev, x.id],
                      )
                      toast(`${x.t}已标记发送`)
                    }}
                  >
                    标记已发送
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
