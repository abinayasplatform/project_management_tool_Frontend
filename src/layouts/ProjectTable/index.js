import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const moment = require("moment");
const _ = require("lodash");
import { useNavigate } from "react-router-dom";
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
import SortIcon from "@mui/icons-material/Sort";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import printDocument from "layouts/pdfdownload";

const ProjectTable = () => {
  let [data, setData] = useState([]);

  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    fetchProject();
  }, []);
  const fetchProject = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-qgcw.onrender.com/api/data/${decoded.userId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setData(response.data.data.projects);
      console.log(data);
    } catch (error) {
      console.log("error on project creation " + error);
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
                    return e.projStatus;
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
                endIconIcon={<FileDownloadOutlinedIcon />}
              >
                Print List
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
                // display="flex"
                // justifyContent="center"
                coloredShadow="info"
              >
                <MDTypography variant="h5" color="white" align="center">
                  Project List
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
                          <h4>Description</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Category</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Deadline </h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Team Head</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Status </h4>
                        </TableCell>
                      </TableRow>

                      {data.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.category}</TableCell>
                          <TableCell align="center">
                            {moment(row.deadline).format("DD/MM/YY")}
                          </TableCell>
                          <TableCell align="center">{decoded.username}</TableCell>
                          <TableCell align="center">{row.projStatus}</TableCell>
                          {/* <TableCell align="center">
                            <Button
                              onClick={() => deleteProject(row._id)}
                              variant="contained"
                              color="info"
                            >
                              Remove
                            </Button>
                          </TableCell> */}
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                navigate(`/Project/Edit/${row._id}`);
                                //taskEdit(row);
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

export default ProjectTable;
