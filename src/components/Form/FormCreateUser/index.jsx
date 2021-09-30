import React, { useEffect } from "react";
// import "./style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { createActions } from "../../../store/constants/createAction";
import webLogo from "../../../assets/img/web-logo.png";
import { useDispatch } from "react-redux";
import { SUBMIT_DRAWER_CREATE_USER } from "../../../store/constants/drawerConstants";
import { createUserAction } from "../../../store/actions/userActions";
const { Text } = Typography;
const { Option } = Select;

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("Username is invalid!"),
  matKhau: Yup.string()
    .required("PassWord is invalid!")
    .min(6, "PassWord must have min 6 characters")
    .max(32, "PassWord have max 32 characters"),
  email: Yup.string().required("Email is required!").email("Email is invalid!"),
  soDt: Yup.string()
    .required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    )
    .min(8, "Phone must have mon 8 number"),
  hoTen: Yup.string().required("FullName is required!"),
});

function FormCreateUser(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "KhachHang",
      maNhom: "GP01",
    },
    onSubmit: (value) => {
      dispatch(createUserAction(value));
      // console.log(value);
    },
    validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    dispatch(createActions(SUBMIT_DRAWER_CREATE_USER, formik.submitForm));
  }, []);

  //   console.log(formik);

  const handleChangeSelect = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <img src={webLogo} alt="weblogo" style={{ margin: "auto" }} />
      <div className="mb-2">
        <Text className="text-gray-500" strong>
          FullName:
        </Text>
        <Input
          name="hoTen"
          size="large"
          prefix={<UserOutlined />}
          value={formik.values.hoTen}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.hoTen && (
          <span className="text-red-500">{formik.errors.hoTen}</span>
        )}
      </div>
      <div className="mb-2">
        <Text className="text-gray-500" strong>
          Username:
        </Text>
        <Input
          name="taiKhoan"
          size="large"
          prefix={<UserOutlined />}
          value={formik.values.taiKhoan}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.taiKhoan && (
          <span className="text-red-500">{formik.errors.taiKhoan}</span>
        )}
      </div>
      <div className="mb-2">
        <Text className="text-gray-500" strong>
          Password:
        </Text>
        <Input.Password
          name="matKhau"
          size="large"
          prefix={<LockOutlined />}
          value={formik.values.matKhau}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.matKhau && (
          <span className="text-red-500">{formik.errors.matKhau}</span>
        )}
      </div>
      <div className="mb-2">
        <Text className="text-gray-500" strong>
          Email:
        </Text>
        <Input
          name="email"
          size="large"
          prefix={<MailOutlined />}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && (
          <span className="text-red-500">{formik.errors.email}</span>
        )}
      </div>
      <div className="mb-2 flex">
        <div>
          <Text className="text-gray-500" strong>
            Phone:
          </Text>
          <div className="mr-2">
            <Input
              style={{ padding: "3.2px 11px" }}
              name="soDt"
              size="large"
              prefix={<PhoneOutlined />}
              value={formik.values.soDt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.soDt && (
              <span className="text-red-500">{formik.errors.soDt}</span>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <Text className="text-gray-500" strong>
            Loại:
          </Text>
          <Select
            name="maLoaiNguoiDung"
            className="block"
            value={formik.values.maLoaiNguoiDung}
            onChange={handleChangeSelect}>
            <Option value="QuanTri">Quản trị</Option>
            <Option value="KhachHang">Khách hàng</Option>
          </Select>
        </div>
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

export default FormCreateUser;
