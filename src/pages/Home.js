import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HomePage } from "./HomeStyle";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  const history = useNavigate();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to deleted the record?")) {
      dispatch(deleteUser(id));
    }
  };

  const historyPush = (path) => {
    history(path);
  };

  return (
    <HomePage>
      <Header />
      <div className="add-user-btn">
        <Button
          variant="contained"
          color="primary"
          onClick={() => historyPush("/employee/addUser")}
        >
          Add User{" "}
        </Button>
      </div>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.fname}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.lname}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.gender}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button
                        color="primary"
                        onClick={() => historyPush(`/editUser/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HomePage>
  );
};

export default Home;
