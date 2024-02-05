import React from "react";

import Loading from "react-loading";
import Pagination from "../../../components/pagination";
import { ITheme } from "../../../config/theme";
import { useAppSelector } from "../../../store/hooks";
import useGetAssignedEntitiesByModel from "../../../hooks/apiHooks/useGetAssignedEntitiesByModel";

import useStyles from "./tasksByModel.styles";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { EntityFieldValueComponent } from "../../entitiesPage/entitiesList/EntitiesList";
import moment from "moment";
import UserProfilePicture from "../../../components/userProfilePicture";
import { SizeEnum } from "../../../components/userProfilePicture/UserProfilePicture";
import ElementsBoard from "../../../components/elements/elementsBoard";
import ViewTabs from "../../../components/elements/viewTabs";
import {
  IEntitiesGetCommand,
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
} from "roottypes";
import { ViewTypeEnum } from "../../../components/elements/viewTabs/ViewTabs";

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

  const [page, setPage] = React.useState(1);
  const [roles, setRoles] = React.useState<IRoleReadDto[]>([]);
  const [viewType, setViewType] = React.useState<ViewTypeEnum>(
    ViewTypeEnum.StatusTracking
  );

  const styles = useStyles({ theme });
  const { getAssignedEntitiesByModel, loading } =
    useGetAssignedEntitiesByModel();
  const getTranslatedText = useGetTranslatedText();

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

  React.useEffect(() => {
    const newRoles: IRoleReadDto[] = [];
    assignedEntitiesByModel?.entities.forEach((entity) => {
      (entity.assignedUsers as IUserReadDto[])?.forEach((user) => {
        if (
          newRoles.some(
            (role) =>
              (user.role as IRoleReadDto)?._id.toString() ===
              role._id.toString()
          ) &&
          user.role
        ) {
          newRoles.push(user.role as IRoleReadDto);
        }
      });
    });

    setRoles(newRoles);
  }, [assignedEntitiesByModel]);
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

  const handleViewTypeChange = (viewType: ViewTypeEnum) =>
    setViewType(viewType);

  if (!model) return null;

  return (
    <React.Fragment>
      <ViewTabs onViewTabChange={handleViewTypeChange} viewType={viewType} />

      <div className={styles.tasksByModelContainer}>
        {(viewType === ViewTypeEnum.StatusTracking ||
          viewType === ViewTypeEnum.Board) && (
          <ElementsBoard
            modelId={props.modelId?.toString() || ""}
            entities={assignedEntitiesByModel?.entities || []}
            loading={loading}
          />
        )}
        {viewType === ViewTypeEnum.Table && (
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

        {viewType === ViewTypeEnum.Table && loading && (
          <Loading color={theme.primary} />
        )}

        <Pagination
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
