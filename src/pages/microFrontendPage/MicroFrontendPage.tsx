import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Theme } from "../../config/theme";
import withProtection from "../../hoc/protection";
import { useAppSelector } from "../../store/hooks";
import withWrapper from "../../hoc/wrapper";
import withChatHoc from "../../hoc/withChat";
import Loading from "react-loading";

import useStyles from "./microFrontendPage.styles";
import { IEntity } from "../../store/slices/entitySlice";
import { IMicroFrontend } from "../../store/slices/microFrontendSlice";
import useGetMicroFrontend from "../../hooks/apiHooks/useGetMicroFrontend";
import { useParams } from "react-router-dom";
import useGetEntity from "../../hooks/apiHooks/useGetEntity";
import ModuleLoader from "../../moduleLoader/ModuleLoader";

interface IMicroFrontendPage {}

const MicroFrontendPage: React.FunctionComponent<IMicroFrontendPage> = (
  props: IMicroFrontendPage
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );

  //#region local state
  const [microFrontend, setMicroFrontend] =
    React.useState<IMicroFrontend | null>(null);
  const [entity, setEntity] = React.useState<IEntity | null>(null);

  //#endregion local state

  //#region hooks
  const styles = useStyles({ theme });
  const { microFrontendId, entityId, componentName } = useParams<{
    microFrontendId: string;
    entityId?: string;
    componentName: string;
  }>();
  const { getMicroFrontend, loading: getMicroFrontendLoading } =
    useGetMicroFrontend();
  const { getEntity, loading: getEntityLoading } = useGetEntity();
  //#region hooks

  //#region effects
  React.useEffect(() => {
    if (microFrontendId) {
      getMicroFrontend(microFrontendId).then(setMicroFrontend);
    }
    if (entityId) {
      getEntity(entityId).then(setEntity);
    }
  }, [microFrontendId]);
  //#endregion effects

  return (
    <div className={styles.microFrontendPageContainer}>
      {getEntityLoading ||
        (getMicroFrontendLoading && <Loading className={styles.loading} />)}

      {microFrontend && (
        <ErrorBoundary fallback={<div>Loading</div>}>
          <React.Suspense fallback={"Loading . . . "}>
            <ModuleLoader
              url={microFrontend.remoteEntry}
              scope={microFrontend.name}
              module={"./" + componentName}
              entityFieldValues={entity?.entityFieldValues}
              language={language}
            />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default withWrapper(
  withProtection(withChatHoc(React.memo(MicroFrontendPage))),
  {
    withFooter: false,
    withSideMenu: true,
  }
);
