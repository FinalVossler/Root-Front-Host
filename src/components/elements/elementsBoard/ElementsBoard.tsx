import React from "react";
import Loading from "react-loading";

import { ITheme } from "../../../config/theme";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../store/hooks";
import { IModelField } from "../../../store/slices/modelSlice";
import doesEntityMeetModelStateCondition from "../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../utils/getModelStateConcernedFields";

import useStyles from "./elementsBoard.styles";
import StateTracking from "../../postsComponents/stateTracking";
import EntityCard from "./EntityCard";
import { IEntityReadDto, IModelReadDto, IModelStateReadDto } from "roottypes";

interface IElementsBoardProps {
  modelId: string;
  entities: IEntityReadDto[];
  forStatusTracking: boolean;
  loading: boolean;
}

const ElementsBoard: React.FunctionComponent<IElementsBoardProps> = (
  props: IElementsBoardProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector(
    (state) => state.model.models
  ).find((el) => el._id.toString() === props.modelId.toString());

  const styles = useStyles({ theme: theme });
  const getTranslatedText = useGetTranslatedText();

  //#region View
  const mainModelFields: IModelField[] =
    model?.modelFields.filter((modelField) => Boolean(modelField.mainField)) ||
    [];
  interface IBoardPattern {
    modelState: IModelStateReadDto;
    entities: IEntityReadDto[];
  }
  const boardPattern: IBoardPattern[] = React.useMemo(() => {
    if (!model) {
      return [];
    }

    const result: IBoardPattern[] = [];

    let entitiesThatShouldntBeShownAgain: IEntityReadDto[] = [];
    [...((model.states as IModelStateReadDto[]) || [])]
      .reverse()
      .forEach((modelState) => {
        const stateConcernedFields: IModelField[] =
          getModelStateConcernedFields({
            model,
            modelState,
          });
        const stateEntities: IEntityReadDto[] = props.entities
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
              !entitiesThatShouldntBeShownAgain.find(
                (e) => e._id === entity._id
              )
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
      {props.loading && <Loading color={theme.primary} />}

      {!props.loading &&
        props.forStatusTracking &&
        props.entities.map((entity, entityIndex) => {
          const modelState: IModelStateReadDto | undefined = boardPattern.find(
            (pattern) => pattern.entities.some((e) => e._id === entity._id)
          )?.modelState;

          if (!modelState) return null;

          return (
            <div
              key={entityIndex}
              className={styles.entityCardAndStateTrackingContainer}
            >
              <EntityCard
                entity={entity}
                modelId={props.modelId}
                model={model}
                mainModelFields={mainModelFields}
              />
              <StateTracking
                states={
                  (model.states as IModelStateReadDto[])?.map((modelState) => ({
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
          );
        })}

      {!props.loading && !props.forStatusTracking && (
        <div className={styles.elementsBoardContainer}>
          {boardPattern.map(({ modelState, entities }, modelStateIndex) => {
            return (
              <div key={modelStateIndex} className={styles.stateContainer}>
                <h3 className={styles.modelStateName}>
                  {getTranslatedText(modelState.name)}
                </h3>

                {entities.map((entity: IEntityReadDto) => {
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
