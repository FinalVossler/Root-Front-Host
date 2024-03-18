import React from "react";
import Loading from "react-loading";
import moment from "moment";
import {
  IEntitiesGetCommand,
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  IRoleReadDto,
  ITheme,
  IUserReadDto,
} from "roottypes";

import Pagination from "../../../components/fundamentalComponents/pagination";
import { useAppSelector } from "../../../store/hooks";
import useGetAssignedEntitiesByModel from "../../../hooks/apiHooks/useGetAssignedEntitiesByModel";

import useStyles from "./tasksByModel.styles";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { EntityFieldValueComponent } from "../../entitiesPage/entitiesList/EntitiesList";
import UserProfilePicture from "../../../components/fundamentalComponents/userProfilePicture";
import { SizeEnum } from "../../../components/fundamentalComponents/userProfilePicture/UserProfilePicture";
import ElementsBoard from "../../../components/appComponents/elements/elementsBoard";
import ViewTabs from "../../../components/fundamentalComponents/viewTabs";
import { EntitiesViewTabTypeEnum } from "../../../components/appComponents/elements/Elements";
import { IViewTabType } from "../../../components/fundamentalComponents/viewTabs/ViewTabs";

const LIMIT = 99;

interface ITasksByModelProps {
  modelId: string;
}

const TasksByModel: React.FunctionComponent<ITasksByModelProps> = (
  props: ITasksByModelProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const assignedEntitiesByModel = useAppSelector(
    (state) => state.entity.assignedEntitiesByModel
  ).find((el) => el.modelId.toString() === props.modelId.toString());
  const total = useAppSelector(
    (state) => state.entity.assignedEntitiesByModel
  ).find((el) => el.modelId.toString() === props.modelId.toString())?.total;
  const model: IModelReadDto | undefined = useAppSelector(
    (state) => state.model.models
  ).find((model) => model._id.toString() === props.modelId);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const elementsStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.elements
  );

  const getTranslatedText = useGetTranslatedText();

  const entitiesViewTabTypes: IViewTabType[] = [
    {
      name: EntitiesViewTabTypeEnum.StatusTracking,
      title: getTranslatedText(elementsStaticText?.statusTracking),
    },
    {
      name: EntitiesViewTabTypeEnum.Board,
      title: getTranslatedText(elementsStaticText?.board),
    },
    {
      name: EntitiesViewTabTypeEnum.Table,
      title: getTranslatedText(elementsStaticText?.table),
    },
  ];

  const [page, setPage] = React.useState(1);
  const [viewType, setViewType] = React.useState<IViewTabType>(
    entitiesViewTabTypes.find(
      (el) => el.name === EntitiesViewTabTypeEnum.StatusTracking
    ) as IViewTabType
  );

  const styles = useStyles({ theme });
  const { getAssignedEntitiesByModel, loading } =
    useGetAssignedEntitiesByModel();

  //#region use effects
  React.useEffect(() => {
    const command: IEntitiesGetCommand = {
      modelId: props.modelId,
      paginationCommand: {
        limit: LIMIT,
        page: 1,
      },
    };

    getAssignedEntitiesByModel(command);
  }, []);

  //#endregion use effects

  const handlePageChange = (page: number) => {
    const command: IEntitiesGetCommand = {
      modelId: props.modelId,
      paginationCommand: {
        limit: 999,
        page,
      },
    };

    getAssignedEntitiesByModel(command);
  };

  const handleViewTypeChange = (viewType: IViewTabType) =>
    setViewType(viewType);

  if (!model) return null;

  return (
    <React.Fragment>
      <ViewTabs
        theme={theme}
        selectedViewTabType={viewType}
        onViewTabChange={handleViewTypeChange}
        viewTabTypes={entitiesViewTabTypes}
      />

      <div className={styles.tasksByModelContainer}>
        {(viewType.name === EntitiesViewTabTypeEnum.StatusTracking ||
          viewType.name === EntitiesViewTabTypeEnum.Board) && (
          <ElementsBoard
            modelId={props.modelId?.toString() || ""}
            entities={assignedEntitiesByModel?.entities || []}
            loading={loading}
          />
        )}
        {viewType.name === EntitiesViewTabTypeEnum.Table && (
          <table className={styles.tasksByModelTable}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>
                <td className={styles.tableHeaderColumn}>
                  {getTranslatedText(staticText?.assignedTo)}
                </td>
                {model.modelFields
                  .filter((modelField) => modelField.mainField)
                  .map((modelField, modelFieldIndex: number) => {
                    return (
                      <td
                        className={styles.tableHeaderColumn}
                        key={modelFieldIndex}
                      >
                        {getTranslatedText(
                          (modelField.field as IFieldReadDto).name
                        )}
                      </td>
                    );
                  })}
                <td className={styles.tableHeaderColumn}>
                  {getTranslatedText(staticText?.createdAt)}
                </td>
                <td className={styles.tableHeaderColumn}>
                  {getTranslatedText(staticText?.taskType)}
                </td>
              </tr>
            </thead>

            <tbody>
              {assignedEntitiesByModel?.entities.map(
                (entity: IEntityReadDto, entityIndex: number) => {
                  if (
                    entity &&
                    entity.assignedUsers &&
                    entity.assignedUsers?.length > 0
                  ) {
                    return (
                      <React.Fragment key={entityIndex}>
                        {(entity.assignedUsers as IUserReadDto[]).map(
                          (user: IUserReadDto, userIndex: number) => {
                            return (
                              <tr className={styles.tableRow} key={userIndex}>
                                <td className={styles.tableColumn}>
                                  <div className={styles.subColumnContainer}>
                                    <UserProfilePicture
                                      theme={theme}
                                      size={SizeEnum.Small}
                                      url={
                                        (user.profilePicture as IFileReadDto)
                                          ?.url
                                      }
                                    />{" "}
                                    <span
                                      className={
                                        styles.userFirstNameAndLastName
                                      }
                                    >
                                      {user.firstName} {user.lastName}
                                    </span>
                                  </div>
                                </td>
                                {model.modelFields
                                  ?.filter((modelField) => modelField.mainField)
                                  .map(
                                    (modelField, modelFieldIndex: number) => {
                                      return (
                                        <td
                                          className={styles.tableColumn}
                                          key={modelFieldIndex}
                                        >
                                          <EntityFieldValueComponent
                                            entity={entity}
                                            modelField={modelField}
                                          />
                                        </td>
                                      );
                                    }
                                  )}
                                <td className={styles.tableColumn}>
                                  {moment(entity.createdAt).format(
                                    "YYYY/MM/DD"
                                  )}
                                </td>
                                <td className={styles.tableColumn}>
                                  {getTranslatedText(
                                    (user.role as IRoleReadDto)?.name
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                }
              )}
            </tbody>
          </table>
        )}

        {viewType.name === EntitiesViewTabTypeEnum.Table && loading && (
          <Loading color={theme.primary} />
        )}

        <Pagination
          theme={theme}
          total={total || 0}
          onPageChange={handlePageChange}
          limit={LIMIT}
          page={page}
        />
      </div>
    </React.Fragment>
  );
};

export default React.memo(TasksByModel);
