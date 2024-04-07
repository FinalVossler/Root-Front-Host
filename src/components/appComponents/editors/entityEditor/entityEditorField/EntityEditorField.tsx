import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTextFields } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import {
  FieldTypeEnum,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IRoleReadDto,
  IUserReadDto,
  IEntityPermissionReadDto,
  SuperRoleEnum,
  IMicroFrontendComponentReadDto,
  EntityStaticPermissionEnum,
  EventTriggerEnum,
  EventTypeEnum,
  IEventReadDto,
  IMicroFrontendReadDto,
  ITheme,
  IModelFieldReadDto,
} from "roottypes";

import Button from "../../../../fundamentalComponents/button";
import { useAppSelector } from "../../../../../store/hooks";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import InputSelect from "../../../../fundamentalComponents/inputs/inputSelect";
import EntityFieldFiles from "../entityFieldFiles";
import useAxios from "../../../../../hooks/useAxios";
import areEntityFieldConditionsMet from "../../../../../utils/areEntityFieldConditionsMet";

import sendEventApiCall from "../../../../../utils/sendEventApiCall";
import EntityEditorTableField from "../entityEditorTableField";
import isValidUrl from "../../../../../utils/isValidUrl";
import Input from "../../../../fundamentalComponents/inputs/input";
import Textarea from "../../../../fundamentalComponents/inputs/textarea/Textarea";
import useGenerateVariations from "../../../../../hooks/apiHooks/useGenerateVariations";
import {
  IEntityEditorFormFormik,
  IEntityFieldValueForm,
  IErroredField,
} from "../EntityEditorForm";
import { IInputSelectOption } from "../../../../fundamentalComponents/inputs/inputSelect/InputSelect";

import useStyles from "./entityEditorField.styles";

export interface IEntityEditorFieldProps {
  formik: FormikProps<IEntityEditorFormFormik>;
  entity?: IEntityReadDto;
  modelId?: string;
  readOnly?: boolean;
  handleCloseEditor?: () => void;
  modelField: IModelFieldReadDto;
  erroredFields: IErroredField[];
}

const EntityEditorField: React.FunctionComponent<IEntityEditorFieldProps> = (
  props: IEntityEditorFieldProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector((state) =>
    state.model.models.find((m) => m._id === props.modelId)
  );
  const user: IUserReadDto = useAppSelector((state) => state.user.user);

  //#region Local state
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const axios = useAxios();
  const navigate = useNavigate();
  useGenerateVariations();

  //#region Effects

  //#endregion Effects

  //#region Event listeners
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.formik.setFieldValue(
      "entityFieldValues",
      props.formik.values.entityFieldValues.map((entityFieldValue) => {
        if (
          entityFieldValue.fieldId ===
          (props.modelField.field as IFieldReadDto)._id
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
  //#endregion Event listeners

  //#region View
  if (!model) {
    return null;
  }

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
        (props.modelField.field as IFieldReadDto)._id
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
    modelField: props.modelField,
    entityFieldValuesFromForm: props.formik.values.entityFieldValues,
    model,
    getTranslatedText: getTranslatedText,
    entity: props.entity,
  });

  if (!conditionsMet) return null;

  // Find the value of the field
  const entityFieldValue: IEntityFieldValueForm | undefined =
    props.formik.values.entityFieldValues.find(
      (el) => el.fieldId === (props.modelField.field as IFieldReadDto)._id
    );

  const value = entityFieldValue?.value;

  //#endregion View

  if (
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Text ||
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Number ||
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.IFrame
  ) {
    return (
      <React.Fragment>
        <Input
          theme={theme}
          Icon={MdTextFields}
          name="entityFieldValues"
          value={value}
          label={getTranslatedText(
            (props.modelField.field as IFieldReadDto).name
          )}
          onChange={handleOnChange}
          inputProps={{
            disabled: !canEdit,
            placeholder: getTranslatedText(
              (props.modelField.field as IFieldReadDto).name
            ),
            type:
              (props.modelField.field as IFieldReadDto).type ===
              FieldTypeEnum.Number
                ? "number"
                : "text",
          }}
          error={
            (Boolean(props.formik.touched.entityFieldValues) &&
              props.erroredFields.find(
                (erroredField) =>
                  (erroredField.modelField.field as IFieldReadDto)._id ===
                  (props.modelField.field as IFieldReadDto)._id
              )?.errorText) ||
            ""
          }
          inputDataCy={
            "entityFieldInputForField" +
            (props.modelField.field as IFieldReadDto)._id.toString()
          }
          inputErrorDataCy={
            "entityFieldInputErrorForField" +
            (props.modelField.field as IFieldReadDto)._id.toString()
          }
        />
        {(props.modelField.field as IFieldReadDto).type ===
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
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Text ||
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Number ||
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.IFrame
  ) {
    return (
      <React.Fragment>
        <Input
          theme={theme}
          Icon={MdTextFields}
          name="entityFieldValues"
          value={value}
          label={getTranslatedText(
            (props.modelField.field as IFieldReadDto).name
          )}
          onChange={handleOnChange}
          inputProps={{
            disabled: !canEdit,
            placeholder: getTranslatedText(
              (props.modelField.field as IFieldReadDto).name
            ),
            type:
              (props.modelField.field as IFieldReadDto).type ===
              FieldTypeEnum.Number
                ? "number"
                : "text",
          }}
          error={
            (Boolean(props.formik.touched.entityFieldValues) &&
              props.erroredFields.find(
                (erroredField) =>
                  (erroredField.modelField.field as IFieldReadDto)._id ===
                  (props.modelField.field as IFieldReadDto)._id
              )?.errorText) ||
            ""
          }
          inputDataCy={
            "entityFieldInputForField" +
            (props.modelField.field as IFieldReadDto)._id.toString()
          }
          inputErrorDataCy={
            "entityFieldInputErrorForField" +
            (props.modelField.field as IFieldReadDto)._id.toString()
          }
        />
        {(props.modelField.field as IFieldReadDto).type ===
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
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Paragraph
  ) {
    return (
      <Textarea
        theme={theme}
        value={value}
        label={getTranslatedText(
          (props.modelField.field as IFieldReadDto).name
        )}
        onChange={handleOnChange}
        textareaProps={{
          disabled: !canEdit,
          placeholder: getTranslatedText(
            (props.modelField.field as IFieldReadDto).name
          ),
        }}
      />
    );
  }

  if ((props.modelField.field as IFieldReadDto).type === FieldTypeEnum.File) {
    return (
      <EntityFieldFiles
        entityFieldValue={entityFieldValue}
        formik={props.formik}
        modelField={props.modelField}
        disabled={!canEdit}
      />
    );
  }

  if (
    (props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Selector
  ) {
    const options =
      (props.modelField.field as IFieldReadDto).options?.map((op) => ({
        label: getTranslatedText(op.label),
        value: op.value,
      })) || [];
    return (
      <InputSelect
        theme={theme}
        label={getTranslatedText(
          (props.modelField.field as IFieldReadDto).name
        )}
        options={
          (props.modelField.field as IFieldReadDto).options?.map((op) => ({
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
          (props.modelField.field as IFieldReadDto).name
        )}
        disabled={!canEdit}
        onChange={(option: IInputSelectOption) => {
          props.formik.setFieldValue(
            "entityFieldValues",
            props.formik.values.entityFieldValues.map((entityFieldValue) => {
              if (
                entityFieldValue.fieldId ===
                (props.modelField.field as IFieldReadDto)._id
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
          (Boolean(props.formik.touched.entityFieldValues) &&
            props.erroredFields.find(
              (erroredField) =>
                (erroredField.modelField.field as IFieldReadDto)._id ===
                (props.modelField.field as IFieldReadDto)._id
            )?.errorText) ||
          ""
        }
      />
    );
  }
  if ((props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Table) {
    return (
      <EntityEditorTableField
        canEdit={canEdit}
        entityFieldValue={entityFieldValue}
        modelField={props.modelField}
        formik={props.formik}
        modelId={props.modelId}
      />
    );
  }
  if ((props.modelField.field as IFieldReadDto).type === FieldTypeEnum.Button) {
    return (
      <Button
        theme={theme}
        style={{
          width: 300,
          margin: "auto",
          marginBottom: 20,
          height: 100,
          paddingTop: 25,
          paddingBottom: 25,
        }}
        onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          (props.modelField.field as IFieldReadDto).fieldEvents
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
                    (fieldEvent.microFrontend as IMicroFrontendReadDto)?._id &&
                    props.entity
                  ) {
                    navigate(
                      "/microFrontend/" +
                        (fieldEvent.microFrontend as IMicroFrontendReadDto)
                          ?._id +
                        "/" +
                        props.entity._id +
                        "/" +
                        (
                          (fieldEvent.microFrontend as IMicroFrontendReadDto)
                            .components as IMicroFrontendComponentReadDto[]
                        ).find(
                          (el) =>
                            el._id.toString() ===
                            fieldEvent.microFrontendComponentId
                        )?.name +
                        "/" +
                        (props.modelField.field as IFieldReadDto)._id.toString()
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
        {getTranslatedText((props.modelField.field as IFieldReadDto).name)}
      </Button>
    );
  }

  // At this point, we don't have any way of handling the field (break in the switch)
  return <React.Fragment></React.Fragment>;
};

export default React.memo(EntityEditorField);
