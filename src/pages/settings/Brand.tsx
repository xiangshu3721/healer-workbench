import { useState } from 'react'
import { useToast } from '../../components/Toast'

const all = ['温暖', '克制', '专业', '留白', '可行动', '轻幽默', '直接']

export default function Brand() {
  const { toast, copyText } = useToast()
  const [tags, setTags] = useState(['温暖', '克制', '专业', '留白', '可行动'])
  const [guide, setGuide] = useState(
    '默认称呼来访者为「你」；避免「必须」「一定能」；结尾常留一个小练习。',
  )
  const [sample, setSample] = useState('')

  return (
    <>
      <p className="page-intro">品牌语气：与内容「人设护栏」联动的全局设置，可试写一段。</p>
      <div className="card">
        <div className="chip-row">
          {all.map((t) => (
            <button
              key={t}
              type="button"
              className={`tag ${tags.includes(t) ? 'jade' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                setTags((prev) =>
                  prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                )
              }
            >
              {tags.includes(t) ? `✓ ${t}` : t}
            </button>
          ))}
        </div>
        <label className="field" style={{ marginTop: 14 }}>
          <span>全局语气说明</span>
          <textarea
            rows={4}
            value={guide}
            onChange={(e) => setGuide(e.target.value)}
          />
        </label>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toast('品牌语气已保存')}
          >
            保存语气
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setSample(
                `试写（${tags.join('·')}）：\n边界不是冷漠，是温柔地告诉对方：我也值得被好好对待。今天，你愿意为自己守住的一小步是什么？`,
              )
              toast('已生成试写')
            }}
          >
            试写一段
          </button>
        </div>
        {sample && (
          <>
            <textarea
              className="field-area"
              style={{ marginTop: 12 }}
              rows={4}
              value={sample}
              onChange={(e) => setSample(e.target.value)}
            />
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => copyText(sample, '试写已复制')}
              >
                复制试写
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
