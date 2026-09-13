import { useState } from 'react'
import { capabilityThemes as seed } from '../../data/mock'
import { useToast } from '../../components/Toast'

const tips: Record<string, string> = {
  情绪命名: '会中练习：请来访者用 3 个词描述此刻感受，再选一个身体位置。',
  边界设定示范: '角色扮演：先示范软弱版，再示范温柔坚定版，请对方挑选。',
  结案叙事: '用「看见—练习—带走」三段写结案信草稿。',
  内容人设一致: '发布前过一遍人设护栏检测。',
  危机识别: '复盘危机协议四步，更新本地转介名单。',
  作业设计: '把作业缩短到「一次记录 + 一句对自己说的话」。',
}

export default function Skills() {
  const { toast } = useToast()
  const [skills, setSkills] = useState(seed)
  const [open, setOpen] = useState<string | null>(null)

  return (
    <>
      <p className="page-intro">能力主题：查看进度条、展开练习建议，并可微调自评。</p>
      <div className="grid grid-2">
        {skills.map((c) => (
          <div className="card" key={c.name}>
            <h3>
              {c.name}
              <span className="card-sub">{c.level}%</span>
            </h3>
            <div className="progress">
              <span style={{ width: `${c.level}%` }} />
            </div>
            <p className="empty-hint">{c.note}</p>
            <input
              type="range"
              min={0}
              max={100}
              value={c.level}
              onChange={(e) =>
                setSkills((prev) =>
                  prev.map((s) =>
                    s.name === c.name
                      ? { ...s, level: Number(e.target.value) }
                      : s,
                  ),
                )
              }
              style={{ width: '100%', marginTop: 8 }}
            />
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setOpen((n) => (n === c.name ? null : c.name))}
              >
                练习建议
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => toast(`${c.name} 自评已保存：${c.level}%`)}
              >
                保存自评
              </button>
            </div>
            {open === c.name && (
              <div className="note-block" style={{ marginTop: 10 }}>
                {tips[c.name] ?? '保持每周一次微练习即可。'}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
