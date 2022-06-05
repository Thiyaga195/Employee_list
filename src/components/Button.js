import React from "react";
import Button from "@mui/material/Button";
import { ButtonItem } from "./HeaderStyle";
import { useNavigate } from "react-router-dom";

export const Buttons = () => {
  const history = useNavigate();
  const historyPush = (path) => {
    history(path);
  };
  return (
    <ButtonItem>
      <Button
        variant="contained"
        color="primary"
        onClick={() => historyPush("/addUser")}
      >
        Add User{" "}
      </Button>
    </ButtonItem>
  );
};
