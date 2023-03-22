import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { BsHandIndexFill } from "react-icons/bs";

import { Theme } from "../../config/theme";
import { useAppSelector } from "../../store/hooks";
import SearchInput from "../searchInput";
import { AiFillDelete } from "react-icons/ai";
import useSearchFields from "../../hooks/apiHooks/useSearchFields";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

import useStyles from "./fieldsEditor.styles";
import { IField } from "../../store/slices/fieldSlice";
import { IModel, IModelField } from "../../store/slices/modelSlice";

interface IFieldsEditor {
  setSelectedModelFields: (modelFields: IModelField[]) => any;
  placeholder?: string;
  model?: IModel;
}

const FieldsEditor = (props: IFieldsEditor) => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.fields
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

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
  //#endregion Event listeners

  return (
    <div className={styles.fieldsEditorContainer}>
      <SearchInput
        inputProps={{
          placeholder:
            props.placeholder || getTranslatedText(staticText?.searchFields),
        }}
        searchPromise={handleSearchFieldsPromise}
        getElementTitle={(field: IField) => getTranslatedText(field.name)}
        onElementClick={handleSelectField}
      />

      <div className={styles.fieldsContainer}>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
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
                  />
                );
              }
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

interface ISortableModelField {
  modelField: IModelField;
  handleDeleteModelField: (modelFieldIndex: number) => void;
  modelFieldIndex: number;
}

const SortableModelField: React.FunctionComponent<ISortableModelField> = (
  props: ISortableModelField
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.modelField.uuid,
  });
  const getTranslatedText = useGetTranslatedText();

  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={sorteStyles}
      className={styles.singleModelFieldContainer}
    >
      <BsHandIndexFill
        color={theme.primary}
        className={styles.sortModelFieldHandle}
        {...attributes}
        {...listeners}
      />
      <AiFillDelete
        color={theme.primary}
        className={styles.deleteModelFieldButton}
        onClick={() => props.handleDeleteModelField(props.modelFieldIndex)}
      />
      <span className={styles.fieldName}>
        {getTranslatedText(props.modelField.field.name)}
      </span>
    </div>
  );
};

export default React.memo(FieldsEditor);
