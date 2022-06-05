import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getEditUser } from "../store/actions";
import { Header } from "../components/Header";
import { InnerBox } from "./AddUserStyle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import BackButton from "../components/BackButton";

const EditUser = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const { fname, lname, email, gender, phone } = state;

  let history = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);

  const goBack = () => {
    history("/employee/");
  };

  useEffect(() => {
    dispatch(getEditUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fname || !lname || !email || !gender || !phone) {
      setError("Please fill all the fields");
    } else {
      dispatch(updateUser(state, id));
      history("/employee/");
      setError("");
    }
  };

  return (
    <div>
      <Header />
      <BackButton />
      <InnerBox>
        <h2>Edit User</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            type="text"
            name="fname"
            value={fname || ""}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Last Name"
            type="text"
            name="lname"
            value={lname || ""}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
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
          <TextField
            id="outlined-basic"
            label="Phone"
            type="phone"
            name="phone"
            value={phone || ""}
            onChange={handleChange}
          />
          <br />
          <div className="buttonStyles.root btn">
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </div>
        </Box>
      </InnerBox>
    </div>
  );
};

export default EditUser;
