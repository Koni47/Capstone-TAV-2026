import React from 'react'
import { useNavigate } from "react-router-dom";
import { getHtmlMock } from "../services/mockApi";
import HtmlMockRenderer from '../components/HtmlMockRenderer'

export default function VehicleAdd() {
  const navigate = useNavigate();
  const mock = getHtmlMock('vehicle-add.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />

  return <div>Vehicle Add Page</div>
}