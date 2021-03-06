//@ts-nocheck
import React, { Suspense, useEffect }  from "react";

import { Layout, Menu } from "antd";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";

import GlobalContextProvider from "../../context/global-context-provider";
import { routes } from "../../routes";
import { event } from "../../core/events";
import { LOGOUT_USER } from "../../core/events/common";
import Card from "../../components/card/Card";
import Loader from "../../components/loader";
import {PrivateRoute} from "./private"
import {PublicRoute} from "./public"

import { removeToken, getToken, getUser } from "../../utils/session";


import "antd/dist/antd.css";
import "./index.css";

const { Header, Content, Footer } = Layout;

const isAuth = () => {
  const _t = getToken();
  return _t != null ? true : false;
}

const Main = () => {

  useEffect(() => {
    event.subscribe(LOGOUT_USER, () => {
      toast.error("Token Has Expired, Please Login Again");
      window.location.replace("/login");
    });
    return () => {
      event.unsubscribe(LOGOUT_USER);
    };
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    removeToken()
    window.location.href = "/login"
  }

  return (
    <>
      <GlobalContextProvider>
        <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              {
                isAuth() ? <><Menu.Item key="2" >Welcome {getUser().first_name}</Menu.Item><Menu.Item key="1" onClick={()=> {handleLogout()}}>Logout</Menu.Item></>
                : <Menu.Item key="1" >Home</Menu.Item>
              }
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            
            <div className="site-layout-content">

            <Suspense
              fallback={
                <Card>
                  <Loader rms isLoading={true}/>
                </Card>
              }
            >
              <Switch>
                {routes
                  .filter((each) => each.path)
                  .map((route) => {
                   
                    const {auth} = route;
                    if(auth === true){
                      return <PrivateRoute isAuth = {isAuth} {...route}/>
                    }
                      return <PublicRoute {...route}/>
                  })}
                <Redirect from="/" to="/login" />
              </Switch>
            </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2021 Created by Malinda</Footer>
        </Layout>
          <>
            
          </>
        </Router>
      </GlobalContextProvider>
    </>
  );
};

export default Main;
