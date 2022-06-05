import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/actions";
import TextBox from "../components/TextBox";
import { Header } from "../components/Header";
import { InnerBox } from "./AddUserStyle";
import Joi from "joi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import BackButton from "../components/BackButton";

const MIN_LENGTH = 6;
const MAX_LENGTH = 10;
const PHONE = /^\+65(6|8|9)\d{7}$/;
const schema = Joi.object({
  fname: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH),
  lname: Joi.string().min(MIN_LENGTH).max(MAX_LENGTH),
  email: Joi.string().email({ tlds: false }),
  gender: Joi.string().allow("male", "female", "others"),
  phone: Joi.string().regex(PHONE),
});
const AddUser = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [error, setError] = useState(null);

  const { fname, lname, email, gender, phone } = user;

  const history = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    history("/employee/");
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(user, { abortEarly: false });

    console.log(JSON.stringify(error));
    setError(error);
    console.log(user);
    if (error) return;

    dispatch(addUser(user));
    history("/employee/");
  };

  const getError = (name) => {
    if (!error) return null;
    const { details } = error;
    const detail = details.find((i) => i.path[0] === name);
    return detail ? detail.message : null;
  };

  return (
    <div>
      <Header />
      <BackButton />
      <InnerBox>
        <h2>Add User</h2>
        {error && <p style={{ color: "red" }}>Please fill all the fields</p>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextBox
            id="outlined-basic"
            label="First Name"
            type="text"
            error={getError("fname")}
            name="fname"
            value={fname}
            onChange={handleChange}
            minLength={6}
            maxLength={10}
          />
          <TextBox
            id="outlined-basic"
            label="Last Name"
            type="text"
            error={getError("lname")}
            name="lname"
            value={lname}
            onChange={handleChange}
            minLength={6}
            maxLength={10}
          />
          <br />
          <TextBox
            id="outlined-basic"
            label="Email"
            type="email"
            error={getError("email")}
            name="email"
            value={email || ""}
            onChange={handleChange}
          />
          <br />

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="gender"
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <br />
          <TextBox
            id="outlined-basic"
            label="Phone"
            type="phone"
            error={getError("phone")}
            name="phone"
            value={phone || ""}
            onChange={handleChange}
          />
          <br />
          <div className="buttonStyles.root btn">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Box>
      </InnerBox>
    </div>
  );
};

export default AddUser;
