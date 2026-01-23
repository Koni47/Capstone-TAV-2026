import React from "react";
import { useNavigate } from "react-router-dom";
import { getHtmlMock } from "../services/mockApi";
import HtmlMockRenderer from '../components/HtmlMockRenderer';

const Users = () => {
  const navigate = useNavigate();
  const mock = getHtmlMock('users.html')
  if (mock) return <HtmlMockRenderer html={mock} navigate={navigate} />
  return <div>Users page not found</div>;
};

export default Users;
