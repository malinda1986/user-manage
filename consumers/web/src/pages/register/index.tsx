import React from "react";
import Register from "./components/Register";
import UserService from "../../services/user";

const user = new UserService()

const Index = () => {
  return (
    <>
      <Register
        onSubmit={user.login}
      />
    </>
  );
};

export default Index;
