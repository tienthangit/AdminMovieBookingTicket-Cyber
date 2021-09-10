import React, { useEffect, useRef } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FormOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Popconfirm, message, Button } from "antd";
import {
  deleteMovieAction,
  getAllMovieListAction,
  getListMovieAction,
} from "../../store/actions/movieActions";
import { NavLink } from "react-router-dom";
import Search from "antd/lib/input/Search";

function MovieManagement(props) {
  const dispatch = useDispatch();
  const { arrMovie } = useSelector((state) => state.movieReducer);
  const refValueSearch = useRef(null);

  useEffect(() => {
    dispatch(getAllMovieListAction());
  }, []);

  const onSearch = (e) => {
    const value = e.target.value;

    if (refValueSearch.current) {
      clearTimeout(refValueSearch.current);
    }
    refValueSearch.current = setTimeout(() => {
      dispatch(getListMovieAction(value));
    }, 400);
  };
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => {
        return b.maPhim - a.maPhim;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "150px",

      render: (text, film, index) => {
        return (
          <>
            <img
              key={index}
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={100}
              height={100}
              onError={(e) => {
                return (
                  (e.target.onError = null),
                  (e.target.src = `https://picsum.photos/id/${index}/100/100`)
                );
              }}
            />
          </>
        );
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "150px",
      sorter: (b, a) => {
        let filmB = b.tenPhim?.toLowerCase().trim();
        let filmA = a.tenPhim?.toLowerCase().trim();
        if (filmB > filmA) {
          return 1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "400px",
      render: (text, film, index) => {
        return <p key={index}>{film.moTa.substring(0, 80)}...</p>;
      },
    },
    {
      title: "Hành Động",
      dataIndex: "hành động",
      key: "hành động",
      render: (text, film, index) => {
        return (
          <div key={index}>
            <NavLink to={`/home/movie/edit/${film.maPhim}`} className="mr-2">
              <FormOutlined style={{ color: "blue", fontSize: 20 }} />
            </NavLink>
            <Popconfirm
              title="Are you sure to delete this movie?"
              onConfirm={() => {
                dispatch(deleteMovieAction(film.maPhim));
              }}
              onCancel={() => {
                message.info("Clicked on No!");
              }}
              okText="Yes"
              cancelText="No">
              <DeleteOutlined className="mr-3 text-red-600 border-red-500 cursor-pointer text-xl" />
            </Popconfirm>
            <NavLink
              to={`/home/showtimes/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}>
              <CalendarOutlined className="text-green-600  border-red-500 cursor-pointer text-xl" />
            </NavLink>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container ">
      <div className="flex mb-3">
        <Button
          className="mr-2"
          onClick={() => {
            props.history.push("/home/movie/addmovie");
          }}>
          +Add Film..
        </Button>
        <Search
          className="w-1/2"
          onChange={onSearch}
          placeholder="Nhập tên phim để tìm"
          enterButton
        />
      </div>
      <Table
        columns={columns}
        dataSource={arrMovie}
        // onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}

export default MovieManagement;
