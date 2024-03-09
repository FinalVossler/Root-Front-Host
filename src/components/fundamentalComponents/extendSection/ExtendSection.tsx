import React from "react";

import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./extendSection.styles";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

export enum ExtendSectionSizeEnum {
  Small = "Small",
  Average = "Average",
}

interface IExtendSectionProps {
  onClick: () => void;
  title: string;
  isSectionShown: boolean;
  dataCy?: string;
  size?: ExtendSectionSizeEnum;
}

const ExtendSection: React.FunctionComponent<IExtendSectionProps> = (
  props: IExtendSectionProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <span
      onClick={() => props.onClick()}
      className={
        props.size === ExtendSectionSizeEnum.Small
          ? styles.sectionSmall
          : styles.sectionTitle
      }
      {...(props.dataCy ? { ["data-cy"]: props.dataCy } : {})}
    >
      {props.title}
      {!props.isSectionShown && (
        <MdArrowDownward className={styles.arrowIcon} />
      )}
      {props.isSectionShown && <MdArrowUpward className={styles.arrowIcon} />}
    </span>
  );
};

export default ExtendSection;
