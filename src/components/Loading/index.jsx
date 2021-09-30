import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import loadingGif from '../../assets/img/loading.gif'

function LoadingComponent() {
    const { isLoading } = useSelector(state => state.loadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className="flex items-center justify-center h-screen w-screen"
          style={{ position: "fixed", backgroundColor: "#ffcefb", zIndex: '10' }}>
          <img src={loadingGif} alt="loading"></img>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default LoadingComponent
