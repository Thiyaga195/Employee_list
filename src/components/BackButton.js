import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { BackButtons } from "./BackButtonStyle";
export const BackButton = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/employee/");
  };
  return (
    <BackButtons>
      <Button
        variant="contained"
        color="primary"
        justify="flex-end"
        onClick={() => goBack()}
      >
        Go Back
      </Button>
    </BackButtons>
  );
};

export default BackButton;
