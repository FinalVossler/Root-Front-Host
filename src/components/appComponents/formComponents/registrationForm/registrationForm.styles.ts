import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  registrationContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.formMaxWidth,
    width: "80%",
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "transparent",
    margin: "auto",
    marginBottom: 0,
    marginTop: 5,
  },
  registrationTitle: {
    fontSize: 30,
    color: theme.darkTextColor,
    textAlign: "center",
    marginTop: 0,
  },
  firstNameAndLastName: {
    display: "flex",
    alignItems: "center",
    widht: "100%",
    gap: 15,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
