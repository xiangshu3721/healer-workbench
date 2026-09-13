import { NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    title: '总览',
    items: [{ to: '/', label: '工作台首页' }],
  },
  {
    title: '执业效率',
    items: [
      { to: '/practice/pre', label: '会前准备' },
      { to: '/practice/during', label: '会中辅助' },
      { to: '/practice/post', label: '会后整理' },
      { to: '/practice/cases', label: '个案档案' },
      { to: '/practice/compliance', label: '合规提醒' },
    ],
  },
  {
    title: '内容获客',
    items: [
      { to: '/content/topics', label: '选题灵感' },
      { to: '/content/adapt', label: '多平台改编' },
      { to: '/content/moments', label: '朋友圈' },
      { to: '/content/poster', label: '海报示意' },
      { to: '/content/persona', label: '人设护栏' },
    ],
  },
  {
    title: '销售转化',
    items: [
      { to: '/sales/dm', label: '私信初筛' },
      { to: '/sales/diagnosis', label: '诊断提纲' },
      { to: '/sales/quote', label: '方案报价' },
      { to: '/sales/objection', label: '异议库' },
    ],
  },
  {
    title: '服务交付',
    items: [
      { to: '/delivery/open', label: '开个案' },
      { to: '/delivery/homework', label: '作业提醒' },
      { to: '/delivery/stage', label: '阶段小结' },
      { to: '/delivery/closing', label: '结案复购' },
      { to: '/delivery/reputation', label: '口碑回流' },
    ],
  },
  {
    title: '我的成长',
    items: [
      { to: '/growth/reflection', label: '私人反思' },
      { to: '/growth/skills', label: '能力主题' },
      { to: '/growth/burnout', label: '倦怠预警' },
    ],
  },
  {
    title: '设置',
    items: [
      { to: '/settings/account', label: '账号' },
      { to: '/settings/brand', label: '品牌语气' },
      { to: '/settings/templates', label: '模板' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <div className="brand-logo">愈</div>
          <h1>
            疗愈师 AI
            <br />
            智能工作台
          </h1>
        </div>
      </div>

      {groups.map((g) => (
        <div className="nav-group" key={g.title}>
          <div className="nav-group-title">{g.title}</div>
          {g.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-dot" />
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  )
}
