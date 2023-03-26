import React from "react";
import "suneditor/dist/css/suneditor.min.css";
import { MdDriveFileRenameOutline, MdTitle } from "react-icons/md";
import ReactLoading from "react-loading";
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai";
import slugify from "slugify";

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
import { BiLabel } from "react-icons/bi";

export interface IFieldEditor {
  field?: IField;
  open?: boolean;
  setOpen?: (boolean) => void;
}

type FieldOptionForm = {
  label: string;
  value: string;
};

interface IFieldForm {
  name: string;
  type: IField["type"];
  language: string;
  options: FieldOptionForm[];
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
      options: [],
    },
    onSubmit: async (values: IFieldForm) => {
      if (props.field) {
        const command: FieldUpdateCommand = {
          _id: props.field._id,
          name: values.name,
          type: values.type,
          language: values.language,
          options: values.options,
        };

        await updateField(command);
      } else {
        const command: FieldCreateCommand = {
          name: values.name,
          type: values.type,
          language: values.language,
          options: values.options,
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

  React.useEffect(() => {
    // Initialize the form based on the language and the passed field to update
    formik.resetForm({
      values: {
        name: getTranslatedText(props.field?.name, formik.values.language),
        type: props.field?.type || FieldType.Text,
        language: formik.values.language,
        options:
          (props.field?.options &&
            props.field?.options.map((option) => ({
              label: getTranslatedText(option.label),
              value: option.value,
            }))) ||
          [],
      },
    });
  }, [props.field, formik.values.language]);

  React.useEffect(() => {
    // slugify the option name
    // only slufigy new options.
    // Old options need to keep their own slug so to not lose their values in entities
    const newOptions: FieldOptionForm[] = formik.values.options;

    if (newOptions.length > 0) {
      newOptions.forEach((option) => {
        if (
          !props.field?.options?.find((op) => op.value === option.value) ||
          option.value === ""
        ) {
          option.value = slugify(option.label.toLowerCase());
        }
      });

      formik.setFieldValue("options", newOptions);
    }
  }, [formik.values.options, props.field]);
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

  const handleAddOption = () => {
    formik.setFieldValue("options", [
      ...formik.values.options,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const handleDeleteOption = (option: FieldOptionForm) => {
    formik.setFieldValue(
      "options",
      formik.values.options.filter((op) => op.value !== option.value)
    );
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
            {props.field
              ? getTranslatedText(staticText?.updateField)
              : getTranslatedText(staticText?.createField)}
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
          name="type"
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

        {formik.values.type === FieldType.Selector && (
          <div className={styles.optionsContainer}>
            <span className={styles.addOptionButton} onClick={handleAddOption}>
              <AiOutlineAppstoreAdd className={styles.addOptionIcon} />{" "}
              {getTranslatedText(staticText?.addOption)}
            </span>

            {formik.values.options.map((option, index) => {
              return (
                <div key={index} className={styles.singleOptionContainer}>
                  <AiFillDelete
                    className={styles.deleteOptionButton}
                    onClick={() => handleDeleteOption(option)}
                  />
                  <Input
                    label={getTranslatedText(staticText?.label)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue(
                        "options",
                        formik.values.options.map((op, i) =>
                          i !== index
                            ? op
                            : {
                                label: e.target.value,
                                value: op.value,
                              }
                        )
                      );
                    }}
                    value={option.label}
                    Icon={BiLabel}
                  />
                  <Input
                    label={getTranslatedText(staticText?.namePlaceholder)}
                    value={option.value}
                    Icon={MdDriveFileRenameOutline}
                    inputProps={{
                      disabled: true,
                    }}
                    containerProps={{
                      style: {
                        marginBottom: 0,
                      },
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

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
