import React, { ReactText } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

import { ITheme } from "../../../../../config/theme";
import { useAppSelector } from "../../../../../store/hooks";

import useStyles from "./sideMenuOption.styles";
import { BiPlus } from "react-icons/bi";
import doNothing from "../../../../../utils/doNothing";

type SubOption = {
  title: string;
  link: string;
  Icon: any;
  handleOpenEditor?: () => void;
  dataCy?: string;
};

interface ISideMenuOptionProps {
  title: string;
  Icon: any;
  onClick?: () => void;
  subOptions?: SubOption[];
  link?: string;
  extended?: boolean;
  triggerExtended?: () => void;
  dataCy?: string;
}

const SideMenuOption: React.FunctionComponent<ISideMenuOptionProps> = (
  props: ISideMenuOptionProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const location = useLocation();

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
        <div
          onClick={props.onClick}
          className={
            props.link === location.pathname
              ? styles.selectedSideMenuOption
              : styles.sideMenuOptionContainer
          }
          {...(props.dataCy ? { ["data-cy"]: props.dataCy } : {})}
        >
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

const SubOption = React.memo((props: { subOption: SubOption }) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const location = useLocation();

  return (
    <React.Fragment>
      <Link
        to={props.subOption.link}
        {...(props.subOption.dataCy
          ? { ["data-cy"]: props.subOption.dataCy }
          : {})}
      >
        <div
          className={
            location.pathname === props.subOption.link
              ? styles.selectedSubOption
              : styles.subOption
          }
        >
          <div className={styles.subOptionLeft}>
            <props.subOption.Icon className={styles.subOptionIcon} />
            <span className={styles.subOptionTitle}>
              {props.subOption.title}
            </span>
          </div>

          <div className={styles.subOptionRight}>
            {props.subOption.handleOpenEditor && (
              <BiPlus
                onClick={() =>
                  props.subOption.handleOpenEditor
                    ? props.subOption.handleOpenEditor()
                    : doNothing()
                }
                className={styles.addButton}
              />
            )}
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
});

export default React.memo(SideMenuOption);
