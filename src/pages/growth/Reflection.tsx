import { useState } from 'react'
import { growthNotes as seed } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Reflection() {
  const { toast } = useToast()
  const [notes, setNotes] = useState(seed)
  const [draft, setDraft] = useState(seed[0]?.body ?? '')
  const [mood, setMood] = useState('平稳')
  const [tab, setTab] = useState<'写' | '回顾'>('写')

  return (
    <>
      <p className="page-intro">私人反思：写下督导式备忘，按周回顾（仅本地状态）。</p>
      <div className="tabs" style={{ marginBottom: 12 }}>
        {(['写', '回顾'] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === '写' ? '继续写' : '本周回顾'}
          </button>
        ))}
      </div>
      {tab === '写' ? (
        <div className="card">
          <div className="chip-row" style={{ marginBottom: 10 }}>
            {['空 · 触动', '平稳', '疲惫', '清明', '感恩'].map((m) => (
              <button
                key={m}
                type="button"
                className={`tag ${mood === m ? 'jade' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <textarea
            className="field-area"
            rows={8}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setNotes((prev) => [
                  {
                    id: `g${Date.now()}`,
                    date: '2026-09-11',
                    mood,
                    body: draft,
                    tags: ['今日'],
                  },
                  ...prev,
                ])
                toast('反思已保存')
              }}
            >
              保存反思
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <ul className="list">
            {notes.map((n) => (
              <li
                className="list-item"
                key={n.id}
                style={{ flexDirection: 'column', alignItems: 'stretch' }}
              >
                <div className="title">
                  {n.date} · {n.mood}
                </div>
                <div className="meta">{n.body}</div>
                <div className="chip-row">
                  {n.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
