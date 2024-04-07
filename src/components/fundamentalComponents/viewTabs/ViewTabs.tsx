import React from "react";
import { ITheme } from "roottypes";

import useStyles from "./viewTabs.styles";
import doNothing from "../../../utils/doNothing";

export interface IViewTabType {
  title: string;
  name: string;
  dataCy?: string;
}

interface IViewTypesProps {
  viewTabTypes: IViewTabType[];
  selectedViewTabType: IViewTabType;
  onViewTabChange?: (viewType: IViewTabType) => void;
  theme: ITheme;
}

const Elements: React.FunctionComponent<IViewTypesProps> = (
  props: IViewTypesProps
) => {
  const styles = useStyles({ theme: props.theme });

  //#region Event listeners
  const handleViewTypeChange = (viewType: IViewTabType) => () => {
    if (props.onViewTabChange) props.onViewTabChange(viewType);
  };
  //#endregion Event listeners

  return (
    <div className={styles.viewTabsContainer}>
      {props.viewTabTypes.map((viewTabType) => {
        return (
          <span
            key={viewTabType.name}
            className={
              props.selectedViewTabType.name === viewTabType.name.toString()
                ? styles.selectedViewTab
                : styles.viewTab
            }
            onClick={handleViewTypeChange(viewTabType)}
            {...(viewTabType.dataCy ? { ["data-cy"]: viewTabType.dataCy } : {})}
          >
            {viewTabType.title}
          </span>
        );
      })}
    </div>
  );
};

export default Elements;
