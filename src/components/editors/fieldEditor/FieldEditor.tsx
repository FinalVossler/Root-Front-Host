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
import EventsEditor from "../eventsEditor/EventsEditor";
import { EventTriggerEnum, IEvent } from "../../../globalTypes/IEvent";
import FieldTableEditor from "./fieldTableEditor";
import uuid from "react-uuid";
import Checkbox from "../../checkbox";

export interface IFieldEditor {
  field?: IField;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

type FieldOptionForm = {
  label: string;
  value: string;
};

export type FieldTableElementForm = {
  _id?: string;
  name: string;
  language: string;

  uuid: string;
};

export interface IFieldForm {
  name: string;
  type: IField["type"];
  canChooseFromExistingFiles: boolean;
  options: FieldOptionForm[];
  fieldEvents: IEvent[];
  tableOptions: {
    name: string;
    columns: FieldTableElementForm[];
    rows: FieldTableElementForm[];
    yearTable: boolean;
  };
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
      canChooseFromExistingFiles: true,
      options: [],
      fieldEvents: [],
      tableOptions: {
        name: "",
        columns: [],
        rows: [],
        yearTable: false,
      },

      language,
    },
    onSubmit: async (values: IFieldForm) => {
      if (props.field) {
        const command: FieldUpdateCommand = {
          _id: props.field._id,
          name: values.name,
          type: values.type,
          canChooseFromExistingFiles: values.canChooseFromExistingFiles,
          language: values.language,
          options: values.options,
          fieldEvents: values.fieldEvents.map((event) => ({
            ...event,
            microFrontendId: event.microFrontend?._id,
          })),
          tableOptions: {
            name: values.tableOptions.name,
            columns: values.tableOptions.columns.map((c) => ({
              _id: c._id,
              language: values.language,
              name: c.name,
            })),
            rows: values.tableOptions.rows.map((r) => ({
              _id: r._id,
              language: values.language,
              name: r.name,
            })),
            yearTable: values.tableOptions.yearTable,
          },
        };

        await updateField(command);
      } else {
        const command: FieldCreateCommand = {
          name: values.name,
          type: values.type,
          canChooseFromExistingFiles: values.canChooseFromExistingFiles,
          language: values.language,
          options: values.options,
          fieldEvents: values.fieldEvents.map((e) => ({
            ...e,
            microFrontendId: e.microFrontend?._id,
          })),
          tableOptions: {
            name: values.name,
            columns: values.tableOptions.columns.map((c) => ({
              language: values.language,
              name: c.name,
            })),
            rows: values.tableOptions.rows.map((r) => ({
              language: values.language,
              name: r.name,
            })),
            yearTable: values.tableOptions.yearTable,
          },
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
        canChooseFromExistingFiles:
          props.field?.canChooseFromExistingFiles || false,
        options:
          (props.field?.options &&
            props.field?.options.map((option) => ({
              label: getTranslatedText(option.label),
              value: option.value,
            }))) ||
          [],
        fieldEvents: props.field?.fieldEvents || [],
        tableOptions: {
          name: getTranslatedText(props.field?.tableOptions?.name),
          columns:
            props.field?.tableOptions?.columns.map((c) => ({
              _id: c._id,
              language: formik.values.language,
              name: getTranslatedText(c.name, formik.values.language),
              uuid:
                formik.values.tableOptions.columns.find(
                  (c) => c._id?.toString() === c._id?.toString()
                )?.uuid || uuid(),
            })) || [],
          rows:
            props.field?.tableOptions?.rows.map((r) => ({
              _id: r._id,
              language: formik.values.language,
              name: getTranslatedText(r.name, formik.values.language),
              uuid:
                formik.values.tableOptions.rows.find(
                  (r) => r._id?.toString() === r._id?.toString()
                )?.uuid || uuid(),
            })) || [],
          yearTable: props.field?.tableOptions?.yearTable || false,
        },

        language: formik.values.language,
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
        data-cy="fieldForm"
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
          inputDataCy="fieldNameInput"
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
          selectorClassName="fieldTypeInputSelect"
        />

        {formik.values.type === FieldType.File && (
          <Checkbox
            label={getTranslatedText(staticText?.canChooseFromExistingFiles)}
            checked={formik.values.canChooseFromExistingFiles}
            name="canChooseFromExistingFiles"
            formik={formik}
          />
        )}

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

        <FieldTableEditor formik={formik} />

        {formik.values.type === FieldType.Button && (
          <EventsEditor
            fieldName="fieldEvents"
            formik={formik}
            activeTriggers={[EventTriggerEnum.OnClick]}
            defaultEventTriggerOnAdd={EventTriggerEnum.OnClick}
          />
        )}

        {!loading && (
          <Button
            disabled={loading}
            type="submit"
            style={{}}
            className={styles.button}
            buttonDataCy="submitFieldButton"
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
