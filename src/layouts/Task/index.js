// react-router-dom components
import { Link, Router, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

function Task() {
  const [projectdata, setProjectdata] = useState();
  const [userdata, setUserdata] = useState();
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedTo: "",
    assignedBy: "",
    deadline: " ",
    project: "",
    taskStatus: "",
  });
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  if (decoded.role == "team leader") {
    formData.assignedBy = decoded.userId;
  }
  useEffect(() => {
    fetchMembers();
    fetchProjects();
  }, []);
  // Function to fetch categories from the database
  const fetchProjects = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-nz6s.onrender.com/api/data/${decoded.userId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setProjectdata(response.data.data.projects);
      console.log(response);
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };
  //Fetch user data
  const fetchMembers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-nz6s.onrender.com/api/getAllUsers`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserdata(response.data);
      console.log(response);
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };
  // Fetch categories when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: "https://project-management-tool-backend-nz6s.onrender.com/tasks/createTask",
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/Tasks");
      window.alert("Task Created Successfully");
    } catch (error) {
      console.log("error on project creation " + error);
      window.alert("Task Creation Failed");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card sx={{ width: 600, mx: -20 }}>
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
            Task Creation
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Task
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="taskName"
                label="Task Title"
                value={formData.taskName}
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={4}>
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                multiline
                rows={4}
                fullWidth
                onChange={handleChange}
              />

              <MDBox mb={3} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Assigned To
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    name="assignedTo"
                    variant="standard"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    label="Assigned To"
                    fullWidth
                  >
                    {userdata != undefined
                      ? userdata.map((e) => {
                          return (
                            <MenuItem key={e._id} value={e._id}>
                              {e.username}
                            </MenuItem>
                          );
                        })
                      : console.log("no data")}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={3} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Project
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    name="project"
                    variant="standard"
                    value={formData.project}
                    onChange={handleChange}
                    label="Project"
                    fullWidth
                  >
                    {projectdata != undefined
                      ? projectdata.map((e) => {
                          return (
                            <MenuItem key={e._id} value={e._id}>
                              {e.title}
                            </MenuItem>
                          );
                        })
                      : console.log("no data")}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Deadline"
                  variant="outlined"
                  Placeholder=""
                  name="deadline"
                  value={formData.deadline}
                  fullWidth
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Task Status
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={formData.taskStatus}
                    name="taskStatus"
                    variant="standard"
                    onChange={handleChange}
                    label="taskStatus"
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create Task
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default Task;
