import { useState } from 'react'
import { templateLibrary as seed } from '../../data/mock'
import { useToast } from '../../components/Toast'

export default function Templates() {
  const { toast, copyText } = useToast()
  const [items, setItems] = useState(seed)
  const [filter, setFilter] = useState('全部')
  const [openId, setOpenId] = useState<string | null>(null)

  const cats = ['全部', ...Array.from(new Set(items.map((i) => i.category)))]
  const list = items.filter((i) => filter === '全部' || i.category === filter)

  return (
    <>
      <p className="page-intro">模板库：按分类筛选，打开编辑并复制到剪贴板。</p>
      <div className="tabs" style={{ marginBottom: 12 }}>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={`tab ${filter === c ? 'active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-3">
        {list.map((t) => (
          <div className="card" key={t.id}>
            <h3>
              {t.name}
              <span className="tag">{t.category}</span>
            </h3>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setOpenId((id) => (id === t.id ? null : t.id))}
            >
              {openId === t.id ? '收起' : '打开'}
            </button>
            {openId === t.id && (
              <>
                <textarea
                  className="field-area"
                  style={{ marginTop: 10 }}
                  rows={5}
                  value={t.body}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) =>
                        x.id === t.id ? { ...x, body: e.target.value } : x,
                      ),
                    )
                  }
                />
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => {
                      toast('模板已保存')
                    }}
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => copyText(t.body, '模板已复制')}
                  >
                    复制
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
