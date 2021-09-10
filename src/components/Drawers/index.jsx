import React from "react";
import { Button, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../store/constants/drawerConstants";

function DrawerComponent(props) {
    const dispatch = useDispatch();
  const { visible, title, ContentComponent, funcSubmit } = useSelector(
    (state) => state.drawerReducer
  );


  const onClose = () => {
      dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <Drawer
        title={title}
        onClose={onClose}
        width={500}
        placement="right"
        visible={visible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={funcSubmit} type="primary">
              Submit
            </Button>
          </div>
        }>
        {ContentComponent}
      </Drawer>
    </>
  );
}

export default DrawerComponent;
