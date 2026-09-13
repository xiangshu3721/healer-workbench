import { useState } from 'react'
import { diagnosisConclusionExample } from '../../data/mock'
import { useToast } from '../../components/Toast'

const outlineInit = [
  {
    id: '1',
    text: '此刻最想改变的一件事',
    note: '争论时总先道歉事后委屈；希望能先停五分钟再决定开口。',
    done: true,
  },
  {
    id: '2',
    text: '已尝试过的方法与卡住的地方',
    note: '看过书、做过深呼吸；一到现场身体先紧，仍会自动退让。',
    done: true,
  },
  {
    id: '3',
    text: '期待的陪伴方式（频率 / 线上线下）',
    note: '每周一次，视频或线下均可；希望有可练的小作业。',
    done: true,
  },
  {
    id: '4',
    text: '预算与时间边界',
    note: '可接受起步包；工作日晚间或周末白天。',
    done: false,
  },
  {
    id: '5',
    text: '是否有危机或医疗协同需求',
    note: '无自伤想法；睡眠尚可；暂无医疗协同。',
    done: true,
  },
]

export default function Diagnosis() {
  const { toast, copyText } = useToast()
  const [items, setItems] = useState(outlineInit)
  const [openId, setOpenId] = useState<string | null>('1')
  const [conclusion, setConclusion] = useState(diagnosisConclusionExample)

  return (
    <>
      <p className="page-intro">诊断提纲：勾选进度、记录要点，生成匹配小结。</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>
            提纲结构
            <span className="card-sub">
              {items.filter((i) => i.done).length}/{items.length}
            </span>
          </h3>
          <ul className="list">
            {items.map((x, i) => (
              <li
                className="list-item"
                key={x.id}
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <label className="check-row">
                    <input
                      type="checkbox"
                      checked={x.done}
                      onChange={() =>
                        setItems((prev) =>
                          prev.map((row) =>
                            row.id === x.id ? { ...row, done: !row.done } : row,
                          ),
                        )
                      }
                    />
                    <div className={`title ${x.done ? 'done' : ''}`}>
                      {i + 1}. {x.text}
                    </div>
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setOpenId((id) => (id === x.id ? null : x.id))}
                  >
                    话术
                  </button>
                </div>
                {openId === x.id && (
                  <textarea
                    className="field-area"
                    style={{ marginTop: 8 }}
                    rows={4}
                    placeholder="记录来访者回答要点…"
                    value={x.note}
                    onChange={(e) =>
                      setItems((prev) =>
                        prev.map((row) =>
                          row.id === x.id ? { ...row, note: e.target.value } : row,
                        ),
                      )
                    }
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>匹配结论</h3>
          <textarea
            className="field-area"
            rows={14}
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
          />
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const notes = items
                  .filter((i) => i.note)
                  .map((i) => `- ${i.text}：${i.note}`)
                  .join('\n')
                setConclusion(
                  (c) =>
                    `${c.trim()}\n\n要点摘录：\n${notes || '（尚未记录提纲要点）'}`,
                )
                toast('匹配小结已更新')
              }}
            >
              生成匹配小结
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(conclusion, '小结已复制')}
            >
              复制小结
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => toast('可前往「方案报价」继续')}
            >
              转方案报价
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
