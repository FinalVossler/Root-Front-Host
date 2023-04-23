import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import * as Yup from "yup";

import useStyles from "./modelEditor.styles";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import useCreateModel, {
  ModelCreateCommand,
} from "../../../hooks/apiHooks/useCreateModel";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";
import { IModel, IModelField } from "../../../store/slices/modelSlice";
import useUpdateModel, {
  ModelUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateModel";
import FieldsEditor from "../../fieldsEditor";

export interface IModelEditor {
  model?: IModel;
  open?: boolean;
  setOpen?: (boolean) => void;
}

interface IModelForm {
  name: string;
  modelFields: IModelField[];
  language: string;
}

const ModelEditor = (props: IModelEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.models
  );

  //#region Local state
  const [modelModalOpen, setModelModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createModel, loading: createLoading } = useCreateModel();
  const { updateModel, loading: updateLoading } = useUpdateModel();
  const formik: FormikProps<IModelForm> = useFormik<IModelForm>({
    initialValues: {
      name: "",
      modelFields: [],
      language,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        getTranslatedText(staticText?.nameIsRequired)
      ),
    }),
    onSubmit: async (values: IModelForm) => {
      if (props.model) {
        const command: ModelUpdateCommand = {
          _id: props.model._id,
          name: values.name,
          modelFields:
            values.modelFields.map((modelField) => ({
              fieldId: modelField.field._id || "",
              required: modelField.required,
              conditions:
                modelField.conditions?.map((condition) => ({
                  fieldId: condition.field?._id || "",
                  conditionType: condition.conditionType,
                  value: condition.value,
                })) || [],
            })) || [],
          language: values.language,
        };

        await updateModel(command);
      } else {
        const command: ModelCreateCommand = {
          name: values.name,
          modelFields:
            values.modelFields.map((modelField) => ({
              fieldId: modelField.field._id || "",
              required: modelField.required,
              conditions:
                modelField.conditions?.map((condition) => ({
                  fieldId: condition.field?._id || "",
                  conditionType: condition.conditionType,
                  value: condition.value,
                })) || [],
            })) || [],
          language: values.language,
        };

        await createModel(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setModelModalOpen(props.open);
    }
  }, [props.open]);
  React.useEffect(() => {
    formik.resetForm({
      values: {
        name: getTranslatedText(props.model?.name, formik.values.language),
        modelFields:
          props.model?.modelFields.map((modelField) => ({
            ...modelField,
            field: { ...modelField.field },
            conditions:
              modelField?.conditions?.map((condition) => ({
                value: condition.value,
                conditionType: condition.conditionType,
                field: condition.field,
              })) || [],
          })) || [],
        language: formik.values.language,
      },
    });
  }, [props.model, formik.values.language]);
  //#endregion Effects

  console.log("wtf", formik.values.modelFields);

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setModelModalOpen(false);
  };

  const handleModelFieldsChange = (modelFields: IModelField[]) => {
    formik.setFieldValue("modelFields", modelFields);
  };
  //#endregion Event listeners

  const loading = props.model ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open={modelModalOpen}>
      <form
        onSubmit={handleSubmit}
        className={styles.createModelModalContainer}
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

        <FieldsEditor
          model={props.model}
          setSelectedModelFields={handleModelFieldsChange}
          language={formik.values.language}
        />

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

export default React.memo(ModelEditor);
