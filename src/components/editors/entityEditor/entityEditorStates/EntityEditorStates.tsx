import React from "react";

import { ITheme } from "../../../../config/theme";
import { useAppSelector } from "../../../../store/hooks";
import useStyles from "./entityEditorStates.styles";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import doesEntityMeetModelStateCondition from "../../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../../utils/getModelStateConcernedFields";
import { BiCheck } from "react-icons/bi";
import { IEntityReadDto, IModelReadDto, IModelStateReadDto } from "roottypes";

export interface IEntityEditorStatesProps {
  entity: IEntityReadDto;
  modelId: string;
}

// Hint: Own files are files already uploaded.
// NewFiles are the new files selected by the user in the file input
const EntityEditorStates: React.FunctionComponent<IEntityEditorStatesProps> = (
  props: IEntityEditorStatesProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector(
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
        (model.states as IModelStateReadDto[])?.map(
          (state: IModelStateReadDto, stateIndex: number) => {
            const stateConditionsAreMet: boolean =
              doesEntityMeetModelStateCondition({
                getTranslatedText,
                model,
                stateConcernedFields: getModelStateConcernedFields({
                  model,
                  modelState: state,
                }),
                entityFieldValues: props.entity.entityFieldValues,
                entity: props.entity,
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
          }
        )}
    </div>
  );
};

export default React.memo(EntityEditorStates);
