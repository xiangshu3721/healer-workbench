import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface ToastItem {
  id: number
  message: string
}

interface ToastCtx {
  toast: (message: string) => void
  copyText: (text: string, successMsg?: string) => Promise<void>
}

const Ctx = createContext<ToastCtx>({
  toast: () => {},
  copyText: async () => {},
})

export function useToast() {
  return useContext(Ctx)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setItems((prev) => [...prev, { id, message }])
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 2400)
  }, [])

  const copyText = useCallback(
    async (text: string, successMsg = '已复制到剪贴板') => {
      try {
        await navigator.clipboard.writeText(text)
        toast(successMsg)
      } catch {
        toast('复制失败，请手动选择文本')
      }
    },
    [toast],
  )

  const value = useMemo(() => ({ toast, copyText }), [toast, copyText])

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {items.map((t) => (
          <div className="toast" key={t.id}>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
