import { useState } from 'react'
import {
  cases,
  closingLetterExample,
  closingInviteExample,
} from '../../data/mock'
import { useToast } from '../../components/Toast'
import { asset } from '../../lib/asset'

export default function Closing() {
  const closed = cases.find((c) => c.status === '已结案')!
  const { toast, copyText } = useToast()
  const [letter, setLetter] = useState(closingLetterExample)
  const [invite, setInvite] = useState(closingInviteExample)
  const [calendarOn, setCalendarOn] = useState(false)

  return (
    <>
      <p className="page-intro">结案复购：编辑结案信、巩固包邀约，并开启复盘提醒。</p>
      <div className="card">
        <div className="person-row" style={{ marginBottom: 12 }}>
          <img className="avatar-lg" src={closed.avatar} alt={closed.alias} />
          <h3 style={{ margin: 0 }}>
            {closed.alias} · 已结案
            <span className="tag">{closed.sessions} 次完成</span>
          </h3>
        </div>
        <div className="media-row" style={{ marginBottom: 12 }}>
          <img className="media-thumb" src={asset("/mock/media-timeline.svg")} alt="" />
        </div>
        <label className="field">
          <span>结案信</span>
          <textarea
            rows={14}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
        </label>
        <label className="field">
          <span>巩固包邀约</span>
          <textarea
            rows={10}
            value={invite}
            onChange={(e) => setInvite(e.target.value)}
          />
        </label>
        <label className="check-row" style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            checked={calendarOn}
            onChange={(e) => setCalendarOn(e.target.checked)}
          />
          <span>开启结案后 2 周 / 6 周复盘日历</span>
        </label>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              toast('结案信已保存')
              copyText(letter, '结案信已复制')
            }}
          >
            生成结案信
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => copyText(invite, '巩固包邀约已复制')}
          >
            邀约巩固包
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setCalendarOn(true)
              toast('复盘日历已开启')
            }}
          >
            开启复盘日历
          </button>
        </div>
      </div>
    </>
  )
}
