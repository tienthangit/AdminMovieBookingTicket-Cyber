import React from "react";
import { Avatar } from "antd";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header(props) {
  const { accountLogin } = useSelector((state) => state.loginReducer);

  return (
    <div className="container flex justify-end bg-white py-2 items-center">
      <Avatar
        className="mx-4 leading-6"
        size="large"
        icon={<UserOutlined />}
        style={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}>
        {accountLogin?.hoTen}
      </Avatar>
      <div className="flex divide-x divide-gray-300 items-center">
        <p className="block mr-2">Hi,{accountLogin?.hoTen}</p>
        <NavLink
          to="/login"
          className="px-5 py-3 font-semibold"
          onClick={() => {
            localStorage.removeItem("toKen");
          }}>
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
