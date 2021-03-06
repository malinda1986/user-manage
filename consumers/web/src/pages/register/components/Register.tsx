import React from "react";
import { Form, Input, Button, InputNumber, notification } from "antd";
import { useHistory } from "react-router-dom";
import UserService from "../../../services/user";

import "./register.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const user = new UserService();

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Register = ({ onSubmit }: { onSubmit: Function }) => {
  const history = useHistory();

  const [values, setValues] = React.useState<any>({
    first_name: undefined,
    last_name: undefined,
    age: undefined,
    password: undefined,
    profile: undefined,
    email: undefined,
  });

  const [error, setError] = React.useState<any>({
    password: false,
    email: false,
  });
  const [isButtonLoading, setButtonLoading] = React.useState(false);

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event?.target?.value || event });
    setError({
      ...error,
      [prop]: !event?.target?.value,
    });
  };

  const isParamsValid = async (): Promise<boolean> => {
    const errorObject: any = {
      first_name: false,
      last_name: false,
      age: false,
      password: false,
      profile: false,
      email: false,
    };
    if (!values.email) {
      errorObject.email = true;
    }
    if (!values.password) {
      errorObject.password = true;
    }
    if (!values.last_name) {
      errorObject.last_name = true;
    }
    if (!values.first_name) {
      errorObject.first_name = true;
    }
    if (!values.age) {
      errorObject.age = true;
    }

    await setError(errorObject);
    return !Object.values(errorObject).some((val: any) => val);
  };

  const register = async () => {
    setButtonLoading(true);
    const isValid = await isParamsValid();
    if (isValid) {
      try {
        const { success, message } = await user.register({
          ...values,
        });

        if (success) {
          setButtonLoading(false);
          notification.success({
            message: "Success",
            description: "Your account has been created!",
          });
          history.push(`/login`);
          // window.location.reload();
          return true;
        }
        const errorMessage = `${message}`;
        notification.error({
          message: "Registration error",
          description: errorMessage,
        });
        return setButtonLoading(false);
      } catch (error) {
        notification.error({
          message: "Registration error",
          description:
            "Oops..,Something went wrong, Your registration has Failed",
        });
        return setButtonLoading(false);
      }
    } else {
      notification.error({
        message: "Error",
        description: "Oops.. Please fill required fields!",
      });
    }
    setButtonLoading(false);
  };

  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        className="register"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "first_name"]}
          label="First name"
          rules={[{ required: true }]}
        >
          <Input onChange={handleChange("first_name")} />
        </Form.Item>
        <Form.Item
          name={["user", "last_name"]}
          label="Last name"
          rules={[{ required: true }]}
        >
          <Input onChange={handleChange("last_name")} />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input type={"password"} onChange={handleChange("password")} />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input onChange={handleChange("email")} />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99, required: true }]}
        >
          <InputNumber onChange={handleChange("age")} />
        </Form.Item>

        <Form.Item
          name={["user", "profile"]}
          label="Profile"
          rules={[{ required: true }]}
        >
          <Input.TextArea onChange={handleChange("profile")} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={register}
            disabled={isButtonLoading}
            loading={isButtonLoading}
          >
            Register
          </Button>
          &nbsp; Or{" "}
          <a
            href=""
            onClick={() => {
              history.push({
                pathname: "/login",
              });
            }}
          >
            {" "}
            Login here!
          </a>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
