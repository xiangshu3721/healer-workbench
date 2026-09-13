import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ToastProvider } from './components/Toast'
import Dashboard from './pages/Dashboard'
import PreSession from './pages/practice/PreSession'
import DuringSession from './pages/practice/DuringSession'
import PostSession from './pages/practice/PostSession'
import CaseFiles from './pages/practice/CaseFiles'
import Compliance from './pages/practice/Compliance'
import Topics from './pages/content/Topics'
import Adapt from './pages/content/Adapt'
import Moments from './pages/content/Moments'
import Poster from './pages/content/Poster'
import Persona from './pages/content/Persona'
import DM from './pages/sales/DM'
import Diagnosis from './pages/sales/Diagnosis'
import Quote from './pages/sales/Quote'
import Objection from './pages/sales/Objection'
import OpenCase from './pages/delivery/OpenCase'
import Homework from './pages/delivery/Homework'
import Stage from './pages/delivery/Stage'
import Closing from './pages/delivery/Closing'
import Reputation from './pages/delivery/Reputation'
import Reflection from './pages/growth/Reflection'
import Skills from './pages/growth/Skills'
import Burnout from './pages/growth/Burnout'
import Account from './pages/settings/Account'
import Brand from './pages/settings/Brand'
import Templates from './pages/settings/Templates'

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="practice/pre" element={<PreSession />} />
            <Route path="practice/during" element={<DuringSession />} />
            <Route path="practice/post" element={<PostSession />} />
            <Route path="practice/cases" element={<CaseFiles />} />
            <Route path="practice/compliance" element={<Compliance />} />
            <Route path="content/topics" element={<Topics />} />
            <Route path="content/adapt" element={<Adapt />} />
            <Route path="content/moments" element={<Moments />} />
            <Route path="content/poster" element={<Poster />} />
            <Route path="content/persona" element={<Persona />} />
            <Route path="sales/dm" element={<DM />} />
            <Route path="sales/diagnosis" element={<Diagnosis />} />
            <Route path="sales/quote" element={<Quote />} />
            <Route path="sales/objection" element={<Objection />} />
            <Route path="delivery/open" element={<OpenCase />} />
            <Route path="delivery/homework" element={<Homework />} />
            <Route path="delivery/stage" element={<Stage />} />
            <Route path="delivery/closing" element={<Closing />} />
            <Route path="delivery/reputation" element={<Reputation />} />
            <Route path="growth/reflection" element={<Reflection />} />
            <Route path="growth/skills" element={<Skills />} />
            <Route path="growth/burnout" element={<Burnout />} />
            <Route path="settings/account" element={<Account />} />
            <Route path="settings/brand" element={<Brand />} />
            <Route path="settings/templates" element={<Templates />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ToastProvider>
    </HashRouter>
  )
}
