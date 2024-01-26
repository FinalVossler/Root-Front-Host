import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./modelEditor.styles";
import Modal from "../../modal";
import { ITheme } from "../../../config/theme";
import Button from "../../button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useCreateModel from "../../../hooks/apiHooks/useCreateModel";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import { IModelField } from "../../../store/slices/modelSlice";
import useUpdateModel from "../../../hooks/apiHooks/useUpdateModel";
import ModelFieldsEditor from "./modelFieldsEditor";
import EventsEditor from "../eventsEditor";
import ModelStatesEditor from "./modelStatesEditor";
import uuid from "react-uuid";
import {
  EventTriggerEnum,
  EventTypeEnum,
  IEventReadDto,
  IEventRequestHeaderReadDto,
  IFieldReadDto,
  IMicroFrontendReadDto,
  IModelCreateCommand,
  IModelReadDto,
  IModelStateReadDto,
  IModelUpdateCommand,
  ModelStateTypeEnum,
} from "roottypes";
import { editorSlice } from "../../../store/slices/editorSlice";

export type ModelFormState = {
  _id?: string;
  name: string;
  stateType: ModelStateTypeEnum;
  exclusive: boolean;
  language: string;

  // used for frontend sorting only
  uuid: string;
};

export interface IModelForm {
  name: string;
  modelFields: IModelField[];
  modelEvents: IEventReadDto[];
  states: ModelFormState[];
  subStates: ModelFormState[];
  language: string;
}

export interface IModelEditorProps {
  model?: IModelReadDto;
  id: string;
}

const ModelEditor = (props: IModelEditorProps) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.models
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { createModel, loading: createLoading } = useCreateModel();
  const { updateModel, loading: updateLoading } = useUpdateModel();
  const formik: FormikProps<IModelForm> = useFormik<IModelForm>({
    initialValues: {
      name: "",
      modelFields: [],
      language,
      modelEvents: [],
      states: [],
      subStates: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        getTranslatedText(staticText?.nameIsRequired)
      ),
    }),
    onSubmit: async (values: IModelForm) => {
      if (props.model) {
        const command: IModelUpdateCommand = {
          _id: props.model._id,
          name: values.name,
          modelFields:
            values.modelFields.map((modelField) => ({
              fieldId: (modelField.field as IFieldReadDto)._id || "",
              required: modelField.required,
              conditions:
                modelField.conditions?.map((condition) => ({
                  fieldId: (condition.field as IFieldReadDto)?._id || "",
                  conditionType: condition.conditionType,
                  value: condition.value ?? "",
                  modelStateId: (condition.modelState as IModelStateReadDto)
                    ?._id,
                })) || [],
              modelStatesIds:
                (modelField.states as IModelStateReadDto[])?.map(
                  (el) => el._id
                ) || [],
              mainField: modelField.mainField || false,
              stickInTable: modelField.stickInTable || false,
            })) || [],
          modelEvents: values.modelEvents.map((modelEvent) => ({
            eventTrigger: modelEvent.eventTrigger,
            eventType: modelEvent.eventType,
            redirectionToSelf: modelEvent.redirectionToSelf,
            redirectionUrl: modelEvent.redirectionUrl,
            requestMethod: modelEvent.requestMethod,
            requestUrl: modelEvent.requestUrl,
            requestDataIsCreatedEntity: modelEvent.requestDataIsCreatedEntity,
            requestData: modelEvent.requestData,
            requestHeaders: modelEvent.requestHeaders,
            microFrontendId: (modelEvent.microFrontend as IMicroFrontendReadDto)
              ?._id,
            microFrontendComponentId: modelEvent.microFrontendComponentId,
          })),
          states: values.states.map((state) => ({
            exclusive: state.exclusive,
            language: values.language,
            name: state.name,
            stateType: state.stateType,
            _id: state._id,
          })),
          subStates: values.subStates.map((state) => ({
            exclusive: state.exclusive,
            language: values.language,
            name: state.name,
            stateType: state.stateType,
            _id: state._id,
          })),
          language: values.language,
        };

        await updateModel(command);
      } else {
        const command: IModelCreateCommand = {
          name: values.name,
          // @ts-ignore
          modelFields:
            values.modelFields.map((modelField) => ({
              fieldId: (modelField.field as IFieldReadDto)._id || "",
              required: modelField.required,
              conditions:
                modelField.conditions?.map((condition) => ({
                  fieldId: (condition.field as IFieldReadDto)?._id || "",
                  conditionType: condition.conditionType,
                  value: condition.value ?? "",
                  modelStateId: (condition.modelState as IModelStateReadDto)
                    ?._id,
                })) || [],
              modelStatesIds:
                (modelField.states as IModelStateReadDto[])?.map(
                  (el) => el._id
                ) || [],
              mainField: modelField.mainField || false,
              stickInTable: modelField.stickInTable || false,
            })) || [],
          modelEvents: values.modelEvents.map((modelEvent) => ({
            ...modelEvent,
            microFrontendId: (modelEvent.microFrontend as IMicroFrontendReadDto)
              ?._id,
          })),
          states: values.states.map((state) => ({
            exclusive: state.exclusive,
            language: values.language,
            name: state.name,
            stateType: state.stateType,
            _id: state._id,
          })),
          subStates: values.subStates.map((state) => ({
            exclusive: state.exclusive,
            language: values.language,
            name: state.name,
            stateType: state.stateType,
            _id: state._id,
          })),
          language: values.language,
        };

        await createModel(command);
      }

      dispatch(editorSlice.actions.removeEditor(props.id));
    },
  });

  //#region Effects
  // Initialize form based on model prop
  React.useEffect(() => {
    formik.resetForm({
      values: {
        name: getTranslatedText(props.model?.name, formik.values.language),
        modelFields:
          props.model?.modelFields.map((modelField) => ({
            ...modelField,
            field: { ...(modelField.field as IFieldReadDto) },
            conditions:
              modelField?.conditions?.map((condition) => ({
                value: condition.value,
                conditionType: condition.conditionType,
                field: condition.field,
                modelState: condition.modelState,
              })) || [],
          })) || [],
        modelEvents:
          props.model?.modelEvents?.map((modelEvent) => ({
            eventTrigger: modelEvent.eventTrigger || EventTriggerEnum.OnCreate,
            eventType: modelEvent.eventType || EventTypeEnum.ApiCall,
            redirectionToSelf: Boolean(modelEvent.redirectionToSelf),
            redirectionUrl: modelEvent.redirectionUrl || "",
            requestMethod: modelEvent.requestMethod || "POST",
            requestUrl: modelEvent.requestUrl || "",
            requestData: modelEvent.requestData || "",
            requestDataIsCreatedEntity: Boolean(
              modelEvent.requestDataIsCreatedEntity
            ),
            requestHeaders:
              [
                ...modelEvent.requestHeaders.map<IEventRequestHeaderReadDto>(
                  (header: IEventRequestHeaderReadDto) => ({
                    key: header.key,
                    value: header.value,
                  })
                ),
              ] || [],
          })) || [],
        states:
          props.model?.states?.map((modelState) => ({
            _id: (modelState as IModelStateReadDto)._id,
            language: formik.values.language,
            name: getTranslatedText(
              (modelState as IModelStateReadDto).name,
              formik.values.language
            ),
            stateType: (modelState as IModelStateReadDto).stateType,
            exclusive: Boolean((modelState as IModelStateReadDto).exlusive),
            uuid: uuid(),
          })) || [],
        subStates:
          props.model?.subStates?.map((modelSubState) => ({
            _id: (modelSubState as IModelStateReadDto)._id,
            language: formik.values.language,
            name: getTranslatedText(
              (modelSubState as IModelStateReadDto).name,
              formik.values.language
            ),
            stateType: (modelSubState as IModelStateReadDto).stateType,
            exclusive: Boolean((modelSubState as IModelStateReadDto).exlusive),
            uuid: uuid(),
          })) || [],
        language: formik.values.language,
      },
    });
  }, [props.model, formik.values.language]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    dispatch(editorSlice.actions.removeEditor(props.id));
  };

  const handleModelFieldsChange = (modelFields: IModelField[]) => {
    formik.setFieldValue("modelFields", modelFields);
  };
  //#endregion Event listeners

  const loading = props.model ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open>
      <form
        onSubmit={handleSubmit}
        className={styles.createModelModalContainer}
        data-cy="modelForm"
      >
        <div className={styles.createModelHeader}>
          <h2 className={styles.createModelTitle}>
            {props.model
              ? getTranslatedText(staticText?.updateModel)
              : getTranslatedText(staticText?.createModel)}
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
          inputDataCy="modelNameInput"
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
          selectorClassName="modelLanguageSelect"
        />

        <EventsEditor
          formik={formik}
          fieldName={"modelEvents"}
          activeTriggers={[
            EventTriggerEnum.OnCreate,
            EventTriggerEnum.OnUpdate,
          ]}
          defaultEventTriggerOnAdd={EventTriggerEnum.OnCreate}
        />

        <br />

        <ModelFieldsEditor
          model={props.model}
          setSelectedModelFields={handleModelFieldsChange}
          language={formik.values.language}
          formik={formik}
        />

        <br />

        <ModelStatesEditor formik={formik} />

        {!loading && (
          <Button
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
            buttonDataCy="submitModelButton"
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

export default React.memo(ModelEditor);
