import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdTitle,
} from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import useCreateRole, {
  RoleCreateCommand,
} from "../../../hooks/apiHooks/useCreateRole";
import useUpdateRole, {
  RoleUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateRole";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import {
  IRole,
  EventNotificationTrigger,
  Permission,
  StaticPermission,
  IEventNotification,
} from "../../../store/slices/roleSlice";
import useStyles from "./roleEditor.styles";
import { Option } from "../../inputSelect/InputSelect";
import lowerCaseFirstLetter from "../../../utils/lowerCaseFirstLetter";
import SearchInput from "../../searchInput";
import { IModel } from "../../../store/slices/modelSlice";
import useSearchModels from "../../../hooks/apiHooks/useSearchModels";
import Checkbox from "../../checkbox";
import { IField } from "../../../store/slices/fieldSlice";
import RoleEntityEventsNotification from "./roleEntityEventsNotification/RoleEntityEventsNotification";

export interface IRoleEditor {
  role?: IRole;
  open?: boolean;
  setOpen?: (boolean) => void;
}

export interface IEventNotificationForm {
  title: string;
  text: string;
  trigger: EventNotificationTrigger;
}

interface IRoleFormEntityPermission {
  model: IModel;
  permissions: StaticPermission[];
  fieldPermissions: {
    field: IField;
    permissions: StaticPermission[];
  }[];
  eventNotifications: IEventNotificationForm[];
}

export interface IRoleForm {
  name: string;
  language: string;
  permissions: Permission[];
  entityPermissions: IRoleFormEntityPermission[];
}

const RoleEditor = (props: IRoleEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.roles
  );

  //#region Local state
  const [roleModalOpen, setRoleModalOpen] = React.useState<boolean>(false);
  const [showFieldPermissions, setShowFieldPermissions] =
    React.useState<boolean>(false);
  const [showEventNotifications, setShowEventNotifications] =
    React.useState<boolean>(false);

  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createRole, loading: createLoading } = useCreateRole();
  const { updateRole, loading: updateLoading } = useUpdateRole();
  const { handleSearchModelsPromise } = useSearchModels();
  const initialValues: IRoleForm = {
    name: "",
    language,
    permissions: Object.values(Permission),
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
              modelId: entityPermission.model._id,
              permissions: entityPermission.permissions,
              fieldPermissions: entityPermission.fieldPermissions.map(
                (fPermission) => ({
                  fieldId: fPermission.field._id,
                  permissions: fPermission.permissions,
                })
              ),
              eventNotifications: entityPermission.eventNotifications.map(
                (eventNotification) => ({
                  title: eventNotification.title,
                  text: eventNotification.text,
                  trigger: eventNotification.trigger,
                })
              ),
              language: values.language,
            })
          ),
        };

        await updateRole(command);
      } else {
        const command: RoleCreateCommand = {
          name: values.name,
          language: values.language,
          permissions: values.permissions,
          entityPermissions: values.entityPermissions.map(
            (entityPermission) => ({
              modelId: entityPermission.model._id,
              permissions: entityPermission.permissions,
              fieldPermissions: entityPermission.fieldPermissions.map(
                (fPermission) => ({
                  fieldId: fPermission.field._id,
                  permissions: fPermission.permissions,
                })
              ),
              eventNotifications: entityPermission.eventNotifications.map(
                (eventNotification) => ({
                  title: eventNotification.title,
                  text: eventNotification.text,
                  trigger: eventNotification.trigger,
                })
              ),
              language: values.language,
            })
          ),
        };

        await createRole(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setRoleModalOpen(props.open);
    }
  }, [props.open]);

  React.useEffect(() => {
    if (!props.open) {
      formik.resetForm({
        values: { ...initialValues },
      });
    }
  }, [props.open]);

  React.useEffect(() => {
    // Initialize the form based on the language and the passed role to update
    formik.resetForm({
      values: {
        name: getTranslatedText(props.role?.name, formik.values.language),
        language: formik.values.language,
        permissions: props.role?.permissions || formik.values.permissions,
        entityPermissions:
          props.role?.entityPermissions?.map((entityPermission) => {
            return {
              model: entityPermission.model,
              permissions: entityPermission.permissions || [],
              // We need to set the initial values of all fields (fields that already have stored permissions in the db + fields with no stored permissions)
              fieldPermissions: entityPermission.model.modelFields.map(
                (modelField) => ({
                  field: modelField.field,
                  permissions: entityPermission.fieldPermissions.find(
                    (fieldPermission) =>
                      fieldPermission.field._id === modelField.field._id
                  )?.permissions || [
                    StaticPermission.Read,
                    StaticPermission.Update,
                  ],
                })
              ),
              eventNotifications: entityPermission.eventNotifications.map(
                (eventNotification) => ({
                  title: getTranslatedText(
                    eventNotification.title,
                    formik.values.language
                  ),
                  text: getTranslatedText(
                    eventNotification.text,
                    formik.values.language
                  ),
                  trigger: eventNotification.trigger,
                })
              ),
            };
          }) || formik.values.entityPermissions,
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
    if (props.setOpen) {
      props.setOpen(false);
    } else setRoleModalOpen(false);
  };

  const handleSelectModel = (model: IModel) => {
    const currentPermissions: IRoleFormEntityPermission[] =
      formik.values.entityPermissions;

    const foundEntityPermission = currentPermissions.find(
      (el) => el.model._id === model._id
    );

    if (!foundEntityPermission) {
      const newEntityPermission: IRoleFormEntityPermission = {
        model: model,
        permissions: [
          StaticPermission.Create,
          StaticPermission.Read,
          StaticPermission.Update,
          StaticPermission.Delete,
        ],
        fieldPermissions: model.modelFields.map((modelField) => ({
          field: modelField.field,
          permissions: [StaticPermission.Read, StaticPermission.Update],
        })),
        eventNotifications: [],
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
    staticPermission: StaticPermission;
  }) => {
    const newEntityPermissions = formik.values.entityPermissions.map(
      (entityPermission: IRoleFormEntityPermission) => {
        if (entityPermission.model._id === modelId) {
          const containStaticPermission: boolean =
            entityPermission.permissions.indexOf(staticPermission) !== -1;
          return {
            model: entityPermission.model,
            permissions: containStaticPermission
              ? entityPermission.permissions.filter(
                  (p) => p !== staticPermission
                )
              : [...entityPermission.permissions, staticPermission],
            fieldPermissions: entityPermission.fieldPermissions,
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
    staticPermission: StaticPermission;
  }) => {
    const newEntityPermissions = formik.values.entityPermissions.map(
      (entityPermission: IRoleFormEntityPermission) => {
        if (entityPermission.model._id === modelId) {
          const containStaticPermission: boolean =
            entityPermission.fieldPermissions
              .find((fieldPermission) => fieldPermission.field._id === fieldId)
              ?.permissions.indexOf(staticPermission) !== -1;

          // Force the permissions to both read and update when we select update
          // Force the permissions to non when we deselect the read
          let newPermissions: StaticPermission[] | undefined = undefined;
          if (
            containStaticPermission &&
            staticPermission === StaticPermission.Read
          ) {
            newPermissions = [];
          } else if (
            !containStaticPermission &&
            staticPermission === StaticPermission.Update
          ) {
            newPermissions = [StaticPermission.Read, StaticPermission.Update];
          }
          return {
            model: entityPermission.model,
            permissions: entityPermission.permissions,
            fieldPermissions: entityPermission.fieldPermissions.map(
              (fieldPermission) => ({
                field: fieldPermission.field,
                permissions:
                  fieldPermission.field._id === fieldId
                    ? newPermissions !== undefined
                      ? newPermissions
                      : containStaticPermission
                      ? fieldPermission.permissions.filter(
                          (p) => p !== staticPermission
                        )
                      : [...fieldPermission.permissions, staticPermission]
                    : fieldPermission.permissions,
              })
            ),
          };
        } else return entityPermission;
      }
    );

    formik.setFieldValue("entityPermissions", newEntityPermissions);
  };

  const handleApplyEventNotifications =
    (modelId: string) => (eventNotifications: IEventNotificationForm[]) => {
      const newEntityPermissions = formik.values.entityPermissions.map(
        (entityPermission: IRoleFormEntityPermission) => {
          if (entityPermission.model._id === modelId) {
            return {
              model: entityPermission.model,
              permissions: entityPermission.permissions,
              fieldPermissions: entityPermission.fieldPermissions,
              eventNotifications: eventNotifications,
            };
          } else return entityPermission;
        }
      );

      formik.setFieldValue("entityPermissions", newEntityPermissions);
    };
  //#endregion Event listeners

  const loading = props.role ? updateLoading : createLoading;
  const permissionsOptions: Option[] = Object.values(Permission).map(
    (permission) => {
      return {
        label: getTranslatedText(
          staticText?.[lowerCaseFirstLetter(permission)]
        ),
        value: permission,
      };
    }
  );

  return (
    <Modal handleClose={handleCloseModal} open={roleModalOpen}>
      <form onSubmit={handleSubmit} className={styles.createRoleModalContainer}>
        <div className={styles.createRoleHeader}>
          <h2 className={styles.createRoleTitle}>
            {props.role
              ? getTranslatedText(staticText?.updateRole)
              : getTranslatedText(staticText?.createRole)}
          </h2>

          <ImCross onClick={handleCloseModal} className={styles.closeButton} />
        </div>

        <Input
          Icon={MdTitle}
          formik={formik}
          name="name"
          inputProps={{
            placeholder: getTranslatedText(staticText?.namePlaceholder),
          }}
        />

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

        <InputSelect
          label={getTranslatedText(staticText?.permissions)}
          name="permissions"
          formik={formik}
          options={permissionsOptions}
          isMulti
        />

        <SearchInput
          getElementTitle={(model: IModel) => getTranslatedText(model.name)}
          searchPromise={handleSearchModelsPromise}
          onElementClick={handleSelectModel}
          label={getTranslatedText(staticText?.entitiesPermisions)}
          inputProps={{
            placeholder: getTranslatedText(staticText?.searchByModel),
          }}
        />

        <div className={styles.entityPermissionsContainer}>
          {formik.values.entityPermissions.map(
            (entityPermission: IRoleFormEntityPermission, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.singleEntityPermissionContainer}
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
                    label={getTranslatedText(staticText?.create)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) => permission === StaticPermission.Create
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermission.Create,
                      })
                    }
                  />
                  <Checkbox
                    label={getTranslatedText(staticText?.read)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) => permission === StaticPermission.Read
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermission.Read,
                      })
                    }
                  />
                  <Checkbox
                    label={getTranslatedText(staticText?.update)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) => permission === StaticPermission.Update
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermission.Update,
                      })
                    }
                  />
                  <Checkbox
                    label={getTranslatedText(staticText?.delete)}
                    checked={
                      entityPermission.permissions.find(
                        (permission) => permission === StaticPermission.Delete
                      ) || false
                    }
                    labelStyles={{ width: 100 }}
                    onChange={() =>
                      handleCheckOrUncheckStaticEntityPermission({
                        modelId: entityPermission.model._id,
                        staticPermission: StaticPermission.Delete,
                      })
                    }
                  />

                  <span
                    onClick={() =>
                      setShowFieldPermissions(!showFieldPermissions)
                    }
                    className={styles.fieldPermissionsTitle}
                  >
                    {getTranslatedText(staticText?.fieldPermissions)}
                    {!showFieldPermissions && (
                      <MdArrowDownward className={styles.arrowIcon} />
                    )}
                    {showFieldPermissions && (
                      <MdArrowUpward className={styles.arrowIcon} />
                    )}
                  </span>

                  {showFieldPermissions &&
                    entityPermission.model.modelFields.map(
                      (modelField, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.singleFieldPermissionContainer}
                          >
                            <span className={styles.fieldName}>
                              {getTranslatedText(modelField.field.name)}
                            </span>

                            <Checkbox
                              label={getTranslatedText(staticText?.read)}
                              checked={
                                entityPermission.fieldPermissions
                                  .find(
                                    (fieldPermission) =>
                                      fieldPermission.field._id ===
                                      modelField.field._id
                                  )
                                  ?.permissions.find(
                                    (permission) =>
                                      permission === StaticPermission.Read
                                  ) || false
                              }
                              labelStyles={{ width: 100 }}
                              onChange={() =>
                                handleCheckOrUncheckStaticFieldPermission({
                                  modelId: entityPermission.model._id,
                                  fieldId: modelField.field._id,
                                  staticPermission: StaticPermission.Read,
                                })
                              }
                            />
                            <Checkbox
                              label={getTranslatedText(staticText?.update)}
                              checked={
                                entityPermission.fieldPermissions
                                  .find(
                                    (fieldPermission) =>
                                      fieldPermission.field._id ===
                                      modelField.field._id
                                  )
                                  ?.permissions.find(
                                    (permission) =>
                                      permission === StaticPermission.Update
                                  ) || false
                              }
                              labelStyles={{ width: 100 }}
                              onChange={() =>
                                handleCheckOrUncheckStaticFieldPermission({
                                  modelId: entityPermission.model._id,
                                  fieldId: modelField.field._id,
                                  staticPermission: StaticPermission.Update,
                                })
                              }
                            />
                          </div>
                        );
                      }
                    )}

                  <span
                    onClick={() =>
                      setShowEventNotifications(!showEventNotifications)
                    }
                    className={styles.eventNotificationsTitle}
                  >
                    {getTranslatedText(staticText?.eventNotifications)}
                    {!showEventNotifications && (
                      <MdArrowDownward className={styles.arrowIcon} />
                    )}
                    {showEventNotifications && (
                      <MdArrowUpward className={styles.arrowIcon} />
                    )}
                  </span>

                  {showEventNotifications && (
                    <RoleEntityEventsNotification
                      key={index}
                      eventNotifications={entityPermission.eventNotifications}
                      handleApplyEventNotifications={handleApplyEventNotifications(
                        entityPermission.model._id
                      )}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>

        {!loading && (
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
    </Modal>
  );
};

export default React.memo(RoleEditor);
