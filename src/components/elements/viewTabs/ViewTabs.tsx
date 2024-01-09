import React from "react";

import useStyles from "./viewTabs.styles";
import { Theme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

export enum ViewTypeEnum {
  Table = "Table",
  Board = "Board",
  BoardForStatusTracking = "BoardForStatusTracking",
}

interface IViewTypes {
  viewType: ViewTypeEnum;
  onViewTabChange?: (viewType: ViewTypeEnum) => void;
}

const Elements: React.FunctionComponent<IViewTypes> = (props: IViewTypes) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.elements
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleViewTypeChange = (viewType: ViewTypeEnum) => {
    if (props.onViewTabChange) props.onViewTabChange(viewType);
  };
  //#endregion Event listeners

  return (
    <div className={styles.viewTabsContainer}>
      <span
        className={
          props.viewType === ViewTypeEnum.BoardForStatusTracking
            ? styles.selectedViewTab
            : styles.viewTab
        }
        onClick={() =>
          handleViewTypeChange(ViewTypeEnum.BoardForStatusTracking)
        }
      >
        {getTranslatedText(staticText?.statusTracking)}
      </span>

      <span
        className={
          props.viewType === ViewTypeEnum.Board
            ? styles.selectedViewTab
            : styles.viewTab
        }
        onClick={() => handleViewTypeChange(ViewTypeEnum.Board)}
      >
        {getTranslatedText(staticText?.board)}
      </span>

      <span
        className={
          props.viewType === ViewTypeEnum.Table
            ? styles.selectedViewTab
            : styles.viewTab
        }
        onClick={() => handleViewTypeChange(ViewTypeEnum.Table)}
        data-cy="elementsTableViewButton"
      >
        {getTranslatedText(staticText?.table)}
      </span>
    </div>
  );
};

export default Elements;
