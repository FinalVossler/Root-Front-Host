import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  TitleTextAndImageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    background: "transparent",
    marginTop: 20,
    width: "80%",
    margin: "auto",
    color: theme.darkTextColor,
    marginBottom: 20,
    maxWidth: 1100,
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    color: theme.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontWeight: "bold",
    width: "80%",
    lineHeight: 1.4,
  },
  image: {
    height: 250,
    width: 250,
    borderRadius: 15,

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
  },
  "@media (max-width: 850px)": {
    TitleTextAndImageContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      textAlign: "center",
    },
    description: {
      width: "100%",
      textAlign: "center",
      marginBottom: 30,
    },
  },
}));

export default useStyles;
