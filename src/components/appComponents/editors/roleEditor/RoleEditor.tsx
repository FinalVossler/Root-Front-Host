import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdDelete, MdTitle } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import Modal from "../../../fundamentalComponents/modal";
import Button from "../../../fundamentalComponents/button";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import useCreateRole from "../../../../hooks/apiHooks/useCreateRole";
import useUpdateRole, {
  RoleUpdateCommand,
} from "../../../../hooks/apiHooks/useUpdateRole";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import InputSelect from "../../../fundamentalComponents/inputs/inputSelect";
import getLanguages from "../../../../utils/getLanguages";
import useStyles from "./roleEditor.styles";
import { IInputSelectOption } from "../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import lowerCaseFirstLetter from "../../../../utils/lowerCaseFirstLetter";
import SearchInput from "../../../fundamentalComponents/inputs/searchInput";
import useSearchModels from "../../../../hooks/apiHooks/useSearchModels";
import Checkbox from "../../../fundamentalComponents/inputs/checkbox";
import RoleEntityEventsNotification from "./roleEntityEventsNotification/RoleEntityEventsNotification";
import RoleEntityUserAssignmentPermissions from "./roleEntityUserAssignmentPermissions";
import ExtendSection from "../../../fundamentalComponents/extendSection";
import {
  EntityEventNotificationTriggerEnum,
  IEntityPermissionReadDto,
  IFieldReadDto,
  IModelReadDto,
  IRoleCreateCommand,
  IRoleReadDto,
  ITheme,
  PermissionEnum,
  StaticPermissionEnum,
} from "roottypes";
import { editorSlice } from "../../../../store/slices/editorSlice";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";
import FormikInputSelect from "../../../fundamentalComponents/formikInputs/formikInputSelect";

export interface IEntityEventNotificationForm {
  _id?: string;
  title: string;
  text: string;
  trigger: EntityEventNotificationTriggerEnum;
}

interface IRoleFormEntityPermission {
  _id?: string;
  model: IModelReadDto;
  permissions: StaticPermissionEnum[];
  entityFieldPermissions: {
    field: IFieldReadDto;
    permissions: StaticPermissionEnum[];
  }[];
  entityEventNotifications: IEntityEventNotificationForm[];
  entityUserAssignmentPermissionsByRole: {
    // used to also add the current role that's just been added
    canAssignToUserFromSameRole: boolean;
    otherRolesIds: string[];
  };
}

export interface IRoleForm {
  name: string;
  language: string;
  permissions: PermissionEnum[];
  entityPermissions: IRoleFormEntityPermission[];
}

export interface IRoleEditorProps {
  role?: IRoleReadDto;
  id: string;
}

const RoleEditor = (props: IRoleEditorProps) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.roles
  );

  //#region Local state
  const [showFieldPermissions, setShowFieldPermissions] =
    React.useState<boolean>(false);
  const [showEventNotifications, setShowEventNotifications] =
    React.useState<boolean>(false);
  const [showUserAssignment, setShowUserAssignment] =
    React.useState<boolean>(false);

  //#endregion Local state

  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const getTranslatedText = useGetTranslatedText();
  const { createRole, loading: createLoading } = useCreateRole();
  const { updateRole, loading: updateLoading } = useUpdateRole();
  const { handleSearchModelsPromise } = useSearchModels();
  const initialValues: IRoleForm = {
    name: "",
    language,
    permissions: Object.values(PermissionEnum),
    entityPermissions: [],
  };
  const formik: FormikProps<IRoleForm> = useFormik<IRoleForm>({
    initialValues: { ...initialValues },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        getTranslatedText(staticText?.nameIsRequired)
      ),
    }),
    onSubmit: async (values: IRoleForm) => {
      if (props.role) {
        const command: RoleUpdateCommand = {
          _id: props.role._id,
          name: values.name,
          language: values.language,
          permissions: values.permissions,
          entityPermissions: values.entityPermissions.map(
            (entityPermission) => ({
              _id: entityPermission._id,
              modelId: entityPermission.model._id,
              permissions: entityPermission.permissions,
              entityFieldPermissions:
                entityPermission.entityFieldPermissions.map((fPermission) => ({
                  fieldId: fPermission.field._id,
                  permissions: fPermission.permissions,
                })),
              entityEventNotifications:
                entityPermission.entityEventNotifications.map(
                  (entityEventNotification) => ({
                    _id: entityEventNotification._id,
                    title: entityEventNotification.title,
                    text: entityEventNotification.text,
                    trigger: entityEventNotification.trigger,
                    language: values.language,
                  })
                ),
              entityUserAssignmentPermissionsByRole:
                entityPermission.entityUserAssignmentPermissionsByRole,
              language: values.language,
            })
          ),
        };

        await updateRole(command);
      } else {
        const command: IRoleCreateCommand = {
          name: values.name,
          language: values.language,
          permissions: values.permissions,
          entityPermissions: values.entityPermissions.map(
            (entityPermission) => ({
              _id: entityPermission._id,
              modelId: entityPermission.model._id,
              permissions: entityPermission.permissions,
              entityFieldPermissions:
                entityPermission.entityFieldPermissions.map((fPermission) => ({
                  fieldId: fPermission.field._id,
                  permissions: fPermission.permissions,
                })),
              entityEventNotifications:
                entityPermission.entityEventNotifications.map(
                  (entityEventNotification) => ({
                    _id: entityEventNotification._id,
                    title: entityEventNotification.title,
                    text: entityEventNotification.text,
                    trigger: entityEventNotification.trigger,
                    language: values.language,
                  })
                ),
              entityUserAssignmentPermissionsByRole:
                entityPermission.entityUserAssignmentPermissionsByRole,
              language: values.language,
            })
          ),
        };

        await createRole(command);
      }

      dispatch(editorSlice.actions.removeEditor(props.id));
    },
  });

  //#region Effects
  React.useEffect(() => {
    // Initialize the form based on the language and the passed role to update
    formik.resetForm({
      values: {
        name: props.role
          ? getTranslatedText(props.role?.name, formik.values.language)
          : "",
        language: formik.values.language,
        permissions: props.role?.permissions || formik.values.permissions,
        entityPermissions:
          (props.role?.entityPermissions as IEntityPermissionReadDto[])?.map(
            (entityPermission) => {
              return {
                _id: entityPermission._id,
                model: entityPermission.model as IModelReadDto,
                permissions: entityPermission.permissions || [],
                // We need to set the initial values of all fields (fields that already have stored permissions in the db + fields with no stored permissions)
                entityFieldPermissions: (
                  entityPermission.model as IModelReadDto
                ).modelFields.map((modelField) => ({
                  field: modelField.field as IFieldReadDto,
                  permissions: entityPermission.entityFieldPermissions.find(
                    (entityFieldPermission) =>
                      (entityFieldPermission.field as IFieldReadDto)._id ===
                      (modelField.field as IFieldReadDto)._id
                  )?.permissions || [
                    StaticPermissionEnum.Read,
                    StaticPermissionEnum.Update,
                  ],
                })),
                entityEventNotifications:
                  entityPermission.entityEventNotifications.map(
                    (entityEventNotification) => ({
                      _id: entityEventNotification._id,
                      title: getTranslatedText(
                        entityEventNotification.title,
                        formik.values.language
                      ),
                      text: getTranslatedText(
                        entityEventNotification.text,
                        formik.values.language
                      ),
                      trigger: entityEventNotification.trigger,
                    })
                  ),
                entityUserAssignmentPermissionsByRole: {
                  canAssignToUserFromSameRole:
                    entityPermission.entityUserAssignmentPermissionsByRole
                      ?.canAssignToUserFromSameRole || true,
                  otherRolesIds:
                    (
                      entityPermission.entityUserAssignmentPermissionsByRole
                        ?.otherRoles as IRoleReadDto[] | undefined
                    )?.map((r) => r._id) || [],
                },
              };
            }
          ) || formik.values.entityPermissions,
      },
    });
  }, [props.role, formik.values.language]);

  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    dispatch(editorSlice.actions.removeEditor(props.id));
  };

  const handleSelectModel = (model: IModelReadDto) => {
    const currentPermissions: IRoleFormEntityPermission[] =
      formik.values.entityPermissions;

    const foundEntityPermission = currentPermissions.find(
      (el) => el.model._id === model._id
    );

    if (!foundEntityPermission) {
      // We create a new entity permission for this model
      const newEntityPermission: IRoleFormEntityPermission = {
        model: model,
        permissions: [
          StaticPermissionEnum.Create,
          StaticPermissionEnum.Read,
          StaticPermissionEnum.Update,
          StaticPermissionEnum.Delete,
        ],
        entityFieldPermissions: model.modelFields.map((modelField) => ({
          field: modelField.field as IFieldReadDto,
          permissions: [StaticPermissionEnum.Read, StaticPermissionEnum.Update],
        })),
        entityEventNotifications: [],
        entityUserAssignmentPermissionsByRole: {
          canAssignToUserFromSameRole: true,
          otherRolesIds: [],
        },
      };
      formik.setFieldValue("entityPermissions", [
        ...currentPermissions,
        newEntityPermission,
      ]);
    }
  };

  const handleCheckOrUncheckStaticEntityPermission = ({
    modelId,
    staticPermission,
  }: {
    modelId: string;
    staticPermission: StaticPermissionEnum;
  }) => {
    const newEntityPermissions = formik.values.entityPermissions.map(
      (entityPermission: IRoleFormEntityPermission) => {
        if (entityPermission.model._id === modelId) {
          const containStaticPermission: boolean =
            entityPermission.permissions.indexOf(staticPermission) !== -1;
          return {
            ...entityPermission,
            model: entityPermission.model,
            permissions: containStaticPermission
              ? entityPermission.permissions.filter(
                  (p) => p !== staticPermission
                )
              : [...entityPermission.permissions, staticPermission],
            entityFieldPermissions: entityPermission.entityFieldPermissions,
          };
        } else return entityPermission;
      }
    );

    formik.setFieldValue("entityPermissions", newEntityPermissions);
  };

  const handleDeleteEntityPermission = (
    entityPermission: IRoleFormEntityPermission
  ) => {
    formik.setFieldValue(
      "entityPermissions",
      formik.values.entityPermissions.filter(
        (pot) => pot.model._id !== entityPermission.model._id
      )
    );
  };

  const handleCheckOrUncheckStaticFieldPermission = ({
    modelId,
    fieldId,
    staticPermission,
  }: {
    modelId: string;
    fieldId: string;
    staticPermission: StaticPermissionEnum;
  }) => {
    const newEntityPermissions = formik.values.entityPermissions.map(
      (entityPermission: IRoleFormEntityPermission) => {
        if (entityPermission.model._id === modelId) {
          const containStaticPermission: boolean =
            entityPermission.entityFieldPermissions
              .find(
                (entityFieldPermission) =>
                  entityFieldPermission.field._id === fieldId
              )
              ?.permissions.indexOf(staticPermission) !== -1;

          // Force the permissions to both read and update when we select update
          // Force the permissions to non when we deselect the read
          let newPermissions: StaticPermissionEnum[] | undefined = undefined;
          if (
            containStaticPermission &&
            staticPermission === StaticPermissionEnum.Read
          ) {
            newPermissions = [];
          } else if (
            !containStaticPermission &&
            staticPermission === StaticPermissionEnum.Update
          ) {
            newPermissions = [
              StaticPermissionEnum.Read,
              StaticPermissionEnum.Update,
            ];
          }
          return {
            ...entityPermission,
            model: entityPermission.model,
            permissions: entityPermission.permissions,
            entityFieldPermissions: entityPermission.entityFieldPermissions.map(
              (entityFieldPermission) => ({
                field: entityFieldPermission.field,
                permissions:
                  entityFieldPermission.field._id === fieldId
                    ? newPermissions !== undefined
                      ? newPermissions
                      : containStaticPermission
                      ? entityFieldPermission.permissions.filter(
                          (p) => p !== staticPermission
                        )
                      : [...entityFieldPermission.permissions, staticPermission]
                    : entityFieldPermission.permissions,
              })
            ),
          };
        } else return entityPermission;
      }
    );

    formik.setFieldValue("entityPermissions", newEntityPermissions);
  };

  const handleApplyEventNotifications =
    (modelId: string) =>
    (entityEventNotifications: IEntityEventNotificationForm[]) => {
      const newEntityPermissions = formik.values.entityPermissions.map(
        (entityPermission: IRoleFormEntityPermission) => {
          if (entityPermission.model._id === modelId) {
            return {
              ...entityPermission,
              model: entityPermission.model,
              permissions: entityPermission.permissions,
              entityFieldPermissions: entityPermission.entityFieldPermissions,
              entityEventNotifications: entityEventNotifications,
            };
          } else return entityPermission;
        }
      );

      formik.setFieldValue("entityPermissions", newEntityPermissions);
    };
  const handleApplyUserAssignmentPermissions =
    (modelId: string) =>
    (userAssignmentPermissions: {
      // used to also add the current role that's just been added
      canAssignToUserFromSameRole: boolean;
      otherRolesIds: string[];
    }) => {
      const newEntityPermissions = formik.values.entityPermissions.map(
        (entityPermission: IRoleFormEntityPermission) => {
          if (entityPermission.model._id === modelId) {
            return {
              ...entityPermission,
              model: entityPermission.model,
              permissions: entityPermission.permissions,
              entityFieldPermissions: entityPermission.entityFieldPermissions,
              entityEventNotifications:
                entityPermission.entityEventNotifications,
              entityUserAssignmentPermissionsByRole: userAssignmentPermissions,
            };
          } else return entityPermission;
        }
      );

      formik.setFieldValue("entityPermissions", newEntityPermissions);
    };
  //#endregion Event listeners

  const loading = props.role ? updateLoading : createLoading;
  const permissionsOptions: IInputSelectOption[] = Object.values(
    PermissionEnum
  ).map((permission) => {
    return {
      label: getTranslatedText(
        //@ts-ignore
        staticText?.[lowerCaseFirstLetter(permission)]
      ),
      value: permission,
    };
  });

  return (
    <Modal theme={theme} handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createRoleModalContainer}
        data-cy="roleForm"
      >
        <div className={styles.createRoleHeader}>
          <h2 className={styles.createRoleTitle}>
            {props.role
              ? getTranslatedText(staticText?.updateRole)
              : getTranslatedText(staticText?.createRole)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <FormikInput
          theme={theme}
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.namePlaceholder),
          }}
          inputDataCy="roleNameInput"
          inputErrorDataCy="roleNameInputError"
        />

        <FormikInputSelect
          theme={theme}
          label={getTranslatedText(staticText?.language)}
          name="language"
          formik={formik}
          options={getLanguages()}
          value={
            getLanguages().find((el) => el.value === formik.values.language) ||
            getLanguages()[0]
          }
        />

        <FormikInputSelect
          theme={theme}
          label={getTranslatedText(staticText?.permissions)}
          name="permissions"
          formik={formik}
          options={permissionsOptions}
          isMulti
          selectorClassName="permissionsSelector"
        />

        <SearchInput
          theme={theme}
          getElementTitle={(model: IModelReadDto) =>
            getTranslatedText(model.name)
          }
          searchPromise={handleSearchModelsPromise}
          onElementClick={handleSelectModel}
          label={getTranslatedText(staticText?.entitiesPermisions)}
          inputProps={{
            placeholder: getTranslatedText(staticText?.searchByModel),
          }}
          inputDataCy="roleSearchModelInput"
        />

        <div className={styles.entityPermissionsContainer}>
          {formik.values.entityPermissions.map(
            (entityPermission: IRoleFormEntityPermission, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.singleEntityPermissionContainer}
                  data-cy={
                    "entityPermissionFormSectionForModel" +
                    entityPermission.model._id.toString()
                  }
                >
                  <MdDelete
                    className={styles.deleteEntityPermissionsButton}
                    onClick={() =>
                      handleDeleteEntityPermission(entityPermission)
                    }
                  />
                  <span className={styles.modelName}>
                    {getTranslatedText(entityPermission.model.name)}:
                  </span>
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.create)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) =>
                          permission === StaticPermissionEnum.Create
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermissionEnum.Create,
                      })
                    }
                    inputDataCy={
                      "entityPermissionCreateForModel" +
                      entityPermission.model._id.toString()
                    }
                  />
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.read)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) => permission === StaticPermissionEnum.Read
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermissionEnum.Read,
                      })
                    }
                    inputDataCy={
                      "entityPermissionReadForModel" +
                      entityPermission.model._id.toString()
                    }
                  />
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.update)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) =>
                          permission === StaticPermissionEnum.Update
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermissionEnum.Update,
                      })
                    }
                    inputDataCy={
                      "entityPermissionUpdateForModel" +
                      entityPermission.model._id.toString()
                    }
                  />
                  <Checkbox
                    theme={theme}
                    label={getTranslatedText(staticText?.delete)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) =>
                          permission === StaticPermissionEnum.Delete
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermissionEnum.Delete,
                      })
                    }
                    inputDataCy={
                      "entityPermissionDeleteForModel" +
                      entityPermission.model._id.toString()
                    }
                  />

                  <ExtendSection
                    theme={theme}
                    onClick={() =>
                      setShowFieldPermissions(!showFieldPermissions)
                    }
                    title={getTranslatedText(
                      staticText?.entityFieldPermissions
                    )}
                    isSectionShown={showFieldPermissions}
                    dataCy={
                      "entityPermissionExtendFieldsSectionForModel" +
                      entityPermission.model?._id.toString()
                    }
                  />

                  {showFieldPermissions &&
                    entityPermission.model.modelFields.map(
                      (modelField, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.singleFieldPermissionContainer}
                            data-cy={
                              "entityFieldPermissionForModel" +
                              entityPermission.model?._id.toString() +
                              "AndField" +
                              (modelField.field as IFieldReadDto)._id.toString()
                            }
                          >
                            <span className={styles.fieldName}>
                              {getTranslatedText(
                                (modelField.field as IFieldReadDto).name
                              )}
                            </span>

                            <Checkbox
                              theme={theme}
                              label={getTranslatedText(staticText?.read)}
                              checked={
                                entityPermission.entityFieldPermissions
                                  .find(
                                    (entityFieldPermission) =>
                                      entityFieldPermission.field._id ===
                                      (modelField.field as IFieldReadDto)._id
                                  )
                                  ?.permissions.find(
                                    (permission) =>
                                      permission === StaticPermissionEnum.Read
                                  ) || false
                              }
                              labelStyles={{ width: 100 }}
                              onChange={() =>
                                handleCheckOrUncheckStaticFieldPermission({
                                  modelId: entityPermission.model._id,
                                  fieldId: (modelField.field as IFieldReadDto)
                                    ._id,
                                  staticPermission: StaticPermissionEnum.Read,
                                })
                              }
                              inputDataCy={
                                "entityFieldReadPermissionForModel" +
                                entityPermission.model._id.toString() +
                                "AndField" +
                                (
                                  modelField.field as IFieldReadDto
                                )._id.toString()
                              }
                            />
                            <Checkbox
                              theme={theme}
                              label={getTranslatedText(staticText?.update)}
                              checked={
                                entityPermission.entityFieldPermissions
                                  .find(
                                    (entityFieldPermission) =>
                                      entityFieldPermission.field._id ===
                                      (modelField.field as IFieldReadDto)._id
                                  )
                                  ?.permissions.find(
                                    (permission) =>
                                      permission === StaticPermissionEnum.Update
                                  ) || false
                              }
                              labelStyles={{ width: 100 }}
                              onChange={() =>
                                handleCheckOrUncheckStaticFieldPermission({
                                  modelId: entityPermission.model._id,
                                  fieldId: (modelField.field as IFieldReadDto)
                                    ._id,
                                  staticPermission: StaticPermissionEnum.Update,
                                })
                              }
                              inputDataCy={
                                "entityFieldUpdatePermissionForModel" +
                                entityPermission.model._id.toString() +
                                "AndField" +
                                (
                                  modelField.field as IFieldReadDto
                                )._id.toString()
                              }
                            />
                          </div>
                        );
                      }
                    )}

                  <ExtendSection
                    theme={theme}
                    onClick={() =>
                      setShowEventNotifications(!showEventNotifications)
                    }
                    title={getTranslatedText(
                      staticText?.entityEventNotifications
                    )}
                    isSectionShown={showEventNotifications}
                    dataCy={
                      "entityPermissionExtendEventNotificationsSectionForModel" +
                      entityPermission.model._id.toString()
                    }
                  />

                  {showEventNotifications && (
                    <RoleEntityEventsNotification
                      key={index}
                      entityEventNotifications={
                        entityPermission.entityEventNotifications
                      }
                      handleApplyEventNotifications={handleApplyEventNotifications(
                        entityPermission.model._id
                      )}
                      modelId={entityPermission.model._id.toString()}
                    />
                  )}

                  <ExtendSection
                    theme={theme}
                    onClick={() => setShowUserAssignment(!showUserAssignment)}
                    title={getTranslatedText(
                      staticText?.assignmentConfigurationTitle
                    )}
                    isSectionShown={showUserAssignment}
                    dataCy={
                      "entityPermissionExtendUserAssignmentPermissionsSectionForModel" +
                      entityPermission.model._id.toString()
                    }
                  />

                  {showUserAssignment && (
                    <RoleEntityUserAssignmentPermissions
                      entityUserAssignmentPermissionsByRole={
                        entityPermission.entityUserAssignmentPermissionsByRole
                      }
                      handleApplyUserAssignmentPermissions={handleApplyUserAssignmentPermissions(
                        entityPermission.model._id
                      )}
                      modelId={entityPermission.model._id}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>

        {!loading && (
          <Button
            theme={theme}
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
            buttonDataCy="submitRoleButton"
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
    </Modal>
  );
};

export default React.memo(RoleEditor);
