import React from "react";
import { Modal, Button, notification, Input, InputNumber, Form } from "antd";

import { useHistory } from "react-router-dom";
import UserService from "../../../services/user";
const userService = new UserService();
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

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

export const EditModal = ({
  editModalVisible,
  setEditModalVisible,
  handleReset,
  user,
}: {
  editModalVisible: boolean;
  setEditModalVisible: Function;
  handleSave: Function;
  user: any;
  handleReset: Function;
  loading: boolean;
}) => {
  const history = useHistory();

  const { first_name, last_name, age, profile, email } = user;

  const [values, setValues] = React.useState<any>();

  React.useEffect(() => {
    const { first_name, last_name, age, profile, id } = user;
    setValues({ first_name, last_name, age, profile, id });
  }, [user]);

  const [error, setError] = React.useState<any>({
    first_name: false,
    last_name: false,
    age: false,
    profile: false,
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
      profile: false,
    };
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

  const handleOkay = async (): Promise<void> => {
    setButtonLoading(true);
    const isValid = await isParamsValid();
    if (isValid) {
      try {
        const { data, success, message } = await userService.edit({
          ...values,
        });
        if (success) {
          setButtonLoading(false);
          notification.success({
            message: "Success",
            description: "Record successfully updated!",
          });
          handleReset();
          setEditModalVisible(false);
          return;
        }
        const errorMessage = `${message}`;
        notification.error({
          message: "Error",
          description: errorMessage,
        });
        return setButtonLoading(false);
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Login error",
          description: "Oops..,Something went wrong, Record update has Failed",
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
      <Modal
        visible={editModalVisible}
        title="Edit user"
        onOk={handleOkay}
        onCancel={() => {
          setEditModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setEditModalVisible(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={isButtonLoading}
            loading={isButtonLoading}
            onClick={handleOkay}
          >
            Save
          </Button>,
        ]}
      >
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
            <Input
              onChange={handleChange("first_name")}
              defaultValue={first_name}
            />
          </Form.Item>
          <Form.Item
            name={["user", "last_name"]}
            label="Last name"
            rules={[{ required: true }]}
          >
            <Input
              onChange={handleChange("last_name")}
              defaultValue={last_name}
            />
          </Form.Item>

          <Form.Item name={["user", "email"]} label="Email">
            <Input readOnly={true} disabled={true} defaultValue={email} />
          </Form.Item>
          <Form.Item
            name={["user", "age"]}
            label="Age"
            rules={[{ type: "number", min: 0, max: 99, required: true }]}
          >
            <InputNumber onChange={handleChange("age")} defaultValue={age} />
          </Form.Item>

          <Form.Item name={["user", "profile"]} label="Profile">
            <Input.TextArea
              onChange={handleChange("profile")}
              defaultValue={profile}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
