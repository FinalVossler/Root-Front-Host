import React from "react";
import { ITheme } from "roottypes";

import { useAppSelector } from "../../../../store/hooks";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import useStyles from "./viewTabs.styles";

export enum ViewTypeEnum {
  Table = "Table",
  Board = "Board",
  StatusTracking = "StatusTracking",
}

interface IViewTypesProps {
  viewType: ViewTypeEnum;
  onViewTabChange?: (viewType: ViewTypeEnum) => void;
}

const Elements: React.FunctionComponent<IViewTypesProps> = (
  props: IViewTypesProps
) => {
  const theme: ITheme = useAppSelector(
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
          props.viewType === ViewTypeEnum.StatusTracking
            ? styles.selectedViewTab
            : styles.viewTab
        }
        onClick={() => handleViewTypeChange(ViewTypeEnum.StatusTracking)}
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
