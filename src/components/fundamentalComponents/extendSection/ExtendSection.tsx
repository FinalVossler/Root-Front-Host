import React from "react";
import { ITheme } from "roottypes";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

import useStyles from "./extendSection.styles";

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
  theme: ITheme;
}

const ExtendSection: React.FunctionComponent<IExtendSectionProps> = (
  props: IExtendSectionProps
) => {
  const styles = useStyles({ theme: props.theme });

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
