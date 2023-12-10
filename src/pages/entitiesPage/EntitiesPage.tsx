import React from "react";
import { useParams } from "react-router-dom";

import { Theme } from "../../config/theme";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import EntitiesList from "./entitiesList";

import useStyles from "./entitiesPage.styles";

interface IEntitiesPage {}

const EntitiesPage: React.FunctionComponent<IEntitiesPage> = (
  props: IEntitiesPage
) => {
  const { modelId } = useParams();

  const theme: Theme = useAppSelector(
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
