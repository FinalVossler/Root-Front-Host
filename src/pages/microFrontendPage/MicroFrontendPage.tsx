import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "react-loading";

import { ITheme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./microFrontendPage.styles";
import useGetMicroFrontend from "../../hooks/apiHooks/useGetMicroFrontend";
import { useNavigate, useParams } from "react-router-dom";
import useGetEntity from "../../hooks/apiHooks/useGetEntity";
import ModuleLoader from "../../moduleLoader/ModuleLoader";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import Button from "../../components/fundamentalComponents/button";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import {
  IEntityReadDto,
  IMicroFrontendReadDto,
  IModelReadDto,
} from "roottypes";

interface IMicroFrontendPageProps {}

const MicroFrontendPage: React.FunctionComponent<IMicroFrontendPageProps> = (
  props: IMicroFrontendPageProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.microFrontends
  );

  //#region local state
  const [microFrontend, setMicroFrontend] =
    React.useState<IMicroFrontendReadDto | null>(null);
  const [entity, setEntity] = React.useState<IEntityReadDto | null>(null);
  const navigate = useNavigate();

  //#endregion local state

  //#region hooks
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { microFrontendId, entityId, componentName, buttonFieldId } =
    useParams<{
      microFrontendId: string;
      entityId?: string;
      componentName: string;
      buttonFieldId: string;
    }>();
  const { getMicroFrontend, loading: getMicroFrontendLoading } =
    useGetMicroFrontend();
  const { getEntity, loading: getEntityLoading } = useGetEntity();
  const authorizedAxios = useAuthorizedAxios();
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
  const handleCancel = () => {
    navigate(
      "/entities/" + (entity?.model as IModelReadDto)._id + "/" + entity?._id
    );
  };
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
              entity={entity}
              language={language}
              theme={theme}
              authorizedAxios={authorizedAxios}
              buttonFieldId={buttonFieldId}
              onCancel={handleCancel}
              cancelText={getTranslatedText(staticText?.back)}
            />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default React.memo(MicroFrontendPage);
