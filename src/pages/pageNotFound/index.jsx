import React from "react";
import { Result, Button } from "antd";

function PageNotFound(props) {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Trang này không tồn tại!"
        extra={
          <Button
            type="primary"
            onClick={() => {
              props.history.goBack();
            }}>
            Back
          </Button>
        }
      />
    </div>
  );
}

export default PageNotFound;
