import { useState } from 'react'
import { personaGuideExample, therapistAvatar } from '../../data/mock'
import { useToast } from '../../components/Toast'

const allTraits = ['温暖克制', '不评判', '少鸡汤', '可行动', '东方留白', '专业清晰', '轻幽默']

export default function Persona() {
  const { toast } = useToast()
  const [traits, setTraits] = useState(['温暖克制', '不评判', '少鸡汤', '可行动', '东方留白'])
  const [guide, setGuide] = useState(personaGuideExample)
  const [sample, setSample] = useState('')
  const [result, setResult] = useState('')

  const toggle = (t: string) => {
    setTraits((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  const detect = () => {
    const bad = /保证|治愈率|一定能|必须马上/.test(sample)
    setResult(
      bad
        ? '检测到风险表述：含保证/疗效暗示。建议改为探索性、可行动的表达。例如将「一定能变好」改为「我们可以一起练习看见卡住的模式」。'
        : '通过人设护栏：语气与禁止项匹配良好。可保持温暖克制与可行动建议，避免医疗化口吻。',
    )
    toast(bad ? '检测到需调整的表述' : '检测通过')
  }

  return (
    <>
      <p className="page-intro">人设护栏：勾选语气标签、编辑指南，并对文案做本地检测。</p>
      <div className="grid grid-2">
        <div className="card">
          <div className="person-row" style={{ marginBottom: 12 }}>
            <img className="avatar-lg" src={therapistAvatar} alt="疗愈师" />
            <div>
              <div className="title">执业人设 · 轻语</div>
              <div className="meta">暖陶气质 · 东方留白</div>
            </div>
          </div>
          <h3>语气画像</h3>
          <div className="chip-row">
            {allTraits.map((t) => (
              <button
                key={t}
                type="button"
                className={`tag ${traits.includes(t) ? 'jade' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggle(t)}
              >
                {traits.includes(t) ? `✓ ${t}` : t}
              </button>
            ))}
          </div>
          <label className="field" style={{ marginTop: 14 }}>
            <span>语气指南</span>
            <textarea
              rows={8}
              value={guide}
              onChange={(e) => setGuide(e.target.value)}
            />
          </label>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => toast('语气设置已保存')}
            >
              保存语气
            </button>
          </div>
        </div>
        <div className="card">
          <h3>禁止 / 慎用</h3>
          <ul className="list">
            {[
              '保证疗效、治愈率数字',
              '贬低其他流派或同行',
              '未标注的案例细节',
              '医疗诊断口吻',
            ].map((x) => (
              <li className="list-item" key={x}>
                <div className="title">{x}</div>
                <span className="tag rose">拦截</span>
              </li>
            ))}
          </ul>
          <label className="field" style={{ marginTop: 12 }}>
            <span>检测一段文案</span>
            <textarea
              rows={5}
              value={sample}
              onChange={(e) => setSample(e.target.value)}
              placeholder="粘贴待发布文案…"
            />
          </label>
          {result && <div className="note-block" style={{ marginTop: 10 }}>{result}</div>}
          <div className="btn-row">
            <button type="button" className="btn" onClick={detect}>
              开始检测
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
