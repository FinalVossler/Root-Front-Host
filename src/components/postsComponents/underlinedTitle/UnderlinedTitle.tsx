import React from "react";

import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";

import useStyles from "./underlinedTitle.styles";

interface IUnderlinedTitle {
  title: string;
}
const UnderlinedTitle: React.FunctionComponent<IUnderlinedTitle> = (
  props: IUnderlinedTitle
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const styles = useStyles({ theme });

  return (
    <div className={styles.underlinedTitleContainer}>
      <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
};

export default React.memo(UnderlinedTitle);