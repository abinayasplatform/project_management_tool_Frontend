import React, { useState, useEffect } from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";

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
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import printDocument from "layouts/pdfdownload";

const MemberTable = () => {
  const [userdata, setUserdata] = useState();
  var token = localStorage.getItem("token");

  useEffect(() => {
    fetchMembers();
  }, []);
  const fetchMembers = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `https://project-management-tool-backend-hnbz.onrender.com/api/getAllUsers`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUserdata(response.data);
    } catch (error) {
      console.log("error on project creation " + error);
    }
  };

  const deleteMember = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `https://project-management-tool-backend-hnbz.onrender.com/api/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.msg == "User deleted successfully") {
        window.alert("User deleted successfully");
        fetchMembers();
      } else {
        window.alert("Unable to delete the User ");
      }
    } catch (error) {
      console.log("error on deleting the User" + error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox display="flex" justifyContent="flex-end">
              {/* <Button
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
              </Button> */}

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
                  Team Member List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <h4>Name</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Role</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>Email</h4>
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          <h4>phoneNumber</h4>
                        </TableCell>
                        {/* <TableCell align="center">
                          {" "}
                          <h4>Assigned To</h4>
                        </TableCell> */}
                      </TableRow>

                      {userdata != undefined
                        ? userdata.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell align="center">{row.username}</TableCell>
                              <TableCell align="center">{row.role}</TableCell>
                              <TableCell align="center">{row.email} </TableCell>
                              <TableCell align="center">{row.phoneNumber}</TableCell>
                              {/* <TableCell align="center">{row.assignedTo}</TableCell> */}
                              <TableCell align="right">
                                <Button
                                  onClick={() => deleteMember(row._id)}
                                  variant="text"
                                  color="info"
                                  endIcon={<DeleteIcon />}
                                ></Button>
                              </TableCell>
                            </TableRow>
                          ))
                        : console.log("no data")}
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

export default MemberTable;
