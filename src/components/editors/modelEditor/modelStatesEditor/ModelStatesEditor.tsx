import { FormikProps } from "formik";
import React from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { FaNetworkWired } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Theme } from "../../../../config/theme";
import { ModelStateUpdateCommand } from "../../../../hooks/apiHooks/useUpdateModel";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { ModelStateType } from "../../../../store/slices/modelSlice";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Input from "../../../input";
import { IModelForm } from "../ModelEditor";

import useStyles from "./modelStatesEditor.styles";

interface IModelStatesEditor {
  formik: FormikProps<IModelForm>;
}

const ModelStatesEditor = (props: IModelStatesEditor) => {
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.models
  );
  const theme: Theme = useAppSelector(
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
        stateType: ModelStateType.ParentState,
        exclusive: false,
        language: props.formik.values.language,
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
        stateType: ModelStateType.ParentState,
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
      (state: ModelStateUpdateCommand, index) =>
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
      (state: ModelStateUpdateCommand, index) =>
        stateIndex === index
          ? {
              ...state,
              exclusive,
            }
          : state
    );
    props.formik.setFieldValue("states", newStates);
  };
  const handleSubStateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateIndex: number
  ) => {
    const newSubStates = props.formik.values.subStates.map(
      (state: ModelStateUpdateCommand, index) =>
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
  //#endregion Event listeners

  return (
    <div className={styles.modelStatesEditorContainer}>
      <span onClick={handleTriggerOpenStates} className={styles.statesTitle}>
        {!openStates ? (
          <BsArrowDownShort className={styles.triggerArrow} />
        ) : (
          <BsArrowUpShort className={styles.triggerArrow} />
        )}{" "}
        {getTranslatedText(staticText?.states)}
      </span>

      {openStates && (
        <>
          <h3 className={styles.statesTypeTitle}>
            {getTranslatedText(staticText?.parentStates)}
          </h3>
          {props.formik.values.states?.length > 0 && (
            <div className={styles.statesContainer}>
              {props.formik.values.states.map((state, stateIndex) => {
                return (
                  <div key={stateIndex} className={styles.singleStateContainer}>
                    <Input
                      Icon={FaNetworkWired}
                      onChange={(e) => handleStateChange(e, stateIndex)}
                      label={getTranslatedText(staticText?.state)}
                      inputProps={{
                        placeholder: getTranslatedText(staticText?.state),
                      }}
                      value={state.name}
                      debounce
                    />
                    <Checkbox
                      label={getTranslatedText(staticText?.exclusive)}
                      onChange={(checked) =>
                        handleExclusiveChange(checked, stateIndex)
                      }
                      labelStyles={{
                        width: 165,
                      }}
                      checked={Boolean(state.exclusive)}
                    />
                    <MdDelete
                      onClick={() => handleDeleteState(stateIndex)}
                      className={styles.deleteState}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <Button onClick={handleAddModelState}>
            {getTranslatedText(staticText?.addState)}
          </Button>
          <br />
          <h3 className={styles.statesTypeTitle}>
            {getTranslatedText(staticText?.subStates)}
          </h3>
          {props.formik.values.subStates.length > 0 && (
            <div className={styles.statesContainer}>
              {props.formik.values.subStates.map((state, subStateIndex) => {
                return (
                  <div
                    key={subStateIndex}
                    className={styles.singleStateContainer}
                  >
                    <Input
                      Icon={FaNetworkWired}
                      key={subStateIndex}
                      onChange={(e) => handleSubStateChange(e, subStateIndex)}
                      label={getTranslatedText(staticText?.subState)}
                      inputProps={{
                        placeholder: getTranslatedText(staticText?.subState),
                      }}
                      value={state.name}
                      debounce
                    />
                    <MdDelete
                      onClick={() => handleDeleteSubState(subStateIndex)}
                      className={styles.deleteState}
                    />
                  </div>
                );
              })}
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

export default React.memo(ModelStatesEditor);
