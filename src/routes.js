import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Tasks from "layouts/billing";

import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Project from "layouts/Project";
import ProjectTable from "layouts/ProjectTable";
import TaskTable from "layouts/TaskTable";
import Task from "layouts/Task";
import TaskEdit from "layouts/TaskEdit";
// @mui icons
import Icon from "@mui/material/Icon";
import MemberTable from "layouts/MemberTable";

const routes = [
  {
    type: "collapse",
    name: "Projects",
    key: "Projects",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Projects",
    component: <ProjectTable />,
  },

  {
    type: "collapse",
    name: "Tasks",
    key: "Tasks",
    icon: <Icon fontSize="small">toc</Icon>,
    route: "/Tasks",
    component: <TaskTable />,
  },
  {
    type: "collapse",
    name: "Team",
    key: "Team",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/TeamMembers",
    component: <MemberTable />,
  },

  {
    type: "collapse",
    name: "New Project",
    key: "Project",
    icon: <Icon fontSize="small">attach_file</Icon>,
    route: "/Project",
    component: <Project />,
  },
  {
    type: "collapse",
    name: "Create Task",
    key: "Create Task",
    icon: <Icon fontSize="small">playlist_add</Icon>,
    route: "/CreateTask",
    component: <Task />,
  },
  {
    type: "hidden",
    name: "Edit Task",
    key: "Edit Task",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "Task/Edit/:id",
    component: <TaskEdit />,
  },
  {
    type: "hidden",
    name: "Edit Project",
    key: "Edit Project",
    route: "/Project/Edit/:id",
    component: <Project />,
  },

  {
    type: "collapse",
    name: "Add Member",
    key: "add member",
    icon: <Icon fontSize="small">person_add</Icon>,
    route: "/authentication/addMember",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
