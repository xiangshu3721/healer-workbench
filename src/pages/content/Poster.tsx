import { useState } from 'react'
import { posterTemplates } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Poster() {
  const { toast, copyText } = useToast()
  const [tpl, setTpl] = useState(posterTemplates[0])
  const [title, setTitle] = useState(posterTemplates[0].title)
  const [sub, setSub] = useState(posterTemplates[0].sub)
  const [editing, setEditing] = useState<'title' | 'sub' | null>(null)

  return (
    <>
      <p className="page-intro">海报示意：切换模板、编辑文案，预览暖色东方气质排版。</p>
      <div className="grid grid-2">
        <div className="card">
          <img className="poster-thumb" src={tpl.image} alt={tpl.name} />
          <div className="poster-preview">
            <div>
              <div className="p-sub" style={{ letterSpacing: '.2em', marginBottom: 12 }}>
                疗愈师 · 轻语
              </div>
              <div className="p-title">{title}</div>
            </div>
            <div>
              <div className="p-sub">{sub}</div>
              <div className="p-foot" style={{ marginTop: 16 }}>
                HEALER WORKBENCH
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>海报设置</h3>
          <ul className="list">
            <li className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="title">主文案</div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setEditing(editing === 'title' ? null : 'title')}
                >
                  编辑
                </button>
              </div>
              {editing === 'title' && (
                <textarea
                  className="field-area"
                  style={{ marginTop: 8 }}
                  rows={3}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
            </li>
            <li className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="title">副文案 / CTA</div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setEditing(editing === 'sub' ? null : 'sub')}
                >
                  编辑
                </button>
              </div>
              {editing === 'sub' && (
                <textarea
                  className="field-area"
                  style={{ marginTop: 8 }}
                  rows={2}
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                />
              )}
            </li>
            <li className="list-item">
              <div className="title">当前模板 · {tpl.name}</div>
              <span className="tag jade">暖陶 / 米白</span>
            </li>
          </ul>
          <div className="chip-row" style={{ marginBottom: 12 }}>
            {posterTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`btn btn-sm ${tpl.id === t.id ? 'btn-primary' : ''}`}
                onClick={() => {
                  setTpl(t)
                  setTitle(t.title)
                  setSub(t.sub)
                  toast(`已切换模板：${t.name}`)
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <img
                  src={t.image}
                  alt=""
                  style={{ width: 28, height: 36, objectFit: 'cover', borderRadius: 4 }}
                />
                {t.name}
              </button>
            ))}
          </div>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => toast('已导出示意图到下载队列（本地示意）')}
            >
              导出示意图
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => copyText(`${title}\n${sub}`, '海报文案已复制')}
            >
              复制文案
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
