import { useState } from 'react'
import { contentDrafts, topicSparks as seed } from '../../data/mock'
import { useToast } from '../../components/Toast'
import { asset } from '../../lib/asset'

const extras = [
  {
    id: 'sp6',
    title: '当来访者说「我没事」',
    angle: '会谈技巧',
    heat: '新',
    cover: asset('/mock/cover-pre.svg'),
    outline:
      '大纲：\n1. 「我没事」背后常是不安全\n2. 不追问逼迫，用身体邀请\n3. 示范问句与停顿\n4. 小练习：会中多留 3 秒沉默\n5. CTA：执业笔记收藏',
  },
  {
    id: 'sp7',
    title: '讨好型人格的身体地图',
    angle: '身体觉察',
    heat: '热',
    cover: asset('/mock/cover-boundary.svg'),
    outline:
      '大纲：\n1. 胸口 / 喉咙 / 肩膀的常见信号\n2. 身体比语言更早知道\n3. 一张可打印的觉察卡\n4. 与边界短句联动\n5. CTA：留下你的「警报部位」',
  },
  {
    id: 'sp8',
    title: '给高压周的三分钟复位',
    angle: '自我照顾',
    heat: '稳',
    cover: asset('/mock/cover-rest.svg'),
    outline:
      '大纲：\n1. 高压周不是靠意志力熬\n2. 三分钟：呼吸、落地、一句对自己说的话\n3. 执业者与来访者通用\n4. 配图：暖色抽象\n5. CTA：今日完成一次复位打卡',
  },
]

export default function Topics() {
  const { toast, copyText } = useToast()
  const [sparks, setSparks] = useState(seed)
  const [outline, setOutline] = useState<Record<string, string>>({})
  const [editingDraft, setEditingDraft] = useState<string | null>(null)
  const [draftBody, setDraftBody] = useState('')

  return (
    <>
      <p className="page-intro">选题灵感：展开大纲、刷新一批，或打开已有草稿继续写。</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>灵感火花</h3>
          <ul className="list">
            {sparks.map((s) => (
              <li
                className="list-item"
                key={s.id}
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div style={{ display: 'flex', gap: 10 }}>
                  <img className="cover-thumb-sm" src={s.cover} alt="" />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <div className="title">{s.title}</div>
                      <div className="meta">
                        {s.angle} · {s.heat}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() =>
                        setOutline((prev) => ({
                          ...prev,
                          [s.id]: prev[s.id] || s.outline,
                        }))
                      }
                    >
                      展开大纲
                    </button>
                  </div>
                </div>
                {outline[s.id] && (
                  <>
                    <textarea
                      className="field-area"
                      style={{ marginTop: 8 }}
                      rows={8}
                      value={outline[s.id]}
                      onChange={(e) =>
                        setOutline((prev) => ({ ...prev, [s.id]: e.target.value }))
                      }
                    />
                    <div className="btn-row" style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => toast('大纲已保存')}
                      >
                        保存大纲
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => copyText(outline[s.id], '大纲已复制')}
                      >
                        复制
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSparks((prev) => {
                  const add = extras.filter((e) => !prev.some((p) => p.id === e.id))
                  if (!add.length) {
                    toast('已是最新一批灵感')
                    return prev
                  }
                  toast('已刷新选题')
                  return [...add, ...prev].slice(0, 6)
                })
              }}
            >
              再来一批
            </button>
          </div>
        </div>
        <div className="card">
          <h3>已有草稿</h3>
          <ul className="list">
            {contentDrafts.map((d) => (
              <li
                className="list-item"
                key={d.id}
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div style={{ display: 'flex', gap: 10 }}>
                  <img className="cover-thumb-sm" src={d.cover} alt="" />
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <div className="title">{d.title}</div>
                      <div className="meta">
                        {d.platform} · {d.status} · {d.updatedAt}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => {
                        setEditingDraft(d.id)
                        setDraftBody(d.body)
                      }}
                    >
                      打开
                    </button>
                  </div>
                </div>
                {editingDraft === d.id && (
                  <>
                    <textarea
                      className="field-area"
                      style={{ marginTop: 8 }}
                      rows={12}
                      value={draftBody}
                      onChange={(e) => setDraftBody(e.target.value)}
                    />
                    <div className="btn-row" style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          toast('草稿已保存')
                          setEditingDraft(null)
                        }}
                      >
                        保存
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => setEditingDraft(null)}
                      >
                        关闭
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
