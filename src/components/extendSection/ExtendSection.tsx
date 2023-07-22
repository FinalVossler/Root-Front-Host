import React from "react";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./extendSection.styles";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface IExtendSection {
  onClick: () => void;
  title: string;
  isSectionShown: boolean;
}

const Button: React.FunctionComponent<IExtendSection> = (
  props: IExtendSection
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  return (
    <span onClick={() => props.onClick()} className={styles.sectionTitle}>
      {props.title}
      {!props.isSectionShown && (
        <MdArrowDownward className={styles.arrowIcon} />
      )}
      {props.isSectionShown && <MdArrowUpward className={styles.arrowIcon} />}
    </span>
  );
};

export default Button;
