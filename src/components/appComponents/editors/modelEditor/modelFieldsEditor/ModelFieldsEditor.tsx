import React from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { useAppSelector } from "../../../../../store/hooks";
import SearchInput from "../../../../fundamentalComponents/inputs/searchInput";
import useSearchFields from "../../../../../hooks/apiHooks/useSearchFields";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";

import useStyles from "./modelFieldsEditor.styles";
import { IModelField } from "../../../../../store/slices/modelSlice";
import SortableModelField from "./sortableModelField";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { FormikProps } from "formik";
import { IModelForm } from "../ModelEditor";
import {
  IFieldReadDto,
  IModelReadDto,
  IModelSection,
  ITheme,
  ModelSectionDirectionEnum,
  ModelViewTypeEnum,
  SectionSpecialFieldEnum,
} from "roottypes";
import SectionsCreator from "../../../../fundamentalComponents/sectionsCreator";
import {
  ISection,
  ISectionsCreatorProps,
  SectionDirectionEnum,
} from "../../../../fundamentalComponents/sectionsCreator/SectionsCreator";
import { toast } from "react-toastify";
import { ISearchInputProps } from "../../../../fundamentalComponents/inputs/searchInput/SearchInput";
import FormikInputSelect from "../../../../fundamentalComponents/formikInputs/formikInputSelect";
import InputSelect from "../../../../fundamentalComponents/inputs/inputSelect";
import { IInputSelectOption } from "../../../../fundamentalComponents/inputs/inputSelect/InputSelect";

interface IFieldsEditorProps {
  setSelectedModelFields: (modelFields: IModelField[]) => any;
  model?: IModelReadDto;
  language?: string;
  formik: FormikProps<IModelForm>;
}

const ModelFieldsEditor: React.FunctionComponent<IFieldsEditorProps> = (
  props: IFieldsEditorProps
) => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [openFields, setOpenFields] = React.useState(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const {
    selectedModelFields,
    setSelectedModelFields,
    handleSearchFieldsPromise,
    handleDeleteModelField,
    handleSelectField,
  } = useSearchFields(props.model);

  React.useEffect(() => {
    props.setSelectedModelFields(selectedModelFields);
  }, [selectedModelFields]);

  //#region Event listeners
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedModelFields
        .map((modelField) => modelField.uuid)
        .indexOf(active.id as string);
      const newIndex = selectedModelFields
        .map((modelField) => modelField.uuid)
        .indexOf(over.id as string);

      const newselectedModelFields = arrayMove(
        selectedModelFields,
        oldIndex,
        newIndex
      );

      setSelectedModelFields(newselectedModelFields);
    }
  }
  const handleTriggerOpenFields = () => {
    setOpenFields(!openFields);
  };
  //#endregion Event listeners

  const fieldsViewOptions = [
    {
      label: getTranslatedText(staticText?.linear),
      value: ModelViewTypeEnum.LinearView,
    },
    {
      label: getTranslatedText(staticText?.sections),
      value: ModelViewTypeEnum.SectionView,
    },
  ];

  return (
    <div className={styles.fieldsEditorContainer}>
      <span
        onClick={handleTriggerOpenFields}
        data-cy="triggerModelFieldsShowing"
        className={styles.fieldsTitle}
      >
        {!openFields ? (
          <BsArrowDownShort className={styles.triggerArrow} />
        ) : (
          <BsArrowUpShort className={styles.triggerArrow} />
        )}{" "}
        {getTranslatedText(staticText?.fields)}
      </span>

      {openFields && (
        <SearchInput
          theme={theme}
          inputProps={{
            placeholder: getTranslatedText(staticText?.searchFields),
          }}
          searchPromise={handleSearchFieldsPromise}
          getElementTitle={(field: IFieldReadDto) =>
            getTranslatedText(field.name)
          }
          onElementClick={handleSelectField}
          inputDataCy="modelFieldsSearchFieldInput"
        />
      )}

      {openFields && (
        <div className={styles.fieldsContainer} data-cy="modelFieldsContainer">
          <InputSelect
            theme={theme}
            label={getTranslatedText(staticText?.viewType)}
            name="view"
            options={fieldsViewOptions}
            onChange={(viewOption) =>
              props.formik.setFieldValue("viewType", viewOption.value)
            }
            style={{ width: "100%" }}
            value={
              fieldsViewOptions.find(
                (el) => el.value === props.formik.values.viewType
              ) || fieldsViewOptions[0]
            }
          />
          {props.formik.values.viewType === ModelViewTypeEnum.SectionView && (
            <SectionsCreator
              theme={theme}
              SectionContent={ModelFieldSectionContent}
              contentProps={{
                model: props.model,
                formModelFields: props.formik.values.modelFields,
                handleSelectField,
                searchPromise: handleSearchFieldsPromise,
              }}
              sections={props.formik.values.sections.map((el) => {
                function toComponentSection(
                  modelSection: IModelSection
                ): ISection<{
                  fieldId: string;
                  specialField?: SectionSpecialFieldEnum;
                }> {
                  const section: ISection<{
                    fieldId: string;
                    specialField?: SectionSpecialFieldEnum;
                  }> = {
                    direction:
                      modelSection.direction as unknown as SectionDirectionEnum,
                    uuid: modelSection.uuid,
                    customData: modelSection.customData,
                    children: modelSection.children.map((childSection) =>
                      toComponentSection(childSection)
                    ),
                  };

                  return section;
                }

                return toComponentSection(el);
              })}
              setSections={(sections) => {
                function toModelSection(
                  componentSection: ISection<{
                    fieldId: string;
                    specialField?: SectionSpecialFieldEnum;
                  }>
                ): IModelSection {
                  const section: IModelSection = {
                    direction:
                      componentSection.direction as unknown as ModelSectionDirectionEnum,
                    uuid: componentSection.uuid,
                    customData: componentSection.customData,
                    children: componentSection.children.map((childSection) =>
                      toModelSection(childSection)
                    ),
                  };

                  return section;
                }
                props.formik.setFieldValue(
                  "sections",
                  sections.map((section) => toModelSection(section))
                );
              }}
            />
          )}

          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              // @ts-ignore
              items={selectedModelFields.map((modelField) => modelField.uuid)}
            >
              {selectedModelFields.map(
                (modelField: IModelField, modelFieldIndex: number) => {
                  return (
                    <SortableModelField
                      key={modelFieldIndex}
                      handleDeleteModelField={handleDeleteModelField}
                      modelField={modelField}
                      modelFieldIndex={modelFieldIndex}
                      language={props.language}
                      selectedModelFields={selectedModelFields}
                      setSelectedModelFields={setSelectedModelFields}
                      model={props.model}
                    />
                  );
                }
              )}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
};

interface IModelFieldSectionContentProps {
  section: ISection<{
    fieldId: string;
    specialField?: SectionSpecialFieldEnum;
  }>;
  handleSetSectionCustomData: (customData: {
    fieldId: string;
    specialField?: SectionSpecialFieldEnum;
  }) => void;
  contentProps: {
    model?: IModelReadDto;
    formModelFields: IModelForm["modelFields"];
    searchPromise: ISearchInputProps["searchPromise"];
    handleSelectField: ReturnType<typeof useSearchFields>["handleSelectField"];
  };
}
const ModelFieldSectionContent: React.FunctionComponent<
  IModelFieldSectionContentProps
> = (props: IModelFieldSectionContentProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleSelectField = (field: IFieldReadDto) => {
    if (
      !props.contentProps.formModelFields.some(
        (modelField) => (modelField.field as IFieldReadDto)._id === field._id
      )
    ) {
      props.contentProps.handleSelectField(field);
    }

    props.handleSetSectionCustomData({ fieldId: field._id.toString() });
  };

  const handleSelectorFieldChange = (fieldOption: IInputSelectOption) => {
    const field = props.contentProps.model?.modelFields.find(
      (modelField) =>
        (modelField.field as IFieldReadDto)._id.toString() === fieldOption.value
    )?.field;
    if (field) {
      handleSelectField(field as IFieldReadDto);
    }
  };

  const handleSpecialFieldChange = (specialFieldOption: IInputSelectOption) => {
    props.handleSetSectionCustomData({
      fieldId: field?._id || "",
      specialField: specialFieldOption.value as SectionSpecialFieldEnum,
    });
  };

  const field = props.contentProps.formModelFields.find(
    (modelField) =>
      (modelField.field as IFieldReadDto)._id.toString() ===
      props.section.customData?.fieldId.toString()
  )?.field as IFieldReadDto | undefined;

  const fieldsOptions: IInputSelectOption[] =
    props.contentProps.model?.modelFields.map((modelField) => {
      const field: IFieldReadDto = modelField.field as IFieldReadDto;

      return {
        label: getTranslatedText(field.name),
        value: field._id.toString(),
      };
    }) || [];

  const specialFieldOptions: IInputSelectOption[] = [
    {
      label: getTranslatedText(staticText?.none),
      value: SectionSpecialFieldEnum.None,
    },
    {
      label: getTranslatedText(staticText?.shippingMethodField),
      value: SectionSpecialFieldEnum.ShippingMethod,
    },
    {
      label: getTranslatedText(staticText?.quantity),
      value: SectionSpecialFieldEnum.Quantity,
    },
    {
      label: getTranslatedText(staticText?.addToCartButton),
      value: SectionSpecialFieldEnum.AddToCart,
    },
  ];

  return (
    <div>
      <InputSelect
        theme={theme}
        options={specialFieldOptions}
        label={getTranslatedText(staticText?.specialFields)}
        onChange={handleSpecialFieldChange}
        value={
          specialFieldOptions.find(
            (fieldOption) =>
              fieldOption.value.toString() ===
              props.section.customData?.specialField?.toString()
          ) || specialFieldOptions[0]
        }
      />
      <InputSelect
        theme={theme}
        options={fieldsOptions}
        label={getTranslatedText(staticText?.chooseFromExistingFields)}
        onChange={handleSelectorFieldChange}
        value={fieldsOptions.find(
          (fieldOption) => fieldOption.value === field?._id
        )}
      />
      <SearchInput
        theme={theme}
        inputProps={{
          placeholder: getTranslatedText(staticText?.searchFields),
        }}
        searchPromise={props.contentProps.searchPromise}
        getElementTitle={(field: IFieldReadDto) =>
          getTranslatedText(field.name)
        }
        onElementClick={handleSelectField}
        inputDataCy="modelFieldsSearchFieldInput"
      />

      {field &&
        getTranslatedText(staticText?.field) +
          " " +
          getTranslatedText(field?.name)}
    </div>
  );
};

export default React.memo(ModelFieldsEditor);
