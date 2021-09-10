import React from "react";
import { Result, Button } from "antd";
import { NavLink } from "react-router-dom";
function NotAuthorized() {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không đủ quyền truy cập trang này!. Thử lại."
        extra={
          <NavLink
            to="/login"
            onClick={() => {
              localStorage.removeItem("toKen");
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back Login
          </NavLink>
        }
      />
    </div>
  );
}

export default NotAuthorized;
