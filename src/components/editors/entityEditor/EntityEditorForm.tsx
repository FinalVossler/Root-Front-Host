import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import { MdTextFields } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import useStyles from "./entityEditor.styles";
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
import {
  IModel,
  IModelField,
  ModelFieldConditionTypeEnum,
} from "../../../store/slices/modelSlice";
import { FieldType } from "../../../store/slices/fieldSlice";
import Input from "../../input";
import Textarea from "../../textarea";
import IFile from "../../../globalTypes/IFile";
import EntityFieldFiles from "./entityFieldFiles";
import uploadFiles from "../../../utils/uploadFiles";
import { Option } from "../../inputSelect/InputSelect";
import { IUser } from "../../../store/slices/userSlice";
import { StaticPermission } from "../../../store/slices/roleSlice";
import useAxios from "../../../hooks/useAxios";
import { EventTypeEnum } from "../../../globalTypes/IEvent";

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
  const formik: FormikProps<IEntityEditorFormForm> =
    useFormik<IEntityEditorFormForm>({
      initialValues: {
        modelId: props.modelId || props.entity?.model._id || "",
        entityFieldValues: [],
        language,
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
              let bodyData: any = {};
              if (modelEvent.requestDataIsCreatedEntity) {
                bodyData = createdOrUpdateEntity;
              } else {
                try {
                  bodyData = JSON.parse(modelEvent.requestData);
                } catch (e) {
                  bodyData = {};
                }
              }
              const headers = {};
              modelEvent.requestHeaders.map((header) => {
                headers[header.key] = header.value;
              });
              axios.request({
                url: modelEvent.requestUrl,
                method: modelEvent.requestMethod,
                data: bodyData,
                headers,
              });
            }
          }
        });
      },
    });

  //#region Effects
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
        modelId: props.modelId || props.entity?.model._id || "",
        language: formik.values.language,
      },
    });
  }, [props.entity, formik.values.language, model]);
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

      {model?.modelFields.map((modelField, index) => {
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
        if (modelField.conditions && modelField.conditions?.length > 0) {
          let conditionsMet: boolean = true;

          modelField.conditions.forEach((condition) => {
            const efv: IEntityFieldValueForm | undefined =
              formik.values.entityFieldValues.find(
                (entityFieldValue) =>
                  entityFieldValue.fieldId === condition.field?._id
              );

            if (!efv?.value) {
              conditionsMet = false;
            }
            if (efv) {
              switch (condition.conditionType) {
                case ModelFieldConditionTypeEnum.Equal:
                  if (efv.value !== condition.value) {
                    conditionsMet = false;
                  }
                  break;
                case ModelFieldConditionTypeEnum.InferiorTo: {
                  if (efv.value >= condition.value) {
                    conditionsMet = false;
                  }
                  break;
                }
                case ModelFieldConditionTypeEnum.SuperiorTo: {
                  if (efv.value <= condition.value) {
                    conditionsMet = false;
                  }
                  break;
                }
                case ModelFieldConditionTypeEnum.InferiorOrEqualTo: {
                  if (efv.value > condition.value) {
                    conditionsMet = false;
                  }
                  break;
                }
                case ModelFieldConditionTypeEnum.SuperiorOrEqualTo: {
                  if (efv.value < condition.value) {
                    conditionsMet = false;
                  }
                  break;
                }
                case ModelFieldConditionTypeEnum.ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear: {
                  if (condition.field?.type !== FieldType.Number) {
                    conditionsMet = false;
                  }
                  const currentYear: number = new Date().getFullYear();

                  if (
                    condition.value < currentYear ||
                    currentYear + parseInt(efv.value) <
                      parseInt(condition.value.toString())
                  ) {
                    conditionsMet = false;
                  }
                  break;
                }
              }
            } else {
              conditionsMet = false;
            }
          });

          if (!conditionsMet) return null;
        }

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
              key={index}
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
              key={index}
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
              key={index}
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
              key={index}
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
