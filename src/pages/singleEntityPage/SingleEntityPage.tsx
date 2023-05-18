import React from "react";
import { useParams } from "react-router-dom";

import { Theme } from "../../config/theme";
import withChat from "../../hoc/withChat";
import withWrapper from "../../hoc/wrapper";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./singleEntityPage.styles";

interface ISingleEntityPage {}

const SingleEntityPage: React.FunctionComponent<ISingleEntityPage> = (
  props: ISingleEntityPage
) => {
  const { modelId, entityId } = useParams();

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();

  if (!isLoggedIn) return null;

  return (
    <div className={styles.singleEntityPageContainer}>Single Entity Page</div>
  );
};

export default withWrapper(withChat(React.memo(SingleEntityPage)), {
  withFooter: false,
  withSideMenu: true,
});
