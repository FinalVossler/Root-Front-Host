import React from "react";

import { IModel, IModelState } from "../../../../store/slices/modelSlice";
import { Theme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useStyles from "./entityEditorStates.styles";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { IEntity } from "../../../../store/slices/entitySlice";
import doesEntityMeetModelStateCondition from "../../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../../utils/getModelStateConcernedFields";
import { BiCheck } from "react-icons/bi";

export interface IEntityEditorStates {
  entity: IEntity;
  modelId: string;
}

// Hint: Own files are files already uploaded.
// NewFiles are the new files selected by the user in the file input
const EntityEditorStates = (props: IEntityEditorStates) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModel | undefined = useAppSelector(
    (state) => state.model.models
  ).find((m) => m._id.toString() === props.modelId);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  //#region Effects

  //#endregion Effects

  //#region Event listeners

  //#endregion Event listeners

  return (
    <div className={styles.entityEditorStatesContainer}>
      <h2 className={styles.entityEditorStatesTitle}>
        {getTranslatedText(staticText?.states)}:
      </h2>
      {model !== undefined &&
        model.states?.map((state: IModelState, stateIndex: number) => {
          const stateConditionsAreMet: boolean =
            doesEntityMeetModelStateCondition({
              getTranslatedText,
              model,
              stateConcernedFields: getModelStateConcernedFields({
                model,
                modelState: state,
              }),
              entityFieldValues: props.entity.entityFieldValues,
            });

          return (
            <div
              key={stateIndex}
              className={
                stateConditionsAreMet
                  ? styles.stateContainerConditionMet
                  : styles.stateContainer
              }
            >
              {getTranslatedText(state.name)}{" "}
              {stateConditionsAreMet && (
                <BiCheck className={styles.checkIcon} />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(EntityEditorStates);
