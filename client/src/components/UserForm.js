import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserForm({ token }) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //   const [dateOfBirth, setDateOfBirth] = useState("");
  //   const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, token }),
    };

    fetch("http://localhost:4000/register", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack sx={{ marginBottom: 4 }}>
        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="Name"
          onChange={(e) => setName(e.target.value.trim())}
          value={name}
          fullWidth
          required
        />
      </Stack>
      <TextField
        type="email"
        variant="outlined"
        color="secondary"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        fullWidth
        required
        sx={{ mb: 4 }}
      />

      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        onClick={onSubmit}
      >
        Register
      </Button>
    </form>
  );
}
