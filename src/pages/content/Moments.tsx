import { useState } from 'react'
import { contentDrafts } from '../../data/mock'
import { useToast } from '../../components/Toast'
import { asset } from '../../lib/asset'

const tones = [
  contentDrafts[2].body,
  `今天把心安放下来。

边界不是冷漠，是温柔地告诉世界：我也值得被好好对待。
你不需要一次变得很强硬——从一句「我需要五分钟」开始，就很好。

若你也在练习，留言「我停下来了」，我们彼此作见证。`,
  `晚场结束，给自己一杯温茶。

执业者也需要复位——把来访者的故事轻轻放回档案，把自己的身体领回家。
你也是。今晚只做一件小事：洗脸、深呼吸、早一点关灯。

我们慢慢来，不赶路。`,
]

const weekPlan = [
  { day: '周一', type: '专业洞察', text: '「说不」之后的内疚从哪来' },
  { day: '周三', type: '日常温度', text: '会前十分钟的着陆仪式' },
  { day: '周五', type: '轻邀约', text: '下月体验位开放提醒' },
  { day: '周日', type: '留白', text: '不发，只回复评论' },
]

export default function Moments() {
  const { toast, copyText } = useToast()
  const [text, setText] = useState(contentDrafts[2].body)
  const [toneIdx, setToneIdx] = useState(0)
  const [showCal, setShowCal] = useState(false)
  const [cal, setCal] = useState(weekPlan)

  return (
    <>
      <p className="page-intro">朋友圈：编辑示意稿、切换语气，并生成一周发布节奏。</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>今日文案</h3>
          <img
            className="cover-thumb"
            src={asset("/mock/thumb-moments.svg")}
            alt="朋友圈附图"
            style={{ maxHeight: 180, objectFit: 'contain' }}
          />
          <textarea
            className="field-area"
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="chip-row">
            {contentDrafts[2].tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={() => {
                const next = (toneIdx + 1) % tones.length
                setToneIdx(next)
                setText(tones[next])
                toast('已切换语气')
              }}
            >
              换语气
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => copyText(text, '朋友圈文案已复制')}
            >
              复制文案
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => toast('文案已保存到本地')}
            >
              保存
            </button>
          </div>
        </div>
        <div className="card">
          <h3>节奏建议</h3>
          <ul className="list">
            {[
              '每周 3–4 条：1 专业洞察 + 1 日常温度 + 1 轻邀约',
              '避开密集卖课日，留白建立信任',
              '评论区回复模板已绑定人设护栏',
              '配图优先暖色抽象封面，避免来访者可识别细节',
            ].map((x) => (
              <li className="list-item" key={x}>
                <div className="meta" style={{ margin: 0 }}>
                  {x}
                </div>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setShowCal(true)
                toast('一周日历已生成')
              }}
            >
              生成一周日历
            </button>
          </div>
          {showCal && (
            <ul className="list" style={{ marginTop: 12 }}>
              {cal.map((c, i) => (
                <li className="list-item" key={c.day}>
                  <div style={{ width: '100%' }}>
                    <div className="title">
                      {c.day} · {c.type}
                    </div>
                    <input
                      value={c.text}
                      onChange={(e) =>
                        setCal((prev) =>
                          prev.map((row, idx) =>
                            idx === i ? { ...row, text: e.target.value } : row,
                          ),
                        )
                      }
                      style={{
                        marginTop: 6,
                        width: '100%',
                        padding: '6px 8px',
                        borderRadius: 8,
                        border: '1px solid var(--line)',
                        background: 'var(--surface)',
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
