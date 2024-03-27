import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const styles = createUseStyles((theme: ITheme) => ({
  successfulPaymentPageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  success: {
    fontSize: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  successfulPaymentTitle: {
    marginBottom: 10,
    color: theme.darkTextColor,

    marginTop: 0,
  },
  confirmationEmailNotice: {},
}));

export default styles;
