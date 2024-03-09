import React from "react";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";

import Elements from "../../../components/appComponents/elements";
import { Column } from "../../../components/appComponents/elements/Elements";
import useDeleteEntities from "../../../hooks/apiHooks/useDeleteEntities";
import useGetEntitiesByModel from "../../../hooks/apiHooks/useGetEntitiesByModel";
import useGetModels from "../../../hooks/apiHooks/useGetModels";
import useSearchEntities from "../../../hooks/apiHooks/useSearchEntities";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useHasPermission from "../../../hooks/useHasPermission";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { entitySlice, getEntityName } from "../../../store/slices/entitySlice";
import { IModelField } from "../../../store/slices/modelSlice";

import useStyles from "./entitiesList.styles";
import {
  FieldTypeEnum,
  IEntityFieldValueReadDto,
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  IPaginationCommand,
  IPaginationResponse,
  ITheme,
  StaticPermissionEnum,
} from "roottypes";
import { EditorTypeEnum, editorSlice } from "../../../store/slices/editorSlice";

interface IEntitiesListProps {
  modelId: string;
}

const EntitiesList: React.FunctionComponent<IEntitiesListProps> = (
  props: IEntitiesListProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const entitiesByModel = useAppSelector(
    (state) => state.entity.entitiesByModel
  );
  const entities = entitiesByModel?.find(
    (el) => el.modelId === props.modelId
  )?.entities;

  const total: number =
    useAppSelector((state) =>
      state.entity.entitiesByModel.find((el) => el.modelId === props.modelId)
    )?.total || 0;
  const model: IModelReadDto | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );
  const searchResult = useAppSelector((state) =>
    state.entity.entitiesByModel.find((el) => el.modelId === props.modelId)
  )?.searchResult;

  const [limit, setLimit] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { getEntitiesByModel, loading } = useGetEntitiesByModel();
  const { getModels } = useGetModels();
  const isLoggedIn: boolean = useIsLoggedIn();
  const { deleteEntities, loading: deleteLoading } = useDeleteEntities(
    props.modelId || ""
  );
  const { handleSearchEntitiesPromise } = useSearchEntities();
  const { hasEntityPermission } = useHasPermission();

  React.useEffect(() => {
    getEntitiesByModel({
      modelId: props.modelId || "",
      paginationCommand: {
        limit,
        page,
      },
    });
  }, [props.modelId, page]);

  React.useEffect(() => {
    getModels({
      paginationCommand: {
        limit: 99999,
        page: 1,
      },
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: IPaginationResponse<IEntityReadDto>) => {
      dispatch(
        entitySlice.actions.setSearchedEntities({
          modelId: props.modelId || "",
          searchResult: res,
        })
      );
    },
    []
  );

  if (!isLoggedIn) return null;

  // Computing fields columns
  const columns: Column[] =
    model?.modelFields.map((modelField) => {
      return {
        label: getTranslatedText((modelField.field as IFieldReadDto).name),
        name: (modelField.field as IFieldReadDto)._id,
        render: (entity: IEntityReadDto) => (
          <EntityFieldValueComponent entity={entity} modelField={modelField} />
        ),
        defaultHide: !Boolean(modelField.mainField),
        stick: Boolean(modelField.stickInTable),
      };
    }) || [];

  // Additional columns
  columns.push({
    label: getTranslatedText(staticText?.visit),
    name: "",
    render: (entity: IEntityReadDto) => {
      return (
        <Link
          target="_blank"
          rel="noreferrer"
          to={"/entities/" + props.modelId + "/" + entity._id}
        >
          <FaDirections />
        </Link>
      );
    },
  });

  return (
    <Elements
      handleOpenEditor={(element) =>
        dispatch(
          editorSlice.actions.addEditor({
            element,
            editorType: EditorTypeEnum.Entity,
            modelId: props.modelId,
          })
        )
      }
      columns={columns}
      elements={entities || []}
      total={total || 0}
      limit={limit}
      page={page}
      loading={loading}
      deletePromise={deleteEntities}
      deleteLoading={deleteLoading}
      getElementName={(entity: any) => {
        return getEntityName({ entity, getTranslatedText });
      }}
      onPageChange={handlePageChange}
      searchPromise={(name: string, paginationCommand: IPaginationCommand) =>
        handleSearchEntitiesPromise(
          name,
          paginationCommand,
          props.modelId || ""
        )
      }
      canCreate={hasEntityPermission(
        StaticPermissionEnum.Create,
        props.modelId || ""
      )}
      canUpdate={hasEntityPermission(
        StaticPermissionEnum.Update,
        props.modelId || ""
      )}
      canDelete={hasEntityPermission(
        StaticPermissionEnum.Delete,
        props.modelId || ""
      )}
      searchResult={searchResult || { data: [], total: 0 }}
      setSearchResult={handleSetSearchResult}
      isForEntities={true}
      modelId={props.modelId}
      elementsLocalStorageConfName={props.modelId}
      tableDataCy="entitiesTable"
    />
  );
};

interface IEntityFieldValueComponent {
  modelField: IModelField;
  entity: IEntityReadDto;
}

export const EntityFieldValueComponent: React.FunctionComponent<
  IEntityFieldValueComponent
> = (props: IEntityFieldValueComponent) => {
  const getTranslatedText = useGetTranslatedText();

  const entityFieldValue: IEntityFieldValueReadDto | undefined =
    props.entity.entityFieldValues.find(
      (entityField) =>
        (entityField.field as IFieldReadDto)._id.toString() ===
        (props.modelField.field as IFieldReadDto)._id.toString()
    );

  if (
    entityFieldValue &&
    (entityFieldValue?.field as IFieldReadDto | undefined)?.type !==
      FieldTypeEnum.File
  ) {
    return <div>{getTranslatedText(entityFieldValue?.value)}</div>;
  }
  if (
    entityFieldValue &&
    (entityFieldValue.field as IFieldReadDto).type === FieldTypeEnum.File
  ) {
    return (
      <div>
        {(entityFieldValue.files as IFileReadDto[])
          .map((f) => f.name)
          .join(", ")}
      </div>
    );
  }

  return <div></div>;
};

export default EntitiesList;
