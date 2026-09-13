import { useState } from 'react'
import { stageLetterExample } from '../../data/mock'
import { useToast } from '../../components/Toast'
import { asset } from '../../lib/asset'

const nodes = [
  {
    id: 'n4',
    title: '第 4 次：目标校准',
    body: '校准目标是否仍贴合生活情境；调整作业粒度；确认身体觉察是否成为习惯。可写入：进展一句、卡住一句、下一阶段一个小目标。',
  },
  {
    id: 'n8',
    title: '第 8 次：模式看见',
    body: '看见重复模式（讨好 / 回避 / 过度负责），强化自我慈悲；用具体情境复盘，而非抽象标签。可附一张「模式触发—身体—旧反应—新选择」四格表。',
  },
  {
    id: 'n12',
    title: '第 12 次：结案预备',
    body: '梳理收获与可带走工具；讨论巩固计划与复购窗口；预演结案后的高风险情境。语气温暖、不制造依赖焦虑。',
  },
]

export default function Stage() {
  const { toast, copyText } = useToast()
  const [letter, setLetter] = useState(stageLetterExample)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <>
      <p className="page-intro">阶段小结：编辑阶段信，打开节点模板并复制分享。</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>林晓月 · 第 6 次节点</h3>
          <div className="media-row" style={{ marginBottom: 12 }}>
            <img className="media-thumb" src={asset("/mock/media-timeline.svg")} alt="时间线" />
            <img className="media-thumb" src={asset("/mock/media-session.svg")} alt="会谈附图" />
          </div>
          <textarea
            className="field-area"
            rows={16}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setLetter(
                  (l) =>
                    `${l.trim()}\n\n——阶段信已润色：语气更温暖，保留可行动建议，并强调「内疚可以坐一会儿」。`,
                )
                toast('阶段信已生成/润色')
              }}
            >
              生成阶段信
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => copyText(letter, '阶段信已复制，可分享给来访者')}
            >
              分享给来访者
            </button>
          </div>
        </div>
        <div className="card">
          <h3>模板节点</h3>
          <ul className="list">
            {nodes.map((x) => (
              <li
                className="list-item"
                key={x.id}
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="title">{x.title}</div>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setActiveNode((id) => (id === x.id ? null : x.id))
                    }
                  >
                    {activeNode === x.id ? '收起' : '打开'}
                  </button>
                </div>
                {activeNode === x.id && (
                  <div className="note-block" style={{ marginTop: 8 }}>
                    {x.body}
                    <div className="btn-row">
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => {
                          setLetter((l) => `${l.trim()}\n\n【套用 ${x.title}】\n${x.body}`)
                          toast('已套用到阶段信')
                        }}
                      >
                        套用到阶段信
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
