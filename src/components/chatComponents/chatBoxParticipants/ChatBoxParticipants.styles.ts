import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxParticipantsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primary,
    marginLeft: 20,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
    boxShadow: theme.boxShadow,
    cursor: "pointer",
    overflow: "auto",
  },
  highlightedChatBoxParticipantsContainer: {
    extend: "chatBoxParticipantsContainer",
  },
  participantContainer: {
    display: "flex",
    height: 40,

    alignItems: "center",
    padding: 5,
    paddingRight: 20,
    boxSizing: "border-box",
    alignSelf: "flex-start",
    borderRadius: 5,

    "&:hover": {
      backgroundColor: theme.darkerPrimary,
    },
  },
  backArrow: {
    cursor: "pointer",
    color: theme.lightTextColor,
    marginLeft: 10,
    fontSize: 15,
    marginRight: 0,
    fontWeight: "bold",
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: "50%",
    marginRight: 5,
    color: theme.lightTextColor,
  },
  participantName: {
    color: theme.lightTextColor,
    fontWeight: "bold",
    position: "relative",
    top: 2,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
