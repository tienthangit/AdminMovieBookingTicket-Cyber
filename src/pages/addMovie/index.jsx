import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { addMovieAction } from "../../store/actions/movieActions";
import { useDispatch } from "react-redux";

function AddMovie(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      // console.log("value", values);
      // tạo đối tượng formdata ==> đưa giá trị formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      // console.log(formData.get("File"));
      dispatch(addMovieAction(formData));
    },
  });

  const handleChangeFile = (e) => {
    //lấy file ra từ e
    let file = e.target.files[0];
    //validation only những file có type dưới
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //tạo đối tượng để đọc file
      let reader = new FileReader();
      //đọc file để trả ra một URL (base64)
      reader.readAsDataURL(file);
      //tạo sự kiện
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
      //lưu value vào formik
      formik.setFieldValue("hinhAnh", file);
    }
  };

  //==========> hàm setSize của Componet
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  //Closure
  const handleChangeFieldValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer" >
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker onChange={handChangeDatePicker} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeFieldValue("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeFieldValue("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeFieldValue("hot")} />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeFieldValue("danhGia")}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            onChange={handleChangeFile}
            accpet="image/png, image/jpeg, image/gif, image/jpg"
          />
          <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <Button type="primary" htmlType="submit">
            {" "}
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddMovie;
