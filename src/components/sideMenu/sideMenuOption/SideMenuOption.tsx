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
  extended?: boolean;
  triggerExtended?: () => void;
}

const SideMenuOption: React.FunctionComponent<ISideMenuOption> = (
  props: ISideMenuOption
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <React.Fragment>
      <Link
        to={
          props.subOptions && props.subOptions.length > 0
            ? "#"
            : props.link || "#"
        }
        onClick={props.triggerExtended}
      >
        <div onClick={props.onClick} className={styles.sideMenuOptionContainer}>
          <props.Icon className={styles.optionIcon} />
          <span className={styles.optionTitle}>{props.title}</span>
          {props.subOptions && props.subOptions.length > 0 && (
            <React.Fragment>
              {props.extended && (
                <BsArrowUpShort className={styles.triggerSubOptionsButton} />
              )}
              {!props.extended && (
                <BsArrowDownShort className={styles.triggerSubOptionsButton} />
              )}
            </React.Fragment>
          )}
        </div>
      </Link>

      {props.subOptions && props.subOptions?.length > 0 && props.extended && (
        <SubOption
          subOption={{
            Icon: props.Icon,
            link: props.link || "",
            title: props.title,
          }}
        />
      )}

      {props.subOptions && props.subOptions.length > 0 && props.extended && (
        <div className={styles.subOptionsContainer}>
          {props.subOptions.map((subOption, index) => {
            return <SubOption subOption={subOption} key={index} />;
          })}
        </div>
      )}
    </React.Fragment>
  );
};

const SubOption = (props: { subOption: SubOption }) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <Link to={props.subOption.link}>
      <div className={styles.subOption}>
        <props.subOption.Icon className={styles.subOptionIcon} />
        <span className={styles.optionTitle}>{props.subOption.title}</span>
      </div>
    </Link>
  );
};

export default SideMenuOption;
