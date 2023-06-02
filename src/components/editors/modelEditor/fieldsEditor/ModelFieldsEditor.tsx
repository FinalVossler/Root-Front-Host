import React from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Theme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import SearchInput from "../../../searchInput";
import useSearchFields from "../../../../hooks/apiHooks/useSearchFields";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import useStyles from "./modelFieldsEditor.styles";
import { IField } from "../../../../store/slices/fieldSlice";
import { IModel, IModelField } from "../../../../store/slices/modelSlice";
import SortableModelField from "./sortableModelField";

interface IFieldsEditor {
  setSelectedModelFields: (modelFields: IModelField[]) => any;
  placeholder?: string;
  model?: IModel;
  language?: string;
}

const ModelFieldsEditor = (props: IFieldsEditor) => {
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
      <span className={styles.fieldsTitle}>
        {getTranslatedText(staticText?.fields)}:
      </span>
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
                    language={props.language}
                    selectedModelFields={selectedModelFields}
                    setSelectedModelFields={setSelectedModelFields}
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

export default React.memo(ModelFieldsEditor);
