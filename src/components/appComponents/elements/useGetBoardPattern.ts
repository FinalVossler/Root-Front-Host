import React from "react";
import { IEntityReadDto, IModelReadDto, IModelStateReadDto } from "roottypes";
import getModelStateConcernedFields from "../../../utils/getModelStateConcernedFields";
import { IModelField } from "../../../store/slices/modelSlice";
import doesEntityMeetModelStateCondition from "../../../utils/doesEntityMeetModelStateCondition";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

export interface IBoardPattern {
  modelState: IModelStateReadDto;
  entities: IEntityReadDto[];
}
const useGetBoardPattern = ({
  model,
  entities,
}: {
  model: IModelReadDto | undefined;
  entities: IEntityReadDto[];
}): IBoardPattern[] => {
  const getTranslatedText = useGetTranslatedText();

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
        const stateEntities: IEntityReadDto[] = entities
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
  }, [model?.states, entities]);

  return boardPattern;
};

export default useGetBoardPattern;
