import React from "react";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";

import EntityEditor from "../../../components/editors/entityEditor";
import Elements from "../../../components/elements";
import { Column } from "../../../components/elements/Elements";
import { Theme } from "../../../config/theme";
import PaginationCommand from "../../../globalTypes/PaginationCommand";
import PaginationResponse from "../../../globalTypes/PaginationResponse";
import withChat from "../../../hoc/withChat";
import withWrapper from "../../../hoc/wrapper";
import useDeleteEntities from "../../../hooks/apiHooks/useDeleteEntities";
import useGetEntitiesByModel from "../../../hooks/apiHooks/useGetEntitiesByModel";
import useGetModels from "../../../hooks/apiHooks/useGetModels";
import useSearchEntities from "../../../hooks/apiHooks/useSearchEntities";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import useHasPermission from "../../../hooks/useHasPermission";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  entitySlice,
  getEntityName,
  IEntity,
  IEntityFieldValue,
} from "../../../store/slices/entitySlice";
import { FieldType } from "../../../store/slices/fieldSlice";
import { IModel } from "../../../store/slices/modelSlice";
import { StaticPermission } from "../../../store/slices/roleSlice";

import useStyles from "./entitiesList.styles";

interface IEntitiesList {
  modelId: string;
}

const EntitiesList: React.FunctionComponent<IEntitiesList> = (
  props: IEntitiesList
) => {
  const theme: Theme = useAppSelector(
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
  const model: IModel | undefined = useAppSelector((state) =>
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
        limit: 100,
        page,
      },
    });
  }, [props.modelId]);

  React.useEffect(() => {
    getModels({
      paginationCommand: {
        limit,
        page: 1,
      },
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSetSearchResult = React.useCallback(
    (res: PaginationResponse<IEntity>) => {
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
        label: getTranslatedText(modelField.field.name),
        name: "",
        render: (entity: IEntity) => {
          const entityFieldValue: IEntityFieldValue | undefined =
            entity.entityFieldValues.find(
              (entityField) => entityField.field._id === modelField.field._id
            );

          if (
            entityFieldValue &&
            entityFieldValue?.field.type !== FieldType.File
          ) {
            return <div>{getTranslatedText(entityFieldValue?.value)}</div>;
          }
          if (
            entityFieldValue &&
            entityFieldValue.field.type === FieldType.File
          ) {
            return (
              <div>{entityFieldValue.files.map((f) => f.name).join(", ")}</div>
            );
          }

          return <div></div>;
        },
      };
    }) || [];

  // Additional columns
  columns.push({
    label: getTranslatedText(staticText?.visit),
    name: "",
    render: (entity: IEntity) => {
      return (
        <Link
          target="_blank"
          to={"/entities/" + props.modelId + "/" + entity._id}
        >
          <FaDirections />
        </Link>
      );
    },
  });

  return (
    <Elements
      Editor={({ element, ...props }) => (
        <EntityEditor {...props} entity={element as IEntity} />
      )}
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
      searchPromise={(name: string, paginationCommand: PaginationCommand) =>
        handleSearchEntitiesPromise(
          name,
          paginationCommand,
          props.modelId || ""
        )
      }
      canCreate={hasEntityPermission(
        StaticPermission.Create,
        props.modelId || ""
      )}
      canUpdate={hasEntityPermission(
        StaticPermission.Update,
        props.modelId || ""
      )}
      canDelete={hasEntityPermission(
        StaticPermission.Delete,
        props.modelId || ""
      )}
      searchResult={searchResult || { data: [], total: 0 }}
      setSearchResult={handleSetSearchResult}
      isForEntities={true}
      modelId={props.modelId}
    />
  );
};

export default EntitiesList;
