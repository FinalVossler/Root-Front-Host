import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  rotatingContainer: {
    display: "flex",
    flexDirection: "column",
    width: 350,
    backgroundColor: theme.contentBackgroundColor,
    color: theme.lightTextColor,
    height: 400,
    padding: 30,
    boxSizing: "border-box",
    margin: "auto",
    boxShadow: "3px 4px 20px hsl(0deg 0% 53% / 10%)",
    transition: "transform .6s ease 0s",
    transform: "perspective(3000px) rotateY(5deg)",
    animationName: "fadeInDown",
    marginTop: 10,
    marginBottom: 10,

    "&:hover $trait": {
      width: "100%",
    },
    "&:hover": {
      transform: "perspective(3000px) rotateY(15deg)",
    },
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    marginBottom: 26,

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 20,
    lineHeight: 1.6,
    color: theme.darkTextColor,
  },
  trait: {
    width: "70%",
    borderTop: "1px solid " + theme.darkTextColor,
    marginTop: 20,
    alignSelf: "flex-end",
    transition: ".3s ease-in-out 0s",
  },
  "@keyframes fadeInDown": {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@media (max-width: 800px)": {},
  "@media (max-width: 680px)": {},
}));

export default useStyles;
