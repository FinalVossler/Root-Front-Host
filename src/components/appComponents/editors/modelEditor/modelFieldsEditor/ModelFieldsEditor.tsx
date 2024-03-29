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
import { IFieldReadDto, IModelReadDto, ITheme } from "roottypes";

interface IFieldsEditorProps {
  setSelectedModelFields: (modelFields: IModelField[]) => any;
  placeholder?: string;
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
            placeholder:
              props.placeholder || getTranslatedText(staticText?.searchFields),
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

export default React.memo(ModelFieldsEditor);
