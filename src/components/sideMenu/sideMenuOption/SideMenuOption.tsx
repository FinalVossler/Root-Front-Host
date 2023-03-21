import React from "react";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./sideMenuOption.styles";

interface ISideMenuOption {
  title: string;
  Icon: any;
  onClick?: () => void;
}

const SideMenuOption: React.FunctionComponent<ISideMenuOption> = (
  props: ISideMenuOption
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <div onClick={props.onClick} className={styles.sideMenuOptionContainer}>
      <props.Icon className={styles.optionIcon} />
      <span className={styles.optionTitle}>{props.title}</span>
    </div>
  );
};

export default SideMenuOption;
