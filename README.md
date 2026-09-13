# 疗愈师 AI 智能工作台

高保真前端工作台（Vite + React + TypeScript）。无真实 AI / 鉴权 / 数据库 / 支付；各模块以本地 mock 状态提供可交互体验（筛选、勾选、编辑保存、复制 toast、展开行等）。

## Online Demo

https://xiangshu3721.github.io/healer-workbench/

## 快速开始

```bash
cd healer-workbench
npm install
npm run dev -- --host 0.0.0.0 --port 5177
```

浏览器打开 `http://localhost:5177`（或机器 IP:5177）。

## 构建

```bash
npm install
npm run build
```

产物在 `dist/`。GitHub Pages 使用 `base: '/healer-workbench/'` + `HashRouter`。

## 信息架构

1. **工作台首页** — 今日场次、待跟进、负荷提醒  
2. **执业效率** — 会前 / 会中 / 会后 / 个案档案 / 合规  
3. **内容获客** — 选题、多平台改编、朋友圈、海报、人设护栏  
4. **销售转化** — 私信初筛、诊断提纲、方案报价、异议库  
5. **服务交付** — 开个案、作业提醒、阶段小结、结案复购、口碑回流  
6. **我的成长** — 私人反思、能力主题、倦怠预警  
7. **设置** — 账号 / 品牌语气 / 模板  
