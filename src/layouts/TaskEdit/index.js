// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";
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

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpg";

function TaskEdit() {
  const { id } = useParams();
  const [taskdata, setTaskdata] = useState();
  const [userdata, setUserdata] = useState();
  const [projectdata, setProjectdata] = useState();
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

  useEffect(() => {
    fetchTask();
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-qgcw.onrender.com/api/getAllUsers`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserdata(response.data);
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };
  // Fetch project details
  const fetchProject = async () => {
    try {
      const resultdata = await axios({
        method: "get",
        url: `https://project-management-tool-backend-qgcw.onrender.com/project/${taskdata.project}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProjectdata(resultdata.data.data);
      formData.project = projectdata.title;
    } catch (error) {
      console.log("error on fetching project details " + error);
    }
  };

  // Function to fetch Task deatails by Id from the database
  const fetchTask = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-qgcw.onrender.com/tasks/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTaskdata(response.data.data);
      // Function to assign Task deatails to input
      formData.taskName = taskdata.taskName;
      formData.description = taskdata.description;
      formData.assignedTo = taskdata.assignedTo;
      formData.assignedBy = taskdata.assignedBy;
      formData.deadline = taskdata.deadline;
      formData.project = taskdata.project;
      formData.taskStatus = taskdata.taskStatus;
      fetchProject(); //To fetch project name
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };

  // to assign value to form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `https://project-management-tool-backend-qgcw.onrender.com/tasks/${id}`,
        data: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //console.log(response);
      if (response.data.msg == "Successfully updated") {
        window.alert("Task Updated Successfully");
        navigate("/Tasks");
      } else {
        window.alert("Task Updation Failed");
      }
    } catch (error) {
      console.log("error on task updation creation " + error);
      window.alert("Task Updation Failed");
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
            <MDBox mb={2}>
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
            </MDBox>
            <MDBox mb={2} mt={2}>
              <MDInput
                type="text"
                label="project"
                variant="outlined"
                name="project"
                value={formData.project}
                fullWidth
                onChange={handleChange}
                disabled
              />
            </MDBox>
            <MDBox mb={2} mt={2}>
              <MDInput
                type="date"
                label="Deadline"
                variant="outlined"
                inputFormat="yyyy-MM-dd"
                name="deadline"
                value={moment(formData.deadline).format("YYYY-MM-DD")}
                fullWidth
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={4}>
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

              <MDBox mb={2} mt={2}>
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
                    selected
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
                    handleUpdate();
                  }}
                >
                  Update Task
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default TaskEdit;
