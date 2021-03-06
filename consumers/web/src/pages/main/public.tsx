import React from "react";
import { Route } from "react-router-dom";

export const PublicRoute = (props: any) => {
    const { Component, idx, path, exact }= props;
    return (
        <Route
            key={idx}
            path={path}
            exact={exact}
          render={(props) => 
              <Component {...props} />
          } 
        />
      );
}