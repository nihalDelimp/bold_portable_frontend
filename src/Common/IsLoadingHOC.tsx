import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import '../assets/css/loaderStyle.css';

const Loading = () => {
  return (
    <div className="loaderHolder">
      <div className="loaderMain">
        <Circles
          height="80"
          width="80"
          color="#ff8600"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

const IsLoadingHOC = (WrappedComponent: any) => {
  function HOC(props: any) {
    const [isLoading, setLoading] = useState(false);

    const setLoadingState = (isComponentLoading: boolean) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <Loading />}
        <WrappedComponent
          {...props}
          isLoading={isLoading}
          setLoading={setLoadingState}
        />
      </>
    );
  }
  return HOC;
};

export default IsLoadingHOC;
