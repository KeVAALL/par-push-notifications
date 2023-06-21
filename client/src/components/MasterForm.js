import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Stack, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MasterForm({ token }) {
  const [task, setTask] = useState("");

  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState([]);

  const handleChange = (event) => {
    // setUsers(event.target.value);.
    setSelectedUser(event.target.value);
    console.log(selectedUser);
  };
  const navigate = useNavigate();
  //   const [dateOfBirth, setDateOfBirth] = useState("");
  //   const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/getUsers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, selectedUser }),
    };

    fetch("http://localhost:4000/assign", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* <Stack direction="row" spacing={10} sx={{ marginBottom: 4 }}> */}
      <TextField
        type="text"
        variant="outlined"
        color="secondary"
        label="Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        fullWidth
        required
      />

      {/* <Stack> */}
      <Select
        // labelId="demo-simple-select-standard-label"
        id="UserSelect"
        value={selectedUser}
        onChange={handleChange}
        label="Users"
        // fullWidth
      >
        {users?.map((user, id) => (
          <MenuItem key={id} value={user}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      {/* </Stack> */}

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        fullWidth
        onClick={onSubmit}
      >
        Assign
      </Button>
      {/* </Stack> */}
    </form>
  );
}
