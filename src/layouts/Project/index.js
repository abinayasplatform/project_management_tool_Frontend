// react-router-dom components
import { Link, Router, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const moment = require("moment");

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

//// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

function Project() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "  ",
    teamLeader: "",
    members: [],
    projStatus: "",
  });
  const [userdata, setUserdata] = useState();
  const [projectdata, setProjectdata] = useState();
  const [buttonText, setButtonText] = useState("Create Project");
  const [memberDisplay, setMemberDisplay] = useState(false);
  var token = localStorage.getItem("token");
  var decoded = jwtDecode(token);
  const navigate = useNavigate();
  if (decoded.role == "team leader") {
    formData.teamLeader = decoded.userId;
  }
  ////
  useEffect(() => {
    if (id) {
      fetchProject(id);
      fetchMembers();
      setButtonText("Update Project");
      setMemberDisplay(true);
      const decoded = jwtDecode(token);
      formData.members.push(decoded.userId);
    } else fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/api/getAllUsers`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserdata(response.data);
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };

  const fetchProject = async (id) => {
    var projectId = id;
    try {
      const resultdata = await axios({
        method: "get",
        url: `http://localhost:3000/project/${projectId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProjectdata(resultdata.data.data);
      formData.title = projectdata.title;
      formData.description = projectdata.description;
      formData.category = projectdata.category;
      formData.deadline = projectdata.deadline;
      formData.projStatus = projectdata.projStatus;
      formData.members = projectdata.members;
    } catch (error) {
      console.log("error on fetching project details " + error);
    }
  };

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
        method: "post",
        url: "http://localhost:3000/project/createProject",
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      window.alert("Project Created Successfully");
      navigate("/Projects");
    } catch (error) {
      console.log("error on project creation " + error);
      window.alert("Project Creation Failed");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:3000/project/${id}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //console.log(response);
      if (response.data.msg == "Successfully updated") {
        window.alert("Project Updated Successfully");
        navigate("/Projects");
      } else {
        window.alert("Project Updation Failed");
      }
    } catch (error) {
      console.log("error on Project updation creation " + error);
      window.alert("Project Updation Failed");
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
            Project Management Tool
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Project
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="title"
                label="Project Title"
                value={formData.title}
                placeholder=""
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
                placeholder=""
                fullWidth
                onChange={handleChange}
              />
              <MDBox mb={3} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Project Category
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    name="category"
                    variant="standard"
                    value={formData.category}
                    onChange={handleChange}
                    label="Project Category"
                    placeholder=""
                    fullWidth
                  >
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Educational">Educational</MenuItem>
                    <MenuItem value="Agricultural">Agricultural</MenuItem>
                    <MenuItem value="Health care">Health care</MenuItem>
                    <MenuItem value="Electronics & Communication">
                      Electronics & Communication
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>{" "}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Deadline"
                  variant="outlined"
                  inputFormat="yyyy-MM-dd"
                  placeholder=""
                  name="deadline"
                  value={moment(formData.deadline).format("YYYY-MM-DD")}
                  fullWidth
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Project Status
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={formData.projStatus}
                    name="projStatus"
                    variant="standard"
                    placeholder=""
                    onChange={handleChange}
                    label="Project Status"
                    fullWidth
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="InProgress">InProgress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>

              <MDBox mb={3} mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label" variant="standard">
                    Member
                  </InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    name="members"
                    variant="standard"
                    value={formData.members}
                    onChange={handleChange}
                    label="Member"
                    disabled={memberDisplay}
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

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  title="Click to submit"
                  fullWidth
                  onClick={() => {
                    buttonText == "Create Project" ? handleSubmit() : handleUpdate();
                  }}
                >
                  {buttonText}
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default Project;
