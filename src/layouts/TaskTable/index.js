import React, { useState, useEffect } from "react";
import axios from "axios";
const moment = require("moment");
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SortIcon from "@mui/icons-material/Sort";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import printDocument from "layouts/pdfdownload";

const TaskTable = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  useEffect(() => {
    fetchTask();
  }, []);
  const fetchTask = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-hnbz.onrender.com/api/data/${decoded.userId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response);
      setData(response.data.data.tasks);
      console.log(data);
      //  navigate("/home");
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `https://project-management-tool-backend-hnbz.onrender.com/tasks/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.msg == "Task deleted successfully") {
        window.alert("Task deleted successfully");
        handleSubmit();
      } else {
        window.alert("Unable to delete the Task ");
      }
    } catch (error) {
      console.log("error on deleting the Task" + error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox display="flex" justifyContent="flex-end">
              <Button
                onClick={() => {
                  var sorted = _.sortBy(data, (e) => {
                    return e.deadline;
                  });
                  console.log(sorted);
                  setData(sorted);
                }}
                variant="text"
                color="info"
                title="sort by deadline"
                startIcon={<SortIcon />}
              >
                Deadline
              </Button>
              <Button
                onClick={() => {
                  var sorted = _.sortBy(data, (e) => {
                    return e.taskStatus;
                  });
                  console.log(sorted);
                  setData(sorted);
                }}
                variant="text"
                color="info"
                title="sort by status"
                startIcon={<AssignmentTurnedInIcon />}
              >
                Status
              </Button>

              <Button
                onClick={() => printDocument()}
                id="download"
                variant="contained"
                color="success"
                endIcon={<FileDownloadOutlinedIcon />}
              >
                Print list
              </Button>
            </MDBox>
          </Grid>
          <Grid item xs={12} id="divToPrint">
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                {" "}
                <MDTypography variant="h5" color="white" align="center">
                  Task List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <h4>Title</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Description</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Deadline</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Status</h4>
                        </TableCell>
                        {/* <TableCell align="center">
                          {" "}
                          <h4>Assigned To</h4>
                        </TableCell> */}
                      </TableRow>

                      {data.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell align="left">{row.taskName}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="center">
                            {moment(row.deadline).format("DD/MM/YY")}
                          </TableCell>
                          <TableCell align="center">{row.taskStatus}</TableCell>
                          {/* <TableCell align="center">{row.assignedTo}</TableCell> */}
                          <TableCell align="right">
                            <Button
                              onClick={() => deleteTask(row._id)}
                              variant="text"
                              color="info"
                              endIcon={<DeleteIcon />}
                            ></Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              onClick={() => {
                                navigate(`/Task/Edit/${row._id}`);
                              }}
                              variant="text"
                              color="info"
                              startIcon={<ModeEditOutlineOutlinedIcon />}
                            ></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default TaskTable;
