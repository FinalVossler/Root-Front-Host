import React from "react";

import { Theme } from "../../../config/theme";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../store/hooks";
import { IEntity } from "../../../store/slices/entitySlice";
import {
  IModel,
  IModelField,
  IModelState,
} from "../../../store/slices/modelSlice";
import doesEntityMeetModelStateCondition from "../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../utils/getModelStateConcernedFields";

import useStyles from "./elementsBoard.styles";

interface IElementsBoard {
  modelId: string;
  entities: IEntity[];
}

const ElementsBoard: React.FunctionComponent<IElementsBoard> = (
  props: IElementsBoard
) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModel | undefined = useAppSelector(
    (state) => state.model.models
  ).find((el) => el._id.toString() === props.modelId.toString());

  const styles = useStyles({ theme: theme });
  const getTranslatedText = useGetTranslatedText();

  if (!model) return null;

  //#region View
  const mainModelFields: IModelField[] = model.modelFields.filter(
    (modelField) => Boolean(modelField.mainField)
  );
  const entitiesThatShouldntBeShownAgain: IEntity[] = [];
  //#endregion View
  return (
    <div className={styles.elementsBoardContainer}>
      {model.states &&
        [...(model.states || [])]
          .reverse()
          .map((modelState: IModelState, modelStateIndex) => {
            const stateConcernedFields: IModelField[] =
              getModelStateConcernedFields({ model, modelState });

            return (
              <div key={modelStateIndex} className={styles.stateContainer}>
                <h3 className={styles.modelStateName}>
                  {getTranslatedText(modelState.name)}
                </h3>

                {props.entities
                  // Only show the entities that meet the model state conditions
                  .filter((entity) => {
                    let meetsModelStateCondition: boolean =
                      doesEntityMeetModelStateCondition({
                        entityFieldValues: entity.entityFieldValues,
                        stateConcernedFields,
                        getTranslatedText,
                        model,
                      });

                    return (
                      meetsModelStateCondition &&
                      !entitiesThatShouldntBeShownAgain.find(
                        (e) => e._id === entity._id
                      )
                    );
                  })
                  .map((entity: IEntity, entityIndex: number) => {
                    if (modelState.exlusive)
                      entitiesThatShouldntBeShownAgain.push(entity);
                    return (
                      <div key={entityIndex} className={styles.entityCard}>
                        <div className={styles.mainModelFields}>
                          {mainModelFields.map(
                            (modelField, modelFieldIndex: number) => {
                              return (
                                <span
                                  className={styles.entityMainFieldValue}
                                  key={modelFieldIndex}
                                >
                                  <span className={styles.fieldLabel}>
                                    {getTranslatedText(modelField.field.name)}:
                                  </span>
                                  {getTranslatedText(
                                    entity.entityFieldValues.find(
                                      (el) =>
                                        el.field._id.toString() ===
                                        modelField.field._id.toString()
                                    )?.value
                                  ) || ""}
                                </span>
                              );
                            }
                          )}
                        </div>
                        <div className={styles.subStates}>
                          {model.subStates &&
                            model.subStates?.map(
                              (
                                subState: IModelState,
                                subStateIndex: number
                              ) => {
                                const concernedFields: IModelField[] =
                                  getModelStateConcernedFields({
                                    model,
                                    modelState: subState,
                                  });
                                const stateConditionsMet: boolean =
                                  doesEntityMeetModelStateCondition({
                                    entityFieldValues: entity.entityFieldValues,
                                    stateConcernedFields: concernedFields,
                                    getTranslatedText,
                                    model,
                                  });
                                return (
                                  <span
                                    key={subStateIndex}
                                    className={
                                      stateConditionsMet
                                        ? styles.filledSubState
                                        : styles.subState
                                    }
                                  >
                                    {getTranslatedText(subState.name)}
                                  </span>
                                );
                              }
                            )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
    </div>
  );
};

export default ElementsBoard;
