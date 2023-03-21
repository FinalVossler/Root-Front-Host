import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";

import useStyles from "./fieldEditor.styles";
import Modal from "../../modal";
import { Theme } from "../../../config/theme";
import Button from "../../button";
import { useAppSelector } from "../../../store/hooks";
import Input from "../../input";
import { ImCross } from "react-icons/im";
import { FormikProps, useFormik } from "formik";
import { FieldType, IField } from "../../../store/slices/fieldSlice";
import useCreateField, {
  FieldCreateCommand,
} from "../../../hooks/apiHooks/useCreateField";
import useUpdateField, {
  FieldUpdateCommand,
} from "../../../hooks/apiHooks/useUpdateField";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import InputSelect from "../../inputSelect";
import getLanguages from "../../../utils/getLanguages";

export interface IFieldEditor {
  field?: IField;
  open?: boolean;
  setOpen?: (boolean) => void;
}

interface IFieldForm {
  name: string;
  type: IField["type"];
  language: string;
}

const FieldEditor = (props: IFieldEditor) => {
  const language: string = useAppSelector(
    (state) => state.userPreferences.language
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration?.staticText?.fields
  );

  //#region Local state
  const [fieldModalOpen, setFieldModalOpen] = React.useState<boolean>(false);
  //#endregion Local state

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createField, loading: createLoading } = useCreateField();
  const { updateField, loading: updateLoading } = useUpdateField();
  const formik: FormikProps<IFieldForm> = useFormik<IFieldForm>({
    initialValues: {
      name: "",
      type: FieldType.Text,
      language,
    },
    onSubmit: async (values: IFieldForm) => {
      if (props.field) {
        const command: FieldUpdateCommand = {
          _id: props.field._id,
          name: values.name,
          type: values.type,
          language: values.language,
        };

        await updateField(command);
      } else {
        const command: FieldCreateCommand = {
          name: values.name,
          type: values.type,
        };

        await createField(command);
      }

      if (props.setOpen) {
        props.setOpen(false);
      }
    },
  });

  //#region Effects
  React.useEffect(() => {
    if (props.open !== undefined) {
      setFieldModalOpen(props.open);
    }
  }, [props.open]);
  //#endregion Effects

  //#region Event listeners
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = () => {
    if (props.setOpen) {
      props.setOpen(false);
    } else setFieldModalOpen(false);
  };
  //#endregion Event listeners

  const loading = props.field ? updateLoading : createLoading;
  return (
    <Modal handleClose={handleCloseModal} open={fieldModalOpen}>
      <form
        onSubmit={handleSubmit}
        className={styles.createFieldModalContainer}
      >
        <div className={styles.createFieldHeader}>
          <h2 className={styles.createFieldTitle}>
            {getTranslatedText(staticText?.createField)}
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
          options={Object.values(FieldType).map((el) => ({
            value: el,
            label: el,
          }))}
          formik={formik}
          label={getTranslatedText(staticText?.typePlaceholder)}
          value={{ value: formik.values.type, label: formik.values.type }}
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

export default React.memo(FieldEditor);
