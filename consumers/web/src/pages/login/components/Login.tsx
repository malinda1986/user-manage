import React from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { setUserSession, getUser } from "../../../utils/session";
import UserService from "../../../services/user";

import "./login.scss";

const user = new UserService();
const ValidateEmail = (mail: string): boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail);
};

const Login = () => {
  const history = useHistory();
  const [values, setValues] = React.useState<any>({
    password: undefined,
    email: undefined,
  });
  const [error, setError] = React.useState<any>({
    password: false,
    email: false,
  });
  const [isButtonLoading, setButtonLoading] = React.useState(false);

  const isParamsValid = async (): Promise<boolean> => {
    const errorObject: any = {
      password: false,
      email: false,
    };
    if (!values.email || !ValidateEmail(values.email)) {
      errorObject.email = true;
    }
    if (!values.password) {
      errorObject.password = true;
    }
    await setError(errorObject);
    return !Object.values(errorObject).some((val: any) => val);
  };

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event?.target?.value });
    setError({
      ...error,
      [prop]:
        !event?.target?.value ||
        (prop === "email" && !ValidateEmail(event?.target?.value)),
    });
  };

  const loginToAccount = async () => {
    setButtonLoading(true);
    const isValid = await isParamsValid();
    if (isValid) {
      try {
        const { data, success, message } = await user.login({
          password: values.password,
          email: values.email,
        });

        if (success) {
          setButtonLoading(false);
          setUserSession(data?.token, data);
          history.push(`/users`);
          window.location.reload();
          return true;
        }
        const errorMessage = `${message}`;
        notification.error({
          message: "Login error",
          description: errorMessage,
        });
        return setButtonLoading(false);
      } catch (error) {
        notification.error({
          message: "Login error",
          description: "Oops..,Something went wrong, Login has Failed",
        });
        return setButtonLoading(false);
      }
    } else {
      notification.error({
        message: "Error",
        description: "Oops.. Invalid inputs",
      });
    }
    setButtonLoading(false);
  };

  if (getUser()) {
    history.push(`/users`);
  }

  return (
    <>
      <Form
        name="normal_login"
        className="login"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            onChange={handleChange("email")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            onChange={handleChange("password")}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={loginToAccount}
            disabled={isButtonLoading}
            loading={isButtonLoading}
          >
            Log in
          </Button>
          &nbsp; Or{" "}
          <a
            href=""
            onClick={() => {
              history.push({
                pathname: "/register",
              });
            }}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
