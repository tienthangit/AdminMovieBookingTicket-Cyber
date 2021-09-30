import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, Select } from "antd";
import { DatePicker } from "antd";
import { showTimeServices } from "../../services/showTimeServices";
import { useFormik } from "formik";
import moment from "moment";
import { createActions } from "../../store/constants/createAction";
import { OFF_LOADING, ON_LOADING } from "../../store/constants/loadingConstants";
import { bookingTicketServices } from "../../services/bookingTicketServices";
import { openNotificationWithIcon } from "../../utils/notifications/notifications";
import { useDispatch } from "react-redux";

function ShowTimes(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: 0,
      giaVe: 0,
    },
    onSubmit: async (values) => {
      // console.log("values", values);
      try
      {
        const result = await bookingTicketServices.createShowTimes(values);
        openNotificationWithIcon('success', result.data.content);
        props.history.push('/home/movie')
        // console.log(result.data);
      } catch (err)
      {
        openNotificationWithIcon('error', err.response.data?.content);
        console.log(err.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect( () => {
    dispatch(createActions(ON_LOADING))
    setTimeout(async () => {
      try
      {
        let result = await showTimeServices.getInfoCinema();
        await dispatch(createActions(OFF_LOADING))
        setState({
          ...state,
          heThongRapChieu: result.data.content,
        });
      } catch (err)
      {
        dispatch(createActions(OFF_LOADING));
        console.log(err.response?.data);
      }
    },1300)
  }, []);

  const handleChangeHeThongRap = async (values) => {
    //từ hệ thống rạp call api lấy thông tin rạp
    try
    {
      let result = await showTimeServices.getInfoGroupCinema(values);
      setState({
        ...state,
        cumRapChieu: result.data.content,
      });
      console.log(result.data);
    } catch (err)
    {
      console.log(err.response);
    }
  };

  const handleChangeCumRap = (values) => {
    formik.setFieldValue("maRap", values);
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const handleChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  //lấy thông tin film từ localStorage
  let film = "";
  if (localStorage.getItem("filmParams"))
  {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  return (
    <>
      <div className="flex flex-col items-center mb-3">
        <h4 className="text-2xl mb-3">
          {" "}
          Tạo lịch chiếu - {props.match.params.tenPhim}
        </h4>
        <img src={film.hinhAnh} width={300} height={300} alt="..." />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onSubmitCapture={formik.handleSubmit}>
        <Form.Item label="Hệ thống rạp">
          <Select
            options={state.heThongRapChieu?.map((htr, index) => ({
              label: htr.tenHeThongRap,
              value: htr.tenHeThongRap,
            }))}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((cumRap, index) => ({
              label: cumRap.tenCumRap,
              value: cumRap.maCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>
        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker
            showTime
            onChange={onChangeDate}
            format="DD/MM/YYYY hh:mm:ss"
          />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber onChange={handleChangeInputNumber} />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ShowTimes;
