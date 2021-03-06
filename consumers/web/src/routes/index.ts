import React from "react";
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const List = React.lazy(() => import('../pages/list'));

export const BASE_PATH = ''

export const routes = [
    {
        id: 1,
        name: 'Login',
        path: `${BASE_PATH}/login`,
        exact: true,
        auth: false,
        Component: Login
    },
    {
        id: 2,
        name: 'Register',
        path: `${BASE_PATH}/register`,
        exact: true,
        auth: false,
        Component: Register
    },
    {
        id: 3,
        name: 'Users',
        path: `${BASE_PATH}/users`,
        exact: true,
        auth: true,
        Component: List
    },
];