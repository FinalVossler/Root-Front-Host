import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  roleEntityUserAssignmentPermissionsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  selectedRolesContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  selectedRoleContainer: {
    marginTop: 10,
    marginBottom: 10,
    border: "1px solid " + theme.lightTextColor,
    padding: 10,

    position: "relative",
  },
  deleteRoleButton: {
    cursor: "pointer",
    position: "absolute",
    right: 0,
    top: 0,
    color: theme.errorColor,
  },
  roleName: {
    color: theme.lightTextColor,
  },
}));

export default useStyles;
