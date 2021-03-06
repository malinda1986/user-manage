import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props: any) => {
    const {isAuth, Component } = props;
    return (
        <Route
          render={(props) => 
            isAuth() ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login"
                }}
              />
            )
          }
        />
      )
}