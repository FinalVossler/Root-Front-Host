import React from "react";
import { useParams } from "react-router-dom";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import EntitiesList from "./entitiesList";

import useStyles from "./entitiesPage.styles";
import { ITheme } from "roottypes";

interface IEntitiesPageProps {}

const EntitiesPage: React.FunctionComponent<IEntitiesPageProps> = (
  props: IEntitiesPageProps
) => {
  const { modelId } = useParams();

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();

  if (!isLoggedIn) return null;

  if (!modelId) {
    return null;
  }

  return (
    <div className={styles.entitiesPageContainer} data-cy="entitiesPage">
      <EntitiesList modelId={modelId} />
    </div>
  );
};

export default React.memo(EntitiesPage);
