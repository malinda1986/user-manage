import React from "react";
import "./styles.css";
import "./styles.scss";

type LoaderProps = {
  isLoading: boolean,
  error?: any;
  rms?: Boolean;
  style?:any;
};

function loader(props: LoaderProps) {
  const { isLoading, error, rms, style } = props;
  
  if (rms) {
    return (
      <div className="pos-loader-wrapper" style={{position:'absolute', ...style}}>
        <div className="pos-loader-wrapper__lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="pos-loader-wrapper__text">Please wait.</div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
  // Handle the error state
  else if (error) {
    return <div>{"Sorry, there was a problem loading the page."}</div>;
  } else {
    return null;
  }
}

export default loader;
