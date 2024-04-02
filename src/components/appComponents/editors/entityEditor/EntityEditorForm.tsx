import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { MdDelete, MdTextFields } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import Button from "../../../fundamentalComponents/button";
import { useAppSelector } from "../../../../store/hooks";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import InputSelect from "../../../fundamentalComponents/inputs/inputSelect";
import getLanguages from "../../../../utils/getLanguages";
import useUpdateEntity from "../../../../hooks/apiHooks/useUpdateEntity";
import useCreateEntity from "../../../../hooks/apiHooks/useCreateEntity";
import { IModelField } from "../../../../store/slices/modelSlice";
import EntityFieldFiles from "./entityFieldFiles";
import uploadFiles from "../../../../utils/uploadFiles";
import { IInputSelectOption } from "../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import useAxios from "../../../../hooks/useAxios";
import areEntityFieldConditionsMet from "../../../../utils/areEntityFieldConditionsMet";

import useStyles from "./entityEditor.styles";
import sendEventApiCall from "../../../../utils/sendEventApiCall";
import useGetRoles from "../../../../hooks/apiHooks/useGetRoles";
import SearchInput from "../../../fundamentalComponents/inputs/searchInput";
import useSearchUsersByRole from "../../../../hooks/apiHooks/useSearchUsersByRole";
import UserProfilePicture, {
  SizeEnum,
} from "../../../fundamentalComponents/userProfilePicture/UserProfilePicture";
import EntityEditorStates from "./entityEditorStates/EntityEditorStates";
import EntityEditorTableField from "./entityEditorTableField";
import isValidUrl from "../../../../utils/isValidUrl";
import {
  FieldTypeEnum,
  IEntityCreateCommand,
  IEntityReadDto,
  IEntityTableFieldCaseValueCommand,
  IEntityYearTableFieldRowValuesCommand,
  IFieldReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
  IEntityFieldValueReadDto,
  IFileReadDto,
  IEntityPermissionReadDto,
  SuperRoleEnum,
  IEntityUpdateCommand,
  IMicroFrontendComponentReadDto,
  IFieldTableElementReadDto,
  IRolesGetCommand,
  EntityStaticPermissionEnum,
  EventTriggerEnum,
  EventTypeEnum,
  IEventReadDto,
  IMicroFrontendReadDto,
  ITheme,
  IShippingMethodReadDto,
} from "roottypes";
import FormikInputSelect from "../../../fundamentalComponents/formikInputs/formikInputSelect";
import Input from "../../../fundamentalComponents/inputs/input";
import Textarea from "../../../fundamentalComponents/inputs/textarea/Textarea";
import EntityEditorEcommerceAddons from "./entityEditorEcommerceAddons";
import useGetUsersByIds from "../../../../hooks/apiHooks/useGetUsersByIds";
import ConfirmationModal from "../../../fundamentalComponents/confirmationModal";
import useGenerateVariations from "../../../../hooks/apiHooks/useGenerateVariations";

export interface IEntityFieldValueForm {
  fieldId: string;
  value: string;
  selectedExistingFiles?: IFileReadDto[];
  newFiles?: File[];

  tableValues: IEntityTableFieldCaseValueCommand[];
  yearTableValues: IEntityYearTableFieldRowValuesCommand[];

  // The combined result of selectedExistingFiles and newFiels after uploading the newFiles
  files?: IFileReadDto[];
}

export interface IEntityEditorFormFormik {
  modelId: string;
  entityFieldValues: IEntityFieldValueForm[];
  assignedUsers: IUserReadDto[];
  availableShippingMethodsIds: string[];
  language: string;
}

export interface IErroredField {
  modelField: IModelField;
  errorText: string;
}

export interface IEntityEditorFormProps {
  entity?: IEntityReadDto;
  modelId?: string;
  readOnly?: boolean;
  handleCloseEditor?: () => void;
  withoutTitle?: boolean;
  withoutLanguage?: boolean;
  withoutUserAssignment?: boolean;
  automaticallyAssignedUsers?: IUserReadDto[];

  orderAssociationConfig?: {
    orderId: string;
    productId?: string;
  };
}

const EntityEditorForm: React.FunctionComponent<IEntityEditorFormProps> = (
  props: IEntityEditorFormProps
) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.entities
  );
  const model: IModelReadDto | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const roles: IRoleReadDto[] = useAppSelector((state) => state.role.roles);

  //#region Local state
  const [uploadFilesLoading, setUploadFilesLoading] =
    React.useState<boolean>(false);
  const [erroredFields, setErroredFields] = React.useState<IErroredField[]>([]);
  const [
    generateVariationsConfirmationModalOpen,
    setGenerateVariationsConfirmationOpen,
  ] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createEntity, loading: createLoading } = useCreateEntity();
  const { updateEntity, loading: updateLoading } = useUpdateEntity();
  const axios = useAxios();
  const navigate = useNavigate();
  const { handleSearchUsersByRolePromise } = useSearchUsersByRole();
  const { generateVariations, loading: generateVariationsLoading } =
    useGenerateVariations();

  const formik: FormikProps<IEntityEditorFormFormik> =
    useFormik<IEntityEditorFormFormik>({
      initialValues: {
        modelId:
          props.modelId || (props.entity?.model as IModelReadDto)._id || "",
        entityFieldValues: [],
        language,
        assignedUsers: [],
        availableShippingMethodsIds: [],
      },
      validationSchema: Yup.object().shape({
        entityFieldValues: Yup.mixed().test(
          "entity fields validation",
          "",
          (entityFieldValues: IEntityFieldValueForm[]) => {
            let allValid: boolean = true;
            const newErroredFields: IErroredField[] = [];
            model?.modelFields.forEach((modelField: IModelField) => {
              let fieldValid: boolean = true;
              const entityFieldValue = entityFieldValues.find(
                (e) => e.fieldId === (modelField.field as IFieldReadDto)._id
              );
              if (modelField.required) {
                if (!entityFieldValue) {
                  fieldValid = false;
                } else {
                  if (
                    (modelField.field as IFieldReadDto).type ===
                    FieldTypeEnum.File
                  ) {
                    if (
                      (!entityFieldValue.newFiles ||
                        entityFieldValue.newFiles.length === 0) &&
                      (!entityFieldValue.selectedExistingFiles ||
                        entityFieldValue.selectedExistingFiles.length === 0)
                    ) {
                      fieldValid = false;
                    }
                  } else {
                    if (
                      entityFieldValue.value === null ||
                      entityFieldValue.value === undefined ||
                      entityFieldValue.value === ""
                    ) {
                      fieldValid = false;
                    }
                  }
                  if (
                    (modelField.field as IFieldReadDto).type ===
                    FieldTypeEnum.IFrame
                  ) {
                    if (!isValidUrl(entityFieldValue.value)) {
                      fieldValid = false;
                    }
                  }
                }
                if (!fieldValid) {
                  newErroredFields.push({
                    errorText:
                      getTranslatedText(
                        (modelField.field as IFieldReadDto).name
                      ) +
                      ": " +
                      getTranslatedText(staticText?.required),
                    modelField,
                  });
                }
              }
              if (
                (modelField.field as IFieldReadDto).type ===
                  FieldTypeEnum.IFrame &&
                Boolean(entityFieldValue?.value) &&
                !isValidUrl(entityFieldValue?.value)
              ) {
                fieldValid = false;
                newErroredFields.push({
                  errorText:
                    getTranslatedText(
                      (modelField.field as IFieldReadDto).name
                    ) +
                    ": " +
                    getTranslatedText(staticText?.mustBeValidUrl),
                  modelField,
                });
              }

              allValid = allValid && fieldValid;
            });
            setErroredFields(newErroredFields);
            return allValid;
          }
        ),
      }),
      onSubmit: async (values: IEntityEditorFormFormik) => {
        setUploadFilesLoading(true);

        const uploadNewFilesPromises: Promise<IFileReadDto[]>[] = [];

        // preparing the files by uploading the new files and combining the new files and the selected own files into one array
        values.entityFieldValues.forEach(async (entityFieldValue) => {
          entityFieldValue.files = [
            ...(entityFieldValue.selectedExistingFiles || []),
          ];

          const promise = new Promise<IFileReadDto[]>(async (resolve, _) => {
            if (
              entityFieldValue.newFiles &&
              entityFieldValue.newFiles.length > 0
            ) {
              const newFiles: IFileReadDto[] = await uploadFiles(
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

        let createdOrUpdateEntity: IEntityReadDto | null = null;

        if (props.entity) {
          const command: IEntityUpdateCommand = {
            _id: props.entity._id,
            entityFieldValues: values.entityFieldValues.map((e) => ({
              fieldId: e.fieldId,
              files: e.files || [],
              value: e.value,
              tableValues: e.tableValues,
              yearTableValues: e.yearTableValues,
            })),
            assignedUsersIds: values.assignedUsers.map((u) => u._id),
            language: values.language,
            modelId: values.modelId,
            availableShippingMethodsIds:
              formik.values.availableShippingMethodsIds,
            orderAssociationConfig: props.orderAssociationConfig,
          };

          createdOrUpdateEntity = await updateEntity(command);
        } else {
          const command: IEntityCreateCommand = {
            entityFieldValues: values.entityFieldValues.map((e) => ({
              fieldId: e.fieldId,
              files: e.files || [],
              value: e.value,
              tableValues: e.tableValues,
              yearTableValues: e.yearTableValues,
            })),
            assignedUsersIds: values.assignedUsers.map((u) => u._id),
            language: values.language,
            modelId: values.modelId,
            availableShippingMethodsIds:
              formik.values.availableShippingMethodsIds,
            orderAssociationConfig: props.orderAssociationConfig,
          };

          createdOrUpdateEntity = await createEntity(command);
        }

        if (props.handleCloseEditor) {
          props.handleCloseEditor();
        }

        // Model events trigger
        model?.modelEvents
          ?.filter(
            (modelEvent) =>
              (modelEvent.eventTrigger === EventTriggerEnum.OnCreate &&
                !props.entity) ||
              (modelEvent.eventTrigger === EventTriggerEnum.OnUpdate &&
                Boolean(props.entity))
          )
          .forEach((modelEvent) => {
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

              case EventTypeEnum.MicroFrontendRedirection: {
                if ((modelEvent.microFrontend as IMicroFrontendReadDto)?._id) {
                  navigate(
                    "/microFrontend/" +
                      (modelEvent.microFrontend as IMicroFrontendReadDto)?._id +
                      "/" +
                      (
                        (modelEvent.microFrontend as IMicroFrontendReadDto)
                          .components as IMicroFrontendComponentReadDto[]
                      ).find(
                        (component) =>
                          component._id.toString() ===
                          modelEvent.microFrontendComponentId
                      )?.name
                  );
                }
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
            const entityFieldValue: IEntityFieldValueReadDto | undefined =
              props.entity?.entityFieldValues.find(
                (entityFieldValue) =>
                  (entityFieldValue.field as IFieldReadDto)._id ===
                  (modelField.field as IFieldReadDto)._id
              );

            const entityFieldValueForm: IEntityFieldValueForm = {
              fieldId: (modelField.field as IFieldReadDto)._id,
              selectedExistingFiles: entityFieldValue?.files as IFileReadDto[],
              value: getTranslatedText(
                entityFieldValue?.value,
                formik.values.language
              ),
              tableValues:
                entityFieldValue?.tableValues?.map((tableValue) => ({
                  columnId: (tableValue.column as IFieldTableElementReadDto)
                    ._id,
                  rowId: (tableValue.row as IFieldTableElementReadDto)._id,
                  value: getTranslatedText(
                    tableValue.value,
                    formik.values.language
                  ),
                })) || [],
              yearTableValues:
                entityFieldValue?.yearTableValues?.map((yearTableValue) => ({
                  rowId: (yearTableValue.row as IFieldTableElementReadDto)._id,
                  values: yearTableValue.values.map((yearTableValue) => ({
                    year: yearTableValue.year,
                    value: getTranslatedText(
                      yearTableValue.value,
                      formik.values.language
                    ),
                  })),
                })) || [],
            };
            return entityFieldValueForm;
          }) || [],
        assignedUsers: (props.entity?.assignedUsers as IUserReadDto[]) || [],
        modelId:
          props.modelId || (props.entity?.model as IModelReadDto)._id || "",
        availableShippingMethodsIds:
          (
            props.entity?.availableShippingMethods as
              | IShippingMethodReadDto[]
              | undefined
          )?.map((s) => s._id) || [],
        language: formik.values.language,
      },
    });
  }, [props.entity, formik.values.language, model]);

  // Loading automatically assigned users
  React.useEffect(() => {
    if (
      props.automaticallyAssignedUsers &&
      props.automaticallyAssignedUsers.length > 0
    ) {
      formik.setFieldValue("assignedUsers", props.automaticallyAssignedUsers);
    }
  }, [props.automaticallyAssignedUsers]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleGenerateVariations = () => {
    if (props.entity?._id) {
      generateVariations(props.entity?._id.toString()).then(() =>
        setGenerateVariationsConfirmationOpen(false)
      );
    }
  };

  //#endregion Event listeners

  const loading =
    (props.entity ? updateLoading : createLoading) || uploadFilesLoading;

  const rolesToWhichCurrentUserCanAssign = roles.filter((role) => {
    if (user.superRole === SuperRoleEnum.SuperAdmin) {
      return true;
    }

    const userPermissionsOnEntity: IEntityPermissionReadDto | undefined = (
      (user.role as IRoleReadDto)
        ?.entityPermissions as IEntityPermissionReadDto[]
    ).find(
      (e) => (e.model as IModelReadDto)._id.toString() === model?._id.toString()
    );

    if (!userPermissionsOnEntity) {
      return false;
    } else {
      if (
        userPermissionsOnEntity.entityUserAssignmentPermissionsByRole
          ?.canAssignToUserFromSameRole &&
        role._id.toString() === (user.role as IRoleReadDto)?._id.toString()
      ) {
        return true;
      } else {
        return (
          userPermissionsOnEntity.entityUserAssignmentPermissionsByRole
            ?.otherRoles as IRoleReadDto[]
        ).some((otherRole) => otherRole._id.toString() === role._id.toString());
      }
    }
  });
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.createEntityForm}
      data-cy="entityEditorForm"
    >
      {createPortal(
        <ConfirmationModal
          description={
            getTranslatedText(staticText?.numberOfVariationsToGenerate) +
            ": " +
            model?.modelFields.reduce(
              (acc, modelField) =>
                acc *
                (modelField.isVariation
                  ? (modelField.field as IFieldReadDto).options?.length || 1
                  : 1),
              1
            )
          }
          loading={generateVariationsLoading}
          modalOpen={generateVariationsConfirmationModalOpen}
          onConfirm={handleGenerateVariations}
          setModalOpen={setGenerateVariationsConfirmationOpen}
          theme={theme}
          title={getTranslatedText(staticText?.generateVariations)}
        />,
        document.body
      )}

      {!props.readOnly && !props.withoutTitle && (
        <div className={styles.createEntityHeader}>
          <h2 className={styles.createEntityTitle}>
            {props.entity
              ? getTranslatedText(staticText?.updateEntity) + " "
              : getTranslatedText(staticText?.createEntity) + " "}
            {getTranslatedText(model?.name)}
          </h2>

          {props.handleCloseEditor && (
            <ImCross
              onClick={props.handleCloseEditor}
              className={styles.closeButton}
            />
          )}
        </div>
      )}

      {model?.modelFields.map((modelField, modelFieldIndex) => {
        // Check if we can show the field based on role field permissions first:
        const foundFieldPermissions = (
          (user.role as IRoleReadDto)?.entityPermissions as
            | IEntityPermissionReadDto[]
            | undefined
        )
          ?.find(
            (entityPermission) =>
              (entityPermission.model as IModelReadDto)._id === props.modelId
          )
          ?.entityFieldPermissions.find(
            (entityFieldPermission) =>
              (entityFieldPermission.field as IFieldReadDto)._id ===
              (modelField.field as IFieldReadDto)._id
          );

        if (
          // By default, if we don't find the field permission in the db for the role, then all the permissions should apply
          foundFieldPermissions &&
          foundFieldPermissions.permissions.indexOf(
            EntityStaticPermissionEnum.Read
          ) === -1 &&
          user.superRole !== SuperRoleEnum.SuperAdmin
        ) {
          return null;
        }

        // Check if we can edit
        const canEdit =
          !props.readOnly &&
          (foundFieldPermissions === undefined ||
            foundFieldPermissions?.permissions.indexOf(
              EntityStaticPermissionEnum.Update
            ) !== -1 ||
            user.superRole === SuperRoleEnum.SuperAdmin);

        // Check if we can show the field based on conditions second
        const conditionsMet: boolean = areEntityFieldConditionsMet({
          modelField,
          entityFieldValuesFromForm: formik.values.entityFieldValues,
          model,
          getTranslatedText: getTranslatedText,
          entity: props.entity,
        });

        if (!conditionsMet) return null;

        const entityFieldValue: IEntityFieldValueForm | undefined =
          formik.values.entityFieldValues.find(
            (el) => el.fieldId === (modelField.field as IFieldReadDto)._id
          );

        const value = entityFieldValue?.value;

        const handleOnChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          formik.setFieldValue(
            "entityFieldValues",
            formik.values.entityFieldValues.map((entityFieldValue) => {
              if (
                entityFieldValue.fieldId ===
                (modelField.field as IFieldReadDto)._id
              ) {
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
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.Text ||
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.Number ||
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.IFrame
        ) {
          return (
            <React.Fragment key={modelFieldIndex}>
              <Input
                theme={theme}
                Icon={MdTextFields}
                name="entityFieldValues"
                value={value}
                label={getTranslatedText(
                  (modelField.field as IFieldReadDto).name
                )}
                onChange={handleOnChange}
                inputProps={{
                  disabled: !canEdit,
                  placeholder: getTranslatedText(
                    (modelField.field as IFieldReadDto).name
                  ),
                  type:
                    (modelField.field as IFieldReadDto).type ===
                    FieldTypeEnum.Number
                      ? "number"
                      : "text",
                }}
                error={
                  (Boolean(formik.touched.entityFieldValues) &&
                    erroredFields.find(
                      (erroredField) =>
                        (erroredField.modelField.field as IFieldReadDto)._id ===
                        (modelField.field as IFieldReadDto)._id
                    )?.errorText) ||
                  ""
                }
                inputDataCy={
                  "entityFieldInputForField" +
                  (modelField.field as IFieldReadDto)._id.toString()
                }
                inputErrorDataCy={
                  "entityFieldInputErrorForField" +
                  (modelField.field as IFieldReadDto)._id.toString()
                }
              />
              {(modelField.field as IFieldReadDto).type ===
                FieldTypeEnum.IFrame &&
                isValidUrl(value) && (
                  <iframe
                    src={value + "&output=embed"}
                    className={styles.fieldIframe}
                  ></iframe>
                )}
            </React.Fragment>
          );
        }

        if (
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.Paragraph
        ) {
          return (
            <Textarea
              theme={theme}
              key={modelFieldIndex}
              value={value}
              label={getTranslatedText(
                (modelField.field as IFieldReadDto).name
              )}
              onChange={handleOnChange}
              textareaProps={{
                disabled: !canEdit,
                placeholder: getTranslatedText(
                  (modelField.field as IFieldReadDto).name
                ),
              }}
            />
          );
        }

        if ((modelField.field as IFieldReadDto).type === FieldTypeEnum.File) {
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

        if (
          (modelField.field as IFieldReadDto).type === FieldTypeEnum.Selector
        ) {
          const options =
            (modelField.field as IFieldReadDto).options?.map((op) => ({
              label: getTranslatedText(op.label),
              value: op.value,
            })) || [];
          return (
            <InputSelect
              theme={theme}
              key={modelFieldIndex}
              label={getTranslatedText(
                (modelField.field as IFieldReadDto).name
              )}
              options={
                (modelField.field as IFieldReadDto).options?.map((op) => ({
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
              placeholder={getTranslatedText(
                (modelField.field as IFieldReadDto).name
              )}
              disabled={!canEdit}
              onChange={(option: IInputSelectOption) => {
                formik.setFieldValue(
                  "entityFieldValues",
                  formik.values.entityFieldValues.map((entityFieldValue) => {
                    if (
                      entityFieldValue.fieldId ===
                      (modelField.field as IFieldReadDto)._id
                    ) {
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
              error={
                (Boolean(formik.touched.entityFieldValues) &&
                  erroredFields.find(
                    (erroredField) =>
                      (erroredField.modelField.field as IFieldReadDto)._id ===
                      (modelField.field as IFieldReadDto)._id
                  )?.errorText) ||
                ""
              }
            />
          );
        }
        if ((modelField.field as IFieldReadDto).type === FieldTypeEnum.Table) {
          return (
            <EntityEditorTableField
              key={modelFieldIndex}
              canEdit={canEdit}
              entityFieldValue={entityFieldValue}
              modelField={modelField}
              formik={formik}
              modelId={props.modelId}
            />
          );
        }
        if ((modelField.field as IFieldReadDto).type === FieldTypeEnum.Button) {
          return (
            <Button
              theme={theme}
              key={modelFieldIndex}
              style={{
                width: 300,
                margin: "auto",
                marginBottom: 20,
                height: 100,
                paddingTop: 25,
                paddingBottom: 25,
              }}
              onClick={async (
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
                (modelField.field as IFieldReadDto).fieldEvents
                  .filter(
                    (fieldEvent) =>
                      fieldEvent.eventTrigger === EventTriggerEnum.OnClick
                  )
                  .forEach(async (fieldEvent: IEventReadDto) => {
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
                      case EventTypeEnum.MicroFrontendRedirection: {
                        if (
                          (fieldEvent.microFrontend as IMicroFrontendReadDto)
                            ?._id &&
                          props.entity
                        ) {
                          navigate(
                            "/microFrontend/" +
                              (
                                fieldEvent.microFrontend as IMicroFrontendReadDto
                              )?._id +
                              "/" +
                              props.entity._id +
                              "/" +
                              (
                                (
                                  fieldEvent.microFrontend as IMicroFrontendReadDto
                                ).components as IMicroFrontendComponentReadDto[]
                              ).find(
                                (el) =>
                                  el._id.toString() ===
                                  fieldEvent.microFrontendComponentId
                              )?.name +
                              "/" +
                              (modelField.field as IFieldReadDto)._id.toString()
                          );

                          if (props.handleCloseEditor) {
                            props.handleCloseEditor();
                          }
                        }
                      }
                    }
                  });
              }}
            >
              {getTranslatedText((modelField.field as IFieldReadDto).name)}
            </Button>
          );
        }
      })}

      {!props.withoutLanguage && (
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
          selectorClassName="entityFormLanguageSelector"
        />
      )}

      {props.entity?.owner && (
        <div className={styles.createdBy}>
          {getTranslatedText(staticText?.owner) + ": "}
          {(props.entity.owner as IUserReadDto).firstName +
            " " +
            (props.entity.owner as IUserReadDto).lastName}
        </div>
      )}

      {!props.withoutUserAssignment &&
        rolesToWhichCurrentUserCanAssign.length > 0 && (
          <h3 className={styles.userAssignmentTitle}>
            {getTranslatedText(staticText?.userAssignment)}
          </h3>
        )}
      {!props.withoutUserAssignment &&
        rolesToWhichCurrentUserCanAssign.map((role: IRoleReadDto) => {
          return (
            <div
              key={role._id}
              className={styles.assignedUsersByRoleInputContainer}
            >
              <SearchInput
                theme={theme}
                searchPromise={handleSearchUsersByRolePromise(
                  role._id.toString()
                )}
                label={getTranslatedText(role?.name) + ":"}
                getElementTitle={(user: IUserReadDto) =>
                  user.firstName + " " + user.lastName
                }
                inputProps={{
                  placeholder: getTranslatedText(staticText?.searchUsers),
                  disabled: Boolean(props.readOnly),
                }}
                onElementClick={(user: IUserReadDto) => {
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
                inputDataCy={"searchUserToAssignForRole" + role._id.toString()}
              />

              {formik.values.assignedUsers
                .filter(
                  (u) =>
                    (u.role as IRoleReadDto)?._id.toString() ===
                    role._id.toString()
                )
                .map((user: IUserReadDto) => {
                  return (
                    <div
                      key={user._id}
                      className={styles.assignedUsersByRoleContainer}
                    >
                      <MdDelete
                        onClick={() => {
                          formik.setFieldValue(
                            "assignedUsers",
                            formik.values.assignedUsers.filter(
                              (u) => u._id !== user._id
                            )
                          );
                        }}
                        className={styles.deleteAssignedUserIcon}
                      />
                      <UserProfilePicture
                        theme={theme}
                        url={(user.profilePicture as IFileReadDto)?.url}
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

      {props.entity && props.modelId && (
        <EntityEditorStates entity={props.entity} modelId={props.modelId} />
      )}

      {model?.isForSale && props.entity && (
        <EntityEditorEcommerceAddons
          entity={props.entity}
          model={model}
          formik={formik}
          readOnly={Boolean(props.readOnly)}
        />
      )}

      {/* Errored fields error text */}
      {formik.touched.entityFieldValues && erroredFields.length > 0 && (
        <span className={styles.erroredFields}>
          {erroredFields
            .map((erroredField) => getTranslatedText(erroredField.errorText))
            .join(", ")}
        </span>
      )}

      {!loading &&
        !props.readOnly &&
        props.entity &&
        model?.modelFields.some((f) => f.isVariation) && (
          <Button
            theme={theme}
            type="button"
            onClick={() => setGenerateVariationsConfirmationOpen(true)}
            style={{ marginTop: 5 }}
          >
            {getTranslatedText(staticText?.generateVariations)}
          </Button>
        )}

      {!loading && !props.readOnly && (
        <Button
          theme={theme}
          disabled={loading}
          type="submit"
          style={{}}
          className={styles.button}
          buttonDataCy="entityFormSubmitButton"
        >
          {props.entity
            ? getTranslatedText(staticText?.updateEntity) + " "
            : getTranslatedText(staticText?.createEntity) + " "}
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
