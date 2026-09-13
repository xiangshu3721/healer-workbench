import { useState } from 'react'
import { useToast } from '../../components/Toast'

export default function Account() {
  const { toast } = useToast()
  const [form, setForm] = useState({
    displayName: '林愈安',
    role: '心理咨询 / 疗愈陪伴',
    timezone: 'Asia/Shanghai',
    language: '简体中文',
    notify: true,
    wechatBound: false,
  })
  const [editing, setEditing] = useState<string | null>(null)

  const fields: { key: keyof typeof form; label: string }[] = [
    { key: 'displayName', label: '显示名' },
    { key: 'role', label: '执业身份' },
    { key: 'timezone', label: '时区' },
    { key: 'language', label: '语言' },
  ]

  return (
    <>
      <p className="page-intro">账号设置：编辑资料与通知偏好（本地保存，无真实鉴权）。</p>
      <div className="card">
        <ul className="list">
          {fields.map(({ key, label }) => (
            <li
              className="list-item"
              key={key}
              style={{ flexDirection: 'column', alignItems: 'stretch' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div className="meta" style={{ margin: 0 }}>
                    {label}
                  </div>
                  <div className="title">{String(form[key])}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setEditing(editing === key ? null : key)}
                >
                  {editing === key ? '收起' : '修改'}
                </button>
              </div>
              {editing === key && (
                <input
                  style={{ marginTop: 8 }}
                  value={String(form[key])}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                />
              )}
            </li>
          ))}
        </ul>
        <label className="check-row" style={{ marginTop: 12 }}>
          <input
            type="checkbox"
            checked={form.notify}
            onChange={(e) => setForm((f) => ({ ...f, notify: e.target.checked }))}
          />
          <span>开启作业 / 排期提醒</span>
        </label>
        <label className="check-row" style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            checked={form.wechatBound}
            onChange={(e) =>
              setForm((f) => ({ ...f, wechatBound: e.target.checked }))
            }
          />
          <span>微信通知已绑定（示意）</span>
        </label>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toast('账号设置已保存')}
          >
            保存设置
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setForm((f) => ({ ...f, wechatBound: true }))
              toast('已完成绑定示意')
            }}
          >
            绑定渠道
          </button>
        </div>
      </div>
    </>
  )
}
