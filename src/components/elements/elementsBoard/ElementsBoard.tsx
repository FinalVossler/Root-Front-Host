import React from "react";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";

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
import StateTracking from "../../postsComponents/stateTracking";

interface IElementsBoard {
  modelId: string;
  entities: IEntity[];
  forStatusTracking: boolean;
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

  //#region View
  const mainModelFields: IModelField[] =
    model?.modelFields.filter((modelField) => Boolean(modelField.mainField)) ||
    [];
  interface IBoardPattern {
    modelState: IModelState;
    entities: IEntity[];
  }
  const boardPattern: IBoardPattern[] = React.useMemo(() => {
    if (!model) {
      return [];
    }

    const result: IBoardPattern[] = [];

    let entitiesThatShouldntBeShownAgain: IEntity[] = [];
    [...(model.states || [])].reverse().forEach((modelState) => {
      const stateConcernedFields: IModelField[] = getModelStateConcernedFields({
        model,
        modelState,
      });
      const stateEntities: IEntity[] = props.entities
        // Only show the entities that meet the model state conditions
        .filter((entity) => {
          let meetsModelStateCondition: boolean =
            doesEntityMeetModelStateCondition({
              entityFieldValues: entity.entityFieldValues,
              stateConcernedFields,
              getTranslatedText,
              model,
              entity,
            });

          return (
            meetsModelStateCondition &&
            !entitiesThatShouldntBeShownAgain.find((e) => e._id === entity._id)
          );
        });
      if (modelState.exlusive) {
        entitiesThatShouldntBeShownAgain =
          entitiesThatShouldntBeShownAgain.concat(stateEntities);
      }
      result.push({ modelState: modelState, entities: stateEntities });
    });
    result.reverse();

    return result;
  }, [model?.states, props.entities]);

  if (!model) return null;

  //#endregion View
  return (
    <React.Fragment>
      {props.forStatusTracking &&
        boardPattern.map(({ modelState, entities }, modelStateIndex) => {
          return (
            <React.Fragment key={modelStateIndex}>
              {entities.map((entity, entityIndex) => (
                <div className={styles.entityCardAndStateTrackingContainer}>
                  <EntityCard
                    key={entityIndex}
                    entity={entity}
                    modelId={props.modelId}
                    model={model}
                    mainModelFields={mainModelFields}
                  />
                  <StateTracking
                    key={entityIndex}
                    states={
                      model.states?.map((modelState) => ({
                        _id: modelState._id,
                        stateName: getTranslatedText(modelState.name),
                      })) || []
                    }
                    currentState={{
                      _id: modelState._id,
                      stateName: getTranslatedText(modelState.name),
                    }}
                  />
                </div>
              ))}
            </React.Fragment>
          );
        })}

      {!props.forStatusTracking && (
        <div className={styles.elementsBoardContainer}>
          {boardPattern.map(({ modelState, entities }, modelStateIndex) => {
            return (
              <div key={modelStateIndex} className={styles.stateContainer}>
                <h3 className={styles.modelStateName}>
                  {getTranslatedText(modelState.name)}
                </h3>

                {entities.map((entity: IEntity, entityIndex: number) => {
                  return (
                    <div className={styles.entityCardAndStateTrackingContainer}>
                      <EntityCard
                        key={entityIndex}
                        entity={entity}
                        modelId={props.modelId}
                        model={model}
                        mainModelFields={mainModelFields}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

interface IEntityCardProps {
  entity: IEntity;
  modelId: string;
  mainModelFields: IModelField[];
  model: IModel;
}

const EntityCard = (props: IEntityCardProps) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  return (
    <div className={styles.entityCard}>
      <Link
        target="_blank"
        rel="noreferrer"
        to={"/entities/" + props.modelId + "/" + props.entity._id}
      >
        <FaDirections className={styles.visitEntityIcon} />
      </Link>

      <div className={styles.mainModelFields}>
        {props.mainModelFields.map((modelField, modelFieldIndex: number) => {
          return (
            <span className={styles.entityMainFieldValue} key={modelFieldIndex}>
              <span className={styles.fieldLabel}>
                {getTranslatedText(modelField.field.name)}:
              </span>
              {getTranslatedText(
                props.entity.entityFieldValues.find(
                  (el) =>
                    el.field._id.toString() === modelField.field._id.toString()
                )?.value
              ) || ""}
            </span>
          );
        })}
      </div>
      <div className={styles.subStates}>
        {props.model.subStates &&
          props.model.subStates?.map(
            (subState: IModelState, subStateIndex: number) => {
              const concernedFields: IModelField[] =
                getModelStateConcernedFields({
                  model: props.model,
                  modelState: subState,
                });
              const stateConditionsMet: boolean =
                doesEntityMeetModelStateCondition({
                  entityFieldValues: props.entity.entityFieldValues,
                  stateConcernedFields: concernedFields,
                  getTranslatedText,
                  model: props.model,
                  entity: props.entity,
                });
              return (
                <span
                  key={subStateIndex}
                  className={
                    stateConditionsMet ? styles.filledSubState : styles.subState
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
};

export default ElementsBoard;
