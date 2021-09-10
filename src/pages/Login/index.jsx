import React, { useCallback } from "react";
import "./style.css";
import * as Yup from "yup";
import { Input, Button, Typography } from "antd";
import { useFormik } from "formik";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import webLogo from "../../assets/web-logo.png";
import { SignInAction } from "../../store/actions/loginActions";
import { useDispatch } from "react-redux";
const { Text } = Typography;

const validationSchema = Yup.object().shape({
  taiKhoan: Yup.string().required("Username is invalid!"),
  matKhau: Yup.string()
    .required("PassWord is invalid!")
    .min(6, "PassWord must have min 6 characters")
    .max(32, "PassWord have max 32 characters"),
});

function Login(props) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema,
    validateOnMount: true,
  });

  const goToHome = () => {
    props.history.push("/home/movie");
  };

  // set tất cả các input là touched khi submit
  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setAllTouched();
      if (!formik.isValid) return;
      dispatch(SignInAction(formik.values, goToHome));
    },
    [formik, dispatch, setAllTouched]
  );
  return (
    <>
      <form
        className="signIn-form sm:container rounded-lg bg-white"
        onSubmit={handleSubmit}>
        <div class="text-center my-8 tracking-wider">
          <img
            src={webLogo}
            alt="weblogo"
            style={{ width: "25%", margin: "auto" }}
          />
          <h1 className="font-bold text-3xl text-gray-900 ">LOGIN</h1>
          <p className="text-gray-500 tracking-wide">
            Only admins are logged in.
          </p>
        </div>
        <div className="mb-2">
          <Text className="text-gray-500" strong>
            Username:
          </Text>
          <Input
            name="taiKhoan"
            size="large"
            value={formik.values.taiKhoan}
            prefix={<UserOutlined />}
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
            value={formik.values.matKhau}
            prefix={<LockOutlined />}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.matKhau && (
            <span className="text-red-500">{formik.errors.matKhau}</span>
          )}
        </div>
        <Button
          htmlType="submit"
          className="btnLogin my-4"
          type="primary"
          htmlType="submit"
          block>
          Sign In
        </Button>
      </form>
    </>
  );
}

export default Login;
