import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const styles = createUseStyles((theme: ITheme) => ({
  paymentResultPageContainer: {
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
    color: theme.primary,
    marginTop: 10,
  },
  paymentTitle: {
    marginBottom: 10,
    color: theme.darkTextColor,

    marginTop: 0,
  },
  confirmationEmailNotice: {},
  retryOrContinueShopping: {},
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
}));

export default styles;
