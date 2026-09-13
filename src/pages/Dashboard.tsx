import { useMemo, useState } from 'react'
import {
  todaySessions as initialSessions,
  followUps as initialFollowUps,
  loadReminders,
  cases,
  contentDrafts,
  type ScheduleItem,
} from '../data/mock'
import { useToast } from '../components/Toast'
import { asset } from '../lib/asset'

export default function Dashboard() {
  const { toast, copyText } = useToast()
  const [sessions, setSessions] = useState(initialSessions)
  const [followUps, setFollowUps] = useState(initialFollowUps)
  const [tab, setTab] = useState<'今日' | '本周'>('今日')
  const [expandedCase, setExpandedCase] = useState<string | null>(cases[0]?.id ?? null)
  const [draftOpen, setDraftOpen] = useState<string | null>(null)
  const [draftText, setDraftText] = useState('')

  const stats = useMemo(
    () => ({
      today: sessions.filter((s) => s.status !== '已取消').length,
      follow: followUps.filter((f) => !f.done).length,
      week: 18,
      active: cases.filter((c) => c.status !== '已结案').length,
    }),
    [sessions, followUps],
  )

  const markPrepared = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, prepared: true } : s)),
    )
    toast('会前准备已标记完成')
  }

  const toggleFollow = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, done: !f.done } : f)),
    )
  }

  const openDraft = (id: string, body: string) => {
    setDraftOpen(id)
    setDraftText(body)
  }

  const avatarOf = (name: string) =>
    cases.find((c) => c.name === name || c.alias === name)?.avatar ??
    asset('/mock/avatar-lead.svg')

  return (
    <>
      <p className="page-intro">
        今日概览：场次安排、待跟进与负荷提醒。可直接勾选、标记准备与编辑草稿。
      </p>

      <div className="tabs">
        {(['今日', '本周'] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-4">
        <div className="card stat">
          <div className="num">{stats.today}</div>
          <div className="label">{tab === '今日' ? '今日场次' : '示意场次'}</div>
        </div>
        <div className="card stat">
          <div className="num">{stats.follow}</div>
          <div className="label">待跟进</div>
        </div>
        <div className="card stat">
          <div className="num">{stats.week}</div>
          <div className="label">本周已排场</div>
        </div>
        <div className="card stat">
          <div className="num">{stats.active}</div>
          <div className="label">活跃个案</div>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: 14 }}>
        <div className="card">
          <h3>
            今日场次
            <span className="card-sub">共 {sessions.length} 场</span>
          </h3>
          <ul className="list">
            {sessions.map((s: ScheduleItem) => (
              <li className="list-item" key={s.id}>
                <div className="person-row">
                  <img className="avatar-sm" src={avatarOf(s.name)} alt="" />
                  <div>
                    <div className="title">
                      {s.time} · {s.name}
                    </div>
                    <div className="meta">
                      {s.theme} · {s.mode} · {s.status}
                      {s.prepared ? ' · 已准备' : ' · 未准备'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => markPrepared(s.id)}
                  disabled={s.prepared}
                >
                  {s.prepared ? '已准备' : '准备'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>
            待跟进
            <span className="card-sub">{followUps.filter((f) => !f.done).length} 项</span>
          </h3>
          <ul className="list">
            {followUps.map((f) => (
              <li className="list-item" key={f.id}>
                <label className="check-row">
                  <input
                    type="checkbox"
                    checked={f.done}
                    onChange={() => toggleFollow(f.id)}
                  />
                  <div className="person-row">
                    <img className="avatar-sm" src={avatarOf(f.name)} alt="" />
                    <div>
                      <div className={`title ${f.done ? 'done' : ''}`}>{f.name}</div>
                      <div className="meta">{f.reason}</div>
                    </div>
                  </div>
                </label>
                <span
                  className={`tag ${
                    f.priority === '高' ? 'rose' : f.priority === '中' ? 'amber' : 'jade'
                  }`}
                >
                  {f.priority}
                </span>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setFollowUps((prev) => prev.map((f) => ({ ...f, done: true })))
                toast('已发送温和提醒（本地示意）')
              }}
            >
              一键提醒
            </button>
          </div>
        </div>

        <div className="card">
          <h3>负荷提醒</h3>
          <ul className="list">
            {loadReminders.map((r) => (
              <li className="list-item" key={r.text}>
                <div className="meta" style={{ margin: 0 }}>
                  {r.text}
                </div>
                <span
                  className={`tag ${
                    r.level === '预警' ? 'rose' : r.level === '提醒' ? 'amber' : ''
                  }`}
                >
                  {r.level}
                </span>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() =>
                toast('已生成排期优化建议：建议取消 1 场晚场并留半天空白')
              }
            >
              调整排期
            </button>
          </div>
        </div>
      </div>

      <h3 className="section-title">个案速览</h3>
      <div className="grid grid-3">
        {cases.slice(0, 3).map((c) => (
          <div className="card" key={c.id}>
            <div className="person-row" style={{ marginBottom: 8 }}>
              <img className="avatar" src={c.avatar} alt={c.alias} />
              <h3 style={{ margin: 0, flex: 1 }}>
                {c.alias}
                <span
                  className={`tag ${
                    c.status === '进行中' ? 'jade' : c.status === '待跟进' ? 'amber' : ''
                  }`}
                >
                  {c.status}
                </span>
              </h3>
            </div>
            <div
              className="meta"
              style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}
            >
              {c.theme} · 已完成 {c.sessions} 次
              {c.nextAt ? ` · 下次 ${c.nextAt}` : ''}
            </div>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.7,
                color: 'var(--ink-soft)',
                margin: '10px 0 0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {expandedCase === c.id ? c.summary : `${c.summary.slice(0, 72)}…`}
            </p>
            {expandedCase === c.id && (
              <>
                <div className="note-block" style={{ marginTop: 10 }}>
                  最近：{c.lastNote}
                </div>
                {c.mediaThumbs?.length > 0 && (
                  <div className="media-row">
                    {c.mediaThumbs.map((src) => (
                      <img key={src} className="media-thumb" src={src} alt="" />
                    ))}
                  </div>
                )}
              </>
            )}
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() =>
                  setExpandedCase((id) => (id === c.id ? null : c.id))
                }
              >
                {expandedCase === c.id ? '收起' : '展开'}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => copyText(c.summary, '个案摘要已复制')}
              >
                复制摘要
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3 className="section-title">内容草稿</h3>
      <div className="grid grid-3">
        {contentDrafts.slice(0, 3).map((d) => (
          <div className="card" key={d.id}>
            <img className="cover-thumb" src={d.cover} alt="" />
            <h3>
              {d.title}
              <span className="tag">{d.platform}</span>
            </h3>
            {draftOpen === d.id ? (
              <>
                <textarea
                  className="field-area"
                  rows={10}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                />
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      toast('草稿已保存到本地状态')
                      setDraftOpen(null)
                    }}
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setDraftOpen(null)}
                  >
                    取消
                  </button>
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--ink-soft)',
                    lineHeight: 1.65,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {d.excerpt}
                </p>
                <div className="chip-row">
                  {d.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                  <span className="tag amber">{d.status}</span>
                </div>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => openDraft(d.id, d.body)}
                  >
                    继续编辑
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
