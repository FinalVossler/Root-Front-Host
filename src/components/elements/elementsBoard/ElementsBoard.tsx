import React from "react";
import Loading from "react-loading";

import { ITheme } from "../../../config/theme";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../store/hooks";
import { IEntity } from "../../../store/slices/entitySlice";
import {
  IModel,
  IModelField,
  IModelState,
} from "../../../store/slices/modelSlice";
import { Element } from "../Elements";
import doesEntityMeetModelStateCondition from "../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../utils/getModelStateConcernedFields";

import useStyles from "./elementsBoard.styles";
import StateTracking from "../../postsComponents/stateTracking";
import EntityCard from "./EntityCard";

interface IElementsBoard {
  modelId: string;
  entities: IEntity[];
  forStatusTracking: boolean;

  Editor: React.FunctionComponent<{
    open: boolean;
    setOpen: (open: boolean) => void;
    element?: Element | null;
  }>;
  loading: boolean;
}

const ElementsBoard: React.FunctionComponent<IElementsBoard> = (
  props: IElementsBoard
) => {
  const theme: ITheme = useAppSelector(
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
        boardPattern.map(({ modelState, entities }) => {
          return (
            <React.Fragment key={modelState._id}>
              {props.loading && <Loading color={theme.primary} />}

              {!props.loading &&
                entities.map((entity, entityIndex) => (
                  <div
                    key={entityIndex}
                    className={styles.entityCardAndStateTrackingContainer}
                  >
                    <EntityCard
                      entity={entity}
                      modelId={props.modelId}
                      model={model}
                      mainModelFields={mainModelFields}
                      Editor={(subProps) => <props.Editor {...subProps} />}
                    />
                    <StateTracking
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
          {props.loading && <Loading color={theme.primary} />}
          {!props.loading &&
            boardPattern.map(({ modelState, entities }, modelStateIndex) => {
              return (
                <div key={modelStateIndex} className={styles.stateContainer}>
                  <h3 className={styles.modelStateName}>
                    {getTranslatedText(modelState.name)}
                  </h3>

                  {entities.map((entity: IEntity) => {
                    return (
                      <div
                        key={entity._id}
                        className={styles.entityCardAndStateTrackingContainer}
                      >
                        <EntityCard
                          entity={entity}
                          modelId={props.modelId}
                          model={model}
                          mainModelFields={mainModelFields}
                          Editor={(subProps) => <props.Editor {...subProps} />}
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

export default ElementsBoard;
