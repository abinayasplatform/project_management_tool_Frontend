import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.API_URL;

// @mui material components

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

function Cover() {
  var token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChecked) {
      try {
        const response = await axios.post(
          "https://project-management-tool-backend-hnbz.onrender.com/api/register",
          formData
        );
        console.log(response);
        if ((response.data.msg = "User created successfully")) {
          window.alert("User created successfully ‼️ ");
          navigate("/TeamMembers");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    } else {
      window.alert("Accept the terms and condition register  ‼️ ");
    }
    // alert("Form submitted:" + JSON.stringify(formData));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Project Management
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Add Member
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                label="Username"
                variant="standard"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="number"
                name="phoneNumber"
                label="Phone Number"
                variant="standard"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                label="Password"
                variant="standard"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label" variant="standard">
                  Role
                </InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  // value={selectedOption}
                  value={formData.role}
                  name="role"
                  variant="standard"
                  onChange={handleChange}
                  label="Role"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="team leader">Team Lead</MenuItem>
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="tester">Tester</MenuItem>
                  <MenuItem value="analyst">Analyst</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp; Agree to add new member in team &nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              ></MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSubmit} fullWidth>
                Add Member
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
