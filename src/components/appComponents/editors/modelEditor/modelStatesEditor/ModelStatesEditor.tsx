import { FormikProps } from "formik";
import React from "react";
import {
  BsArrowDownShort,
  BsArrowUpShort,
  BsHandIndexFill,
} from "react-icons/bs";
import { FaNetworkWired } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { ITheme } from "../../../../../config/theme";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../fundamentalComponents/button";
import Checkbox from "../../../../fundamentalComponents/checkbox";
import Input from "../../../../fundamentalComponents/input";
import { IModelForm, ModelFormState } from "../ModelEditor";

import useStyles from "./modelStatesEditor.styles";
import uuid from "react-uuid";
import { ModelStateTypeEnum } from "roottypes";

interface IModelStatesEditorProps {
  formik: FormikProps<IModelForm>;
}

const ModelStatesEditor: React.FunctionComponent<IModelStatesEditorProps> = (
  props: IModelStatesEditorProps
) => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [openStates, setOpenStates] = React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  //#region Event listeners
  const handleTriggerOpenStates = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpenStates(!openStates);
  };

  const handleAddModelState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.formik.setFieldValue("states", [
      ...props.formik.values.states,
      {
        name: "",
        stateType: ModelStateTypeEnum.ParentState,
        exclusive: false,
        language: props.formik.values.language,
        uuid: uuid(),
      },
    ]);
  };
  const handleAddModelSubState = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.formik.setFieldValue("subStates", [
      ...props.formik.values.subStates,
      {
        name: "",
        stateType: ModelStateTypeEnum.ParentState,
        exclusive: false,
        language: props.formik.values.language,
      },
    ]);
  };
  const handleStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateIndex: number
  ) => {
    const newStates = props.formik.values.states.map(
      (state: ModelFormState, index) =>
        stateIndex === index
          ? {
              ...state,
              name: e.target.value,
            }
          : state
    );
    props.formik.setFieldValue("states", newStates);
  };
  const handleExclusiveChange = (exclusive: boolean, stateIndex: number) => {
    const newStates = props.formik.values.states.map(
      (state: ModelFormState, index) =>
        stateIndex === index
          ? {
              ...state,
              exclusive,
            }
          : state
    );
    props.formik.setFieldValue("states", newStates);
  };
  const handleSubStateExclusiveChange = (
    exclusive: boolean,
    stateIndex: number
  ) => {
    const newStates = props.formik.values.subStates.map(
      (state: ModelFormState, index) =>
        stateIndex === index
          ? {
              ...state,
              exclusive,
            }
          : state
    );
    props.formik.setFieldValue("subStates", newStates);
  };
  const handleSubStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateIndex: number
  ) => {
    const newSubStates = props.formik.values.subStates.map(
      (state: ModelFormState, index) =>
        stateIndex === index
          ? {
              ...state,
              name: e.target.value,
            }
          : state
    );
    props.formik.setFieldValue("subStates", newSubStates);
  };
  const handleDeleteState = (index: number) => {
    const newStates = [...props.formik.values.states];
    newStates.splice(index, 1);
    props.formik.setFieldValue("states", newStates);
  };
  const handleDeleteSubState = (index: number) => {
    const newSubStates = [...props.formik.values.subStates];
    newSubStates.splice(index, 1);
    props.formik.setFieldValue("subStates", newSubStates);
  };

  const handleDragEnd =
    (stateOrSubState = "states") =>
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = props.formik.values[stateOrSubState]
          .map((state: ModelFormState) => state.uuid)
          .indexOf(active.id as string);
        const newIndex = props.formik.values[stateOrSubState]
          .map((state: ModelFormState) => state.uuid)
          .indexOf(over.id as string);

        const newStates = arrayMove(
          props.formik.values[stateOrSubState],
          oldIndex,
          newIndex
        );

        props.formik.setFieldValue(stateOrSubState, newStates);
      }
    };
  //#endregion Event listeners

  return (
    <div className={styles.modelStatesEditorContainer}>
      <span
        onClick={handleTriggerOpenStates}
        className={styles.statesTitle}
        data-cy="modelTriggerOpenStates"
      >
        {!openStates ? (
          <BsArrowDownShort className={styles.triggerArrow} />
        ) : (
          <BsArrowUpShort className={styles.triggerArrow} />
        )}{" "}
        {getTranslatedText(staticText?.states)}
      </span>

      {openStates && (
        <>
          <h3 className={styles.statesTypeTitle} data-cy="modelStatesContainer">
            {getTranslatedText(staticText?.parentStates)}
          </h3>
          {props.formik.values.states?.length > 0 && (
            <div className={styles.statesContainer}>
              <DndContext onDragEnd={handleDragEnd("states")}>
                <SortableContext
                  items={props.formik.values.states.map(
                    (modelState) => modelState.uuid
                  )}
                >
                  {props.formik.values.states.map((state, stateIndex) => {
                    return (
                      <SortableModelState
                        key={stateIndex}
                        state={state}
                        stateIndex={stateIndex}
                        onStateChange={handleStateChange}
                        onExclusiveChange={handleExclusiveChange}
                        onDeleteState={handleDeleteState}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </div>
          )}
          <Button
            onClick={handleAddModelState}
            buttonDataCy="addModelStateButton"
          >
            {getTranslatedText(staticText?.addState)}
          </Button>
          <br />
          <h3 className={styles.statesTypeTitle}>
            {getTranslatedText(staticText?.subStates)}
          </h3>
          {props.formik.values.subStates.length > 0 && (
            <div className={styles.statesContainer}>
              <DndContext onDragEnd={handleDragEnd("subStates")}>
                <SortableContext
                  items={props.formik.values.subStates.map(
                    (modelSubState) => modelSubState.uuid
                  )}
                >
                  {props.formik.values.subStates.map((subState, stateIndex) => {
                    return (
                      <SortableModelState
                        key={stateIndex}
                        state={subState}
                        stateIndex={stateIndex}
                        onStateChange={handleSubStateChange}
                        onExclusiveChange={handleSubStateExclusiveChange}
                        onDeleteState={handleDeleteSubState}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            </div>
          )}
          <Button onClick={handleAddModelSubState}>
            {getTranslatedText(staticText?.addSubState)}
          </Button>
        </>
      )}
    </div>
  );
};

interface ISortableModelState {
  state: ModelFormState;
  stateIndex: number;
  onStateChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    stateIndex: number
  ) => void;
  onExclusiveChange: (checked: boolean, stateIndex: number) => void;
  onDeleteState: (stateIndex: number) => void;
}
const SortableModelState: React.FunctionComponent<ISortableModelState> = (
  props: ISortableModelState
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.state.uuid,
  });

  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={sorteStyles}
      className={styles.singleStateContainer}
    >
      <Input
        Icon={FaNetworkWired}
        onChange={(e) => props.onStateChange(e, props.stateIndex)}
        label={getTranslatedText(staticText?.state)}
        inputProps={{
          placeholder: getTranslatedText(staticText?.state),
        }}
        value={props.state.name}
        debounce
        inputDataCy={"modelStateNameForState" + props.stateIndex}
      />
      <Checkbox
        label={getTranslatedText(staticText?.exclusive)}
        onChange={(checked) =>
          props.onExclusiveChange(checked, props.stateIndex)
        }
        labelStyles={{
          width: 165,
        }}
        checked={Boolean(props.state.exclusive)}
        inputDataCy={"modelStateIsExclusiveCheckboxForState" + props.stateIndex}
      />
      <MdDelete
        onClick={() => props.onDeleteState(props.stateIndex)}
        className={styles.deleteState}
      />

      <BsHandIndexFill
        color={theme.primary}
        className={styles.sortableModelStateHandle}
        {...attributes}
        {...listeners}
      />
    </div>
  );
};

export default React.memo(ModelStatesEditor);
