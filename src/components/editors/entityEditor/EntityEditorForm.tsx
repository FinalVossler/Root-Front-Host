import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { MdDelete, MdTextFields } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import { IEntity, IEntityFieldValue } from "../../../store/slices/entitySlice";
import useUpdateEntity, {
  EntityUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateEntity";
import useCreateEntity, {
  EntityCreateCommand,
} from "../../../hooks/apiHooks/useCreateEntity";
import { IModel, IModelField } from "../../../store/slices/modelSlice";
import { FieldType } from "../../../store/slices/fieldSlice";
import Input from "../../input";
import Textarea from "../../textarea";
import IFile from "../../../globalTypes/IFile";
import EntityFieldFiles from "./entityFieldFiles";
import uploadFiles from "../../../utils/uploadFiles";
import { Option } from "../../inputSelect/InputSelect";
import { IUser, SuperRole } from "../../../store/slices/userSlice";
import {
  IEntityPermission,
  IRole,
  StaticPermission,
} from "../../../store/slices/roleSlice";
import useAxios from "../../../hooks/useAxios";
import {
  EventTriggerEnum,
  EventTypeEnum,
  IEvent,
} from "../../../globalTypes/IEvent";
import areEntityFieldConditionsMet from "../../../utils/areEntityFieldConditionsMet";

import useStyles from "./entityEditor.styles";
import sendEventApiCall from "../../../utils/sendEventApiCall";
import useGetRoles, {
  RolesGetCommand,
} from "../../../hooks/apiHooks/useGetRoles";
import SearchInput from "../../searchInput";
import useSearchUsersByRole from "../../../hooks/apiHooks/useSearchUsersByRole";
import UserProfilePicture, {
  SizeEnum,
} from "../../userProfilePicture/UserProfilePicture";

export interface IEntityFieldValueForm {
  fieldId: string;
  value: string;
  selectedExistingFiles?: IFile[];
  newFiles?: File[];

  // The combined result of selectedExistingFiles and newFiels after uploading the newFiles
  files?: IFile[];
}

export interface IEntityEditorFormForm {
  modelId: string;
  entityFieldValues: IEntityFieldValueForm[];
  assignedUsers: IUser[];
  language: string;
}

export interface IEntityEditorForm {
  entity?: IEntity;
  open: boolean;
  setOpen: (boolean) => void;
  modelId?: string;
  readOnly?: boolean;
}

const EntityEditorForm = (props: IEntityEditorForm) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.entities
  );
  const model: IModel | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );
  const user: IUser = useAppSelector((state) => state.user.user);
  const roles: IRole[] = useAppSelector((state) => state.role.roles);
  const [assignedUsers, setAssignedUsers] = React.useState<IUser[]>([]);

  //#region Local state
  const [uploadFilesLoading, setUploadFilesLoading] =
    React.useState<boolean>(false);
  const [erroredRequiredFields, setErroredRequiredFields] = React.useState<
    IModelField[]
  >([]);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createEntity, loading: createLoading } = useCreateEntity();
  const { updateEntity, loading: updateLoading } = useUpdateEntity();
  const axios = useAxios();
  const navigate = useNavigate();
  const { getRoles } = useGetRoles();
  const { handleSearchUsersByRolePromise } = useSearchUsersByRole();

  const formik: FormikProps<IEntityEditorFormForm> =
    useFormik<IEntityEditorFormForm>({
      initialValues: {
        modelId: props.modelId || props.entity?.model._id || "",
        entityFieldValues: [],
        language,
        assignedUsers: [],
      },
      validationSchema: Yup.object().shape({
        entityFieldValues: Yup.mixed().test(
          "required fields",
          "",
          (entityFieldValues: IEntityFieldValueForm[]) => {
            let valid: boolean = true;
            const newErroredRequiredFields: IModelField[] = [];
            model?.modelFields.forEach((modelField: IModelField) => {
              const entityFieldValue = entityFieldValues.find(
                (e) => e.fieldId === modelField.field._id
              );
              if (modelField.required) {
                if (!entityFieldValue) {
                  valid = false;
                } else {
                  if (modelField.field.type === FieldType.File) {
                    if (
                      (!entityFieldValue.newFiles ||
                        entityFieldValue.newFiles.length === 0) &&
                      (!entityFieldValue.selectedExistingFiles ||
                        entityFieldValue.selectedExistingFiles.length === 0)
                    ) {
                      valid = false;
                    }
                  } else {
                    if (
                      entityFieldValue.value === null ||
                      entityFieldValue.value === undefined ||
                      entityFieldValue.value === ""
                    ) {
                      valid = false;
                    }
                  }
                }
                if (!valid) {
                  newErroredRequiredFields.push(modelField);
                }
              }
            });
            setErroredRequiredFields(newErroredRequiredFields);
            return valid;
          }
        ),
      }),
      onSubmit: async (values: IEntityEditorFormForm) => {
        setUploadFilesLoading(true);

        const uploadNewFilesPromises: Promise<IFile[]>[] = [];

        // preparing the files by uploading the new files and combining the new files and the selected own files into one array
        values.entityFieldValues.forEach(async (entityFieldValue) => {
          entityFieldValue.files = [
            ...(entityFieldValue.selectedExistingFiles || []),
          ];

          const promise = new Promise<IFile[]>(async (resolve, _) => {
            if (
              entityFieldValue.newFiles &&
              entityFieldValue.newFiles.length > 0
            ) {
              const newFiles: IFile[] = await uploadFiles(
                entityFieldValue.newFiles
              );
              entityFieldValue.files = (entityFieldValue.files || []).concat(
                newFiles
              );

              resolve(newFiles);
            }

            resolve([]);
          });

          uploadNewFilesPromises.push(promise);
        });

        await Promise.all(uploadNewFilesPromises);

        setUploadFilesLoading(false);

        let createdOrUpdateEntity: IEntity | null = null;

        if (props.entity) {
          const command: EntityUpdateCommand = {
            _id: props.entity._id,
            entityFieldValues: values.entityFieldValues.map((e) => ({
              fieldId: e.fieldId,
              files: e.files || [],
              value: e.value,
            })),
            assignedUsersIds: values.assignedUsers.map((u) => u._id),
            language: values.language,
            modelId: values.modelId,
          };

          createdOrUpdateEntity = await updateEntity(command);
        } else {
          const command: EntityCreateCommand = {
            entityFieldValues: values.entityFieldValues.map((e) => ({
              fieldId: e.fieldId,
              files: e.files || [],
              value: e.value,
            })),
            assignedUsersIds: values.assignedUsers.map((u) => u._id),
            language: values.language,
            modelId: values.modelId,
          };

          createdOrUpdateEntity = await createEntity(command);
        }

        props.setOpen(false);

        // Model events trigger
        model?.modelEvents?.forEach((modelEvent) => {
          switch (modelEvent.eventType) {
            case EventTypeEnum.Redirection: {
              if (modelEvent.redirectionToSelf) {
                navigate(
                  "/entities/" + model._id + "/" + createdOrUpdateEntity?._id
                );
              } else if (modelEvent.redirectionUrl) {
                window.location.href = modelEvent.redirectionUrl;
              }
              break;
            }

            case EventTypeEnum.ApiCall: {
              sendEventApiCall({
                axios,
                createdOrUpdateEntity,
                event: modelEvent,
              });
            }
          }
        });
      },
    });

  //#region Effects
  // Resetting form
  React.useEffect(() => {
    formik.resetForm({
      values: {
        entityFieldValues:
          model?.modelFields.map((modelField) => {
            const entityFieldValue: IEntityFieldValue | undefined =
              props.entity?.entityFieldValues.find(
                (entityFieldValue) =>
                  entityFieldValue.field._id === modelField.field._id
              );

            const entityFieldValueForm: IEntityFieldValueForm = {
              fieldId: modelField.field._id,
              selectedExistingFiles: entityFieldValue?.files,
              value: getTranslatedText(
                entityFieldValue?.value,
                formik.values.language
              ),
            };
            return entityFieldValueForm;
          }) || [],
        assignedUsers: props.entity?.assignedUsers || [],
        modelId: props.modelId || props.entity?.model._id || "",
        language: formik.values.language,
      },
    });
  }, [props.entity, formik.values.language, model]);

  // Loading roles (useful for entity user assignment)
  React.useEffect(() => {
    const command: RolesGetCommand = {
      paginationCommand: {
        limit: 999,
        page: 1,
      },
    };
    getRoles(command);
  }, []);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    props.setOpen(false);
  };
  //#endregion Event listeners

  const loading =
    (props.entity ? updateLoading : createLoading) || uploadFilesLoading;

  return (
    <form onSubmit={handleSubmit} className={styles.createEntityModalContainer}>
      {!props.readOnly && (
        <div className={styles.createEntityHeader}>
          <h2 className={styles.createEntityTitle}>
            {props.entity
              ? getTranslatedText(staticText?.updateEntity)
              : getTranslatedText(staticText?.createEntity)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>
      )}

      {model?.modelFields.map((modelField, modelFieldIndex) => {
        // Check if we can show the field based on role field permissions first:
        const foundFieldPermissions = user.role?.entityPermissions
          .find(
            (entityPermission) => entityPermission.model._id === props.modelId
          )
          ?.entityFieldPermissions.find(
            (entityFieldPermission) =>
              entityFieldPermission.field._id === modelField.field._id
          );

        // By default, if we don't find the field permission in the db for the role, then all the permissions should apply
        if (
          foundFieldPermissions &&
          foundFieldPermissions.permissions.indexOf(StaticPermission.Read) ===
            -1
        ) {
          return null;
        }

        // By default, if we don't find the field permission in the db for the role, then all the permissions should apply
        const canEdit =
          (foundFieldPermissions === undefined ||
            foundFieldPermissions?.permissions.indexOf(
              StaticPermission.Update
            ) !== -1) &&
          !props.readOnly;

        // Check if we can show the field based on conditions second
        const conditionsMet: boolean = areEntityFieldConditionsMet({
          modelField,
          entityFieldValuesFromForm: formik.values.entityFieldValues,
        });

        if (!conditionsMet) return null;

        const entityFieldValue: IEntityFieldValueForm | undefined =
          formik.values.entityFieldValues.find(
            (el) => el.fieldId === modelField.field._id
          );

        const value = entityFieldValue?.value;

        const handleOnChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          formik.setFieldValue(
            "entityFieldValues",
            formik.values.entityFieldValues.map((entityFieldValue) => {
              if (entityFieldValue.fieldId === modelField.field._id) {
                return {
                  ...entityFieldValue,
                  value: e.target.value.toString(),
                };
              } else {
                return entityFieldValue;
              }
            }) || []
          );
        };

        if (
          modelField.field.type === FieldType.Text ||
          modelField.field.type === FieldType.Number
        ) {
          return (
            <Input
              key={modelFieldIndex}
              Icon={MdTextFields}
              formik={formik}
              name="entityFieldValues"
              value={value}
              label={getTranslatedText(modelField.field.name)}
              onChange={handleOnChange}
              inputProps={{
                disabled: !canEdit,
                placeholder: getTranslatedText(modelField.field.name),
                type:
                  modelField.field.type === FieldType.Number
                    ? "number"
                    : "text",
              }}
              error={
                erroredRequiredFields.find(
                  (mf) => mf.field._id === modelField.field._id
                )
                  ? getTranslatedText(staticText?.required)
                  : ""
              }
            />
          );
        }

        if (modelField.field.type === FieldType.Paragraph) {
          return (
            <Textarea
              key={modelFieldIndex}
              formik={formik}
              name="entityFieldValues"
              value={value}
              label={getTranslatedText(modelField.field.name)}
              onChange={handleOnChange}
              textareaProps={{
                disabled: !canEdit,
                placeholder: getTranslatedText(modelField.field.name),
              }}
            />
          );
        }

        if (modelField.field.type === FieldType.File) {
          return (
            <EntityFieldFiles
              key={modelFieldIndex}
              entityFieldValue={entityFieldValue}
              formik={formik}
              modelField={modelField}
              disabled={!canEdit}
            />
          );
        }

        if (modelField.field.type === FieldType.Selector) {
          const options =
            modelField.field.options?.map((op) => ({
              label: getTranslatedText(op.label),
              value: op.value,
            })) || [];
          return (
            <InputSelect
              key={modelFieldIndex}
              label={getTranslatedText(modelField.field.name)}
              options={
                modelField.field.options?.map((op) => ({
                  label: getTranslatedText(op.label),
                  value: op.value,
                })) || []
              }
              value={
                options.find((op) => op.value === value) || {
                  label: "",
                  value: "",
                }
              }
              placeholder={getTranslatedText(modelField.field.name)}
              disabled={!canEdit}
              onChange={(option: Option) => {
                formik.setFieldValue(
                  "entityFieldValues",
                  formik.values.entityFieldValues.map((entityFieldValue) => {
                    if (entityFieldValue.fieldId === modelField.field._id) {
                      return {
                        ...entityFieldValue,
                        value: option.value,
                      };
                    } else {
                      return entityFieldValue;
                    }
                  }) || []
                );
              }}
            />
          );
        }
        if (modelField.field.type === FieldType.Button) {
          return (
            <Button
              key={modelFieldIndex}
              style={{ marginTop: 5, marginBottom: 20 }}
              onClick={async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
                modelField.field.fieldEvents
                  .filter(
                    (fieldEvent) =>
                      fieldEvent.eventTrigger === EventTriggerEnum.OnClick
                  )
                  .forEach(async (fieldEvent: IEvent) => {
                    switch (fieldEvent.eventType) {
                      case EventTypeEnum.Redirection: {
                        window.location.href = fieldEvent.redirectionUrl;
                        break;
                      }
                      case EventTypeEnum.ApiCall: {
                        await sendEventApiCall({
                          event: fieldEvent,
                          createdOrUpdateEntity: null,
                          axios,
                        });
                        break;
                      }
                    }
                  });
              }}
            >
              {getTranslatedText(modelField.field.name)}
            </Button>
          );
        }
      })}

      <h3 className={styles.userAssignmentTitle}>
        {getTranslatedText(staticText?.userAssignment)}
      </h3>
      {roles
        .filter((role) => {
          if (user.superRole === SuperRole.SuperAdmin) {
            return true;
          }

          const userPermissionsOnEntity: IEntityPermission | undefined =
            user.role?.entityPermissions.find(
              (e) => e.model._id.toString() === model?._id.toString()
            );

          if (!userPermissionsOnEntity) {
            return false;
          } else {
            if (
              userPermissionsOnEntity.entityUserAssignmentPermissionsByRole
                ?.canAssignToUserFromSameRole &&
              role._id.toString() === user.role?._id.toString()
            ) {
              return true;
            } else {
              return userPermissionsOnEntity.entityUserAssignmentPermissionsByRole?.otherRoles.some(
                (otherRole) => otherRole._id.toString() === role._id.toString()
              );
            }
          }
        })
        .map((role: IRole, roleIndex: number) => {
          return (
            <div
              key={roleIndex}
              className={styles.assignedUsersByRoleInputContainer}
            >
              <SearchInput
                searchPromise={handleSearchUsersByRolePromise(
                  role._id.toString()
                )}
                label={getTranslatedText(role?.name) + ":"}
                getElementTitle={(user: IUser) =>
                  user.firstName + " " + user.lastName
                }
                inputProps={{
                  placeholder: getTranslatedText(staticText?.searchUsers),
                }}
                onElementClick={(user: IUser) => {
                  if (
                    !formik.values.assignedUsers.some(
                      (u) => u._id.toString() === user._id.toString()
                    )
                  ) {
                    formik.setFieldValue("assignedUsers", [
                      ...formik.values.assignedUsers,
                      user,
                    ]);
                  }
                }}
              />

              {formik.values.assignedUsers
                .filter((u) => u.role?._id.toString() === role._id.toString())
                .map((user: IUser, userIndex: number) => {
                  return (
                    <div
                      key={userIndex}
                      className={styles.assignedUsersByRoleContainer}
                    >
                      <MdDelete
                        onClick={() => {
                          formik.setFieldValue("assignedUsers", [
                            formik.values.assignedUsers.filter(
                              (user) => user._id !== user._id
                            ),
                          ]);
                        }}
                        className={styles.deleteAssignedUserIcon}
                      />
                      <UserProfilePicture
                        url={user.profilePicture?.url}
                        size={SizeEnum.Average}
                      />
                      <span className={styles.assignedUsername}>
                        {user.firstName + " " + user.lastName}
                      </span>
                    </div>
                  );
                })}
            </div>
          );
        })}

      <InputSelect
        label={getTranslatedText(staticText?.language)}
        name="language"
        formik={formik}
        options={getLanguages()}
        value={
          getLanguages().find((el) => el.value === formik.values.language) ||
          getLanguages()[0]
        }
      />

      {/* Errored required fields error text */}
      {formik.touched.entityFieldValues && erroredRequiredFields.length > 0 && (
        <span className={styles.erroredFields}>
          {getTranslatedText(staticText?.required) +
            ": " +
            erroredRequiredFields
              .map((modelField) => getTranslatedText(modelField.field.name))
              .join(",")}
        </span>
      )}

      {!loading && !props.readOnly && (
        <Button
          disabled={loading}
          type="submit"
          style={{}}
          className={styles.button}
        >
          {getTranslatedText(staticText?.submit)}
        </Button>
      )}

      {loading && (
        <ReactLoading
          className={styles.loading}
          type={"spin"}
          color={theme.primary}
          width={36}
          height={36}
        />
      )}
    </form>
  );
};

export default React.memo(EntityEditorForm);
