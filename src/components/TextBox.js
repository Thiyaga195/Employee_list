import { useState } from "react";
import TextField from "@mui/material/TextField";

export const TextBox = (props) => {
  const {
    name,
    value,
    onChange,
    label,
    type,
    id,
    minLength = 0,
    maxLength = 200,
    error,
  } = props;
  const [state, setState] = useState(value || "");
  console.log(error);
  const handleChange = (event) => {
    setState(event.target.value);
    onChange(event);
  };

  return (
    <div>
      <TextField
        id={id}
        error={!!error}
        helperText={error || ""}
        label={label}
        type={type === "phone" ? "tel" : type}
        name={name}
        value={state}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextBox;
