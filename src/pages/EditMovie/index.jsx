import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getInfoMovieAction,
  updateMovieAction,
} from "../../store/actions/movieActions";

function EditMovie(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { detailMovie } = useSelector((state) => state.movieReducer);

  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: detailMovie.maPhim,
      tenPhim: detailMovie.tenPhim,
      trailer: detailMovie.trailer,
      moTa: detailMovie.moTa,
      maNhom: "GP01",
      ngayKhoiChieu: detailMovie.ngayKhoiChieu,
      sapChieu: detailMovie.sapChieu,
      dangChieu: detailMovie.dangChieu,
      hot: detailMovie.hot,
      danhGia: detailMovie.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      // console.log("value", values);
      values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format("DD/MM/YYYY")
      // tạo đối tượng formdata ==> đưa giá trị formik vào formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      // console.log(formData.get("File"));
      dispatch(updateMovieAction(formData, goToHomeMovie));
    },
  });
  const goToHomeMovie = () => {
    props.history.push("/home/movie");
  };

  useEffect(() => {
    dispatch(getInfoMovieAction(params.id));
  }, [dispatch]);

  const handleChangeFile = async (e) => {
    //lấy file ra từ e
    let file = e.target.files[0];
    //validation only những file có type dưới
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      //lưu value vào formik
      await formik.setFieldValue("hinhAnh", file);
      //tạo đối tượng để đọc file
      let reader = new FileReader();
      //đọc file để trả ra một URL (base64)
      reader.readAsDataURL(file);
      //tạo sự kiện
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  //==========> hàm setSize của Componet
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  //Closure
  const handleChangeFieldValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  return (
    <>
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
          <Radio.Group className="ml-4">
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handChangeDatePicker}
            format="DD/MM/YYYY"
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            onChange={handleChangeFieldValue("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={handleChangeFieldValue("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            onChange={handleChangeFieldValue("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeFieldValue("danhGia")}
            value={formik.values.danhGia}
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
          <img
            style={{ width: 150, height: 150 }}
            src={imgSrc === "" ? detailMovie.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <Button type="primary" htmlType="submit">
            {" "}
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default EditMovie;
