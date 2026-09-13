import { useState } from 'react'
import { useToast } from '../../components/Toast'

export default function OpenCase() {
  const { toast, copyText } = useToast()
  const [form, setForm] = useState({
    alias: '',
    theme: '',
    freq: '每周 1 次',
    mode: '视频',
    intent: '',
    consentSent: false,
  })
  const [created, setCreated] = useState('')

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }))

  return (
    <>
      <p className="page-intro">开个案：填写建档信息、发送知情同意，并创建个案。</p>
      <div className="card">
        <div className="grid grid-2">
          <label className="field">
            <span>化名</span>
            <input
              value={form.alias}
              onChange={(e) => set('alias', e.target.value)}
              placeholder="清禾 / 晓月…"
            />
          </label>
          <label className="field">
            <span>主题</span>
            <input
              value={form.theme}
              onChange={(e) => set('theme', e.target.value)}
              placeholder="边界感 / 倦怠…"
            />
          </label>
          <label className="field">
            <span>频率</span>
            <select value={form.freq} onChange={(e) => set('freq', e.target.value)}>
              <option>每周 1 次</option>
              <option>每两周 1 次</option>
              <option>每周 2 次</option>
            </select>
          </label>
          <label className="field">
            <span>形式</span>
            <select value={form.mode} onChange={(e) => set('mode', e.target.value)}>
              <option>视频</option>
              <option>线下</option>
              <option>语音</option>
            </select>
          </label>
        </div>
        <label className="field">
          <span>首次意图</span>
          <textarea
            rows={3}
            value={form.intent}
            onChange={(e) => set('intent', e.target.value)}
            placeholder="例如：建立安全联结，澄清陪伴目标"
          />
        </label>
        <label className="check-row" style={{ marginTop: 10 }}>
          <input
            type="checkbox"
            checked={form.consentSent}
            onChange={(e) => set('consentSent', e.target.checked)}
          />
          <span>知情同意已发送 / 已确认</span>
        </label>
        <div className="btn-row">
          <button
            type="button"
            className="btn"
            onClick={() => {
              set('consentSent', true)
              const text =
                '知情同意摘要：保密原则、例外情况、形式与费用、可随时提出疑问。'
              copyText(text, '知情同意话术已复制')
            }}
          >
            发送知情同意
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (!form.alias.trim()) {
                toast('请填写化名')
                return
              }
              if (!form.consentSent) {
                toast('请先确认知情同意')
                return
              }
              const msg = `已创建个案「${form.alias}」· ${form.theme || '待定'} · ${form.freq} · ${form.mode}`
              setCreated(msg)
              toast(msg)
            }}
          >
            创建个案
          </button>
        </div>
        {created && <div className="note-block" style={{ marginTop: 12 }}>{created}</div>}
      </div>
    </>
  )
}
