import { Fragment, useMemo, useState } from 'react'
import { cases as seed, type CaseItem, type CaseStatus } from '../../data/mock'
import { useToast } from '../../components/Toast'
import { asset } from '../../lib/asset'

export default function CaseFiles() {
  const { toast } = useToast()
  const [items, setItems] = useState<CaseItem[]>(seed)
  const [filter, setFilter] = useState<'全部' | CaseStatus>('全部')
  const [q, setQ] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ alias: '', theme: '', summary: '' })

  const filtered = useMemo(() => {
    return items.filter((c) => {
      if (filter !== '全部' && c.status !== filter) return false
      if (q && !`${c.alias}${c.theme}${c.summary}`.includes(q)) return false
      return true
    })
  }, [items, filter, q])

  const addCase = () => {
    if (!form.alias.trim()) {
      toast('请填写化名')
      return
    }
    const next: CaseItem = {
      id: `c${Date.now()}`,
      name: form.alias,
      alias: form.alias,
      theme: form.theme || '待定主题',
      status: '待跟进',
      sessions: 0,
      summary: form.summary || '新建个案，待补充背景。',
      tags: ['新建'],
      lastNote: '刚建档',
      nextAt: '待排期',
      avatar: asset('/mock/avatar-lead.svg'),
      selfNarrative: '',
      questionnaire: '',
      historySummary: '',
      mediaThumbs: [],
    }
    setItems((prev) => [next, ...prev])
    setForm({ alias: '', theme: '', summary: '' })
    setShowNew(false)
    toast(`已创建个案「${next.alias}」`)
  }

  const cycleStatus = (id: string) => {
    const order: CaseStatus[] = ['进行中', '待跟进', '已结案']
    setItems((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const i = order.indexOf(c.status)
        return { ...c, status: order[(i + 1) % order.length] }
      }),
    )
    toast('状态已切换')
  }

  return (
    <>
      <p className="page-intro">个案档案：筛选、展开详情、切换状态，或新建个案。</p>
      <div className="toolbar">
        <div className="tabs">
          {(['全部', '进行中', '待跟进', '已结案'] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`tab ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          className="search"
          placeholder="搜索化名 / 主题"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowNew((v) => !v)}
        >
          {showNew ? '取消新建' : '新建个案'}
        </button>
      </div>

      {showNew && (
        <div className="card" style={{ marginBottom: 14 }}>
          <h3>新建个案</h3>
          <div className="grid grid-2">
            <label className="field">
              <span>化名</span>
              <input
                value={form.alias}
                onChange={(e) => setForm((f) => ({ ...f, alias: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>主题</span>
              <input
                value={form.theme}
                onChange={(e) => setForm((f) => ({ ...f, theme: e.target.value }))}
              />
            </label>
          </div>
          <label className="field">
            <span>摘要</span>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
            />
          </label>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={addCase}>
              创建
            </button>
          </div>
        </div>
      )}

      <table className="table card" style={{ padding: 8 }}>
        <thead>
          <tr>
            <th>化名</th>
            <th>主题</th>
            <th>状态</th>
            <th>场次</th>
            <th>下次</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <Fragment key={c.id}>
              <tr>
                <td>
                  <div className="person-row">
                    <img className="avatar-sm" src={c.avatar} alt={c.alias} />
                    <span>{c.alias}</span>
                  </div>
                </td>
                <td>{c.theme}</td>
                <td>
                  <button
                    type="button"
                    className={`tag ${
                      c.status === '进行中'
                        ? 'jade'
                        : c.status === '待跟进'
                          ? 'amber'
                          : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => cycleStatus(c.id)}
                    title="点击切换状态"
                  >
                    {c.status}
                  </button>
                </td>
                <td>{c.sessions}</td>
                <td>{c.nextAt ?? '—'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() =>
                      setExpanded((id) => (id === c.id ? null : c.id))
                    }
                  >
                    {expanded === c.id ? '收起' : '详情'}
                  </button>
                </td>
              </tr>
              {expanded === c.id && (
                <tr>
                  <td colSpan={6}>
                    <div className="person-row" style={{ marginBottom: 12 }}>
                      <img className="avatar-lg" src={c.avatar} alt={c.alias} />
                      <div>
                        <div className="title">
                          {c.name}（{c.alias}）
                        </div>
                        <div className="meta">
                          {c.theme} · {c.tags.join(' · ')}
                        </div>
                      </div>
                    </div>
                    <div className="note-block" style={{ marginBottom: 10 }}>
                      <strong>历史摘要</strong>
                      {'\n'}
                      {c.historySummary || c.summary}
                    </div>
                    {c.selfNarrative && (
                      <div className="note-block" style={{ marginBottom: 10 }}>
                        <strong>来访者自述</strong>
                        {'\n'}
                        {c.selfNarrative}
                      </div>
                    )}
                    {c.questionnaire && (
                      <div className="note-block" style={{ marginBottom: 10 }}>
                        <strong>问卷要点</strong>
                        {'\n'}
                        {c.questionnaire}
                      </div>
                    )}
                    <div className="note-block">最近：{c.lastNote}</div>
                    {c.mediaThumbs?.length > 0 && (
                      <div className="media-row">
                        {c.mediaThumbs.map((src) => (
                          <img key={src} className="media-thumb" src={src} alt="" />
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  )
}
