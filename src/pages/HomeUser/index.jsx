import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUserListActions,
  getListUserAction,
} from "../../store/actions/userActions";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { createActions } from "../../store/constants/createAction";
import { OPEN_DRAWER } from "../../store/constants/drawerConstants";
import FormCreateUser from "../../components/Form/FormCreateUser";
import { Popconfirm, message, Button } from "antd";
import FormEditUser from "../../components/Form/FormEditUser";
import { GET_USER_EDIT } from "../../store/constants/userConstants";

const { Search } = Input;

function HomeUser() {
  const dispatch = useDispatch();
  const { arrUser } = useSelector((state) => state.userReducer);
  const refValueSearch = useRef(null);

  useEffect(() => {
    dispatch(getAllUserListActions);
  }, [dispatch]);

  const onSearch = (e) => {
    const value = e.target.value;

    if (refValueSearch.current) {
      clearTimeout(refValueSearch.current);
    }
    refValueSearch.current = setTimeout(() => {
      dispatch(getListUserAction(value));
    }, 400);
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (item2, item1) => {
        let hoTen1 = item1.hoTen?.trim().toLowerCase();
        let hoTen2 = item2.hoTen?.trim().toLowerCase();
        if (hoTen2 < hoTen1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số ĐT",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Hành Động",
      dataIndex: "hành động",
      key: "hành động",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <Button
              key={index}
              className="mr-2"
              onClick={() => {
                //dispatch lên reducer Drawers mở form và truyền component content lên
                dispatch(
                  createActions(OPEN_DRAWER, {
                    title: "EditUser User",
                    content: <FormEditUser />,
                  })
                );
                //dispatch nội dung project lên reducer là lưu lại trên reducerProject
                dispatch({
                  type: GET_USER_EDIT,
                  payload: record,
                });
              }}
              icon={<FormOutlined style={{ foneSize: 17 }} />}></Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch(deleteUserAction(record.taiKhoan));
              }}
              onCancel={() => {
                message.info("Clicked on No!");
              }}
              okText="Yes"
              cancelText="No">
              <Button
                className="mr-2"
                icon={
                  <DeleteOutlined className="text-red-600  border-red-500 " />
                }></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }
  return (
    <div className="container ">
      <div className="flex mb-3">
        {/* <h3 class="text-3xl font-semibold leading-tight mx-2">List user</h3> */}
        <Button
          className="mr-2"
          onClick={() => {
            dispatch(
              createActions(OPEN_DRAWER, {
                title: "Create User",
                content: <FormCreateUser />,
              })
            );
          }}>
          +Add User..
        </Button>
        <Search
          className="w-1/2"
          onChange={onSearch}
          placeholder="Nhập tên user để tìm"
          enterButton
        />
      </div>
      <Table
        columns={columns}
        dataSource={arrUser}
        // onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}

export default HomeUser;
