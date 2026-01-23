import React from 'react'
import { useNavigate } from 'react-router-dom'
import HtmlMockRenderer from '../components/HtmlMockRenderer'
import { getHtmlMock } from '../services/mockApi'

export default function Login() {
  const navigate = useNavigate()
  const mock = getHtmlMock('login.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  return <div className="p-8">Login fallback</div>
}

