import { useState } from 'react'
import { platformThumbs } from '../../data/mock'
import { useToast } from '../../components/Toast'

const platforms = [
  { name: '小红书', tip: '钩子 + 分段 + 行动号召' },
  { name: '公众号', tip: '深度叙事 + 结尾练习' },
  { name: '视频口播', tip: '45 秒开场 + 金句字幕' },
  { name: '朋友圈', tip: '短、暖、留白，不硬广' },
]

const adapted: Record<string, string> = {
  小红书: `你是不是总在关系里先退一步？

争论刚起，你已经先道歉了——
不是你真的错了，是身体比脑子更快。

边界不是冷漠——
是温柔地告诉对方：我也值得被好好对待。

它更像一扇带纱帘的门：
你可以看见外面，也可以选择何时打开。

试一次：争论时先说「我需要五分钟」。
五分钟不是惩罚，是给你的神经系统一点着陆时间。

评论区聊聊：你的第一次「停下来」，发生在什么场景？
#亲密关系 #边界感 #情绪练习`,
  公众号: `为什么你总在关系里「先退一步」

很多时候，退一步不是礼貌，而是恐惧：怕被嫌麻烦，怕失去连接。身体比语言更早知道——胸口发紧、喉咙发堵，于是你道歉、退让，事后却在角落里积压委屈。

边界不是墙，是一扇可以温柔开关的门。你可以看见外面，也可以选择开多大、何时打开。真正的亲密，往往需要一点停顿，而不是无限退让。

本周练习：
记录一次想讨好却停下来的瞬间——情境、身体感受、你对自己说的一句话。若只能完成一次，也足够珍贵。

把练习活在日常里，比读懂一百篇道理更靠近改变。`,
  视频口播: `【口播稿 · 约 55 秒】

开场：你是不是总先退一步？争论还没开始，道歉已经出口。

金句：边界不是冷漠，是温柔的自我安放。
它像一扇带纱帘的门——看得见，也守得住。

三点快讲：
1. 认出身体警报（胸口、喉咙）；
2. 先说「我需要五分钟」；
3. 五分钟后，再决定要不要继续谈。

收束：今天只练习一句——「我需要五分钟」。
留言「我停下来了」，我们互相作见证。`,
  朋友圈: `边界不是墙，是一扇可以温柔开关的门。

你不需要一次变得很强硬——
从一句「我需要五分钟」开始，就很好。

本周个案位已满，下月预约开放中。
若你正在寻找一位能陪你慢慢走的人，欢迎私信。`,
}

export default function Adapt() {
  const { toast, copyText } = useToast()
  const [source, setSource] = useState(
    '为什么你总在关系里「先退一步」——边界不是冷漠，是温柔地告诉对方：我也值得被好好对待。争论时先说「我需要五分钟」，比立刻道歉更能保护关系与自己。',
  )
  const [results, setResults] = useState<Record<string, string>>({})
  const [active, setActive] = useState('小红书')

  const generate = () => {
    setResults(adapted)
    toast('多平台改编已生成')
  }

  return (
    <>
      <p className="page-intro">多平台改编：编辑母稿后一键生成各平台语气，可复制与微调。</p>
      <div className="card" style={{ marginBottom: 14 }}>
        <h3>母稿</h3>
        <textarea
          className="field-area"
          rows={5}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={generate}>
            一键多平台改编
          </button>
        </div>
      </div>
      <div className="tabs" style={{ marginBottom: 12 }}>
        {platforms.map((p) => (
          <button
            key={p.name}
            type="button"
            className={`tab ${active === p.name ? 'active' : ''}`}
            onClick={() => setActive(p.name)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="grid grid-2">
        {platforms.map((p) => (
          <div
            className="card"
            key={p.name}
            style={{ opacity: active === p.name ? 1 : 0.72 }}
          >
            <h3>
              {p.name}
              <span className="card-sub">{p.tip}</span>
            </h3>
            <div className="platform-preview">
              <img src={platformThumbs[p.name]} alt={`${p.name}预览`} />
              <div className="meta" style={{ margin: 0 }}>
                平台预览缩略图 · 可随文案一并导出
              </div>
            </div>
            {results[p.name] ? (
              <textarea
                className="field-area"
                rows={10}
                value={results[p.name]}
                onChange={(e) =>
                  setResults((prev) => ({ ...prev, [p.name]: e.target.value }))
                }
              />
            ) : (
              <p className="empty-hint">点击上方「一键多平台改编」后显示结果。</p>
            )}
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-sm"
                disabled={!results[p.name]}
                onClick={() => copyText(results[p.name], `${p.name}文案已复制`)}
              >
                复制
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setResults((prev) => ({
                    ...prev,
                    [p.name]: adapted[p.name],
                  }))
                  setActive(p.name)
                  toast(`已载入 ${p.name} 改编`)
                }}
              >
                预览改编
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
