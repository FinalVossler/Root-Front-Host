import React from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./sideMenuOption.styles";

type SubOption = {
  title: string;
  link: string;
  Icon: any;
};

interface ISideMenuOption {
  title: string;
  Icon: any;
  onClick?: () => void;
  subOptions?: SubOption[];
  link?: string;
}

const SideMenuOption: React.FunctionComponent<ISideMenuOption> = (
  props: ISideMenuOption
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [extended, setExtended] = React.useState<boolean>(false);

  const styles = useStyles({ theme });

  const handleTriggerExtended = () => setExtended(!extended);

  return (
    <React.Fragment>
      <Link to={props.link || "#"} onClick={handleTriggerExtended}>
        <div onClick={props.onClick} className={styles.sideMenuOptionContainer}>
          <props.Icon className={styles.optionIcon} />
          <span className={styles.optionTitle}>{props.title}</span>
          {props.subOptions && props.subOptions.length > 0 && (
            <React.Fragment>
              {extended && (
                <BsArrowUpShort className={styles.triggerSubOptionsButton} />
              )}
              {!extended && (
                <BsArrowDownShort className={styles.triggerSubOptionsButton} />
              )}
            </React.Fragment>
          )}
        </div>
      </Link>

      {props.subOptions && props.subOptions.length > 0 && extended && (
        <div className={styles.subOptionsContainer}>
          {props.subOptions.map((subOption, index) => {
            return (
              <Link key={index} to={subOption.link}>
                <div key={index} className={styles.subOption}>
                  <subOption.Icon className={styles.subOptionIcon} />
                  <span className={styles.optionTitle}>{subOption.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default SideMenuOption;
