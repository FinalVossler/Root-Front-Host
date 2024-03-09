import React from "react";
import Loading from "react-loading";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { IModelField } from "../../../../store/slices/modelSlice";
import doesEntityMeetModelStateCondition from "../../../../utils/doesEntityMeetModelStateCondition";
import getModelStateConcernedFields from "../../../../utils/getModelStateConcernedFields";

import useStyles from "./elementsStatusTracking.styles";
import StateTracking from "../../../postsComponents/stateTracking";
import {
  IEntityReadDto,
  IModelReadDto,
  IModelStateReadDto,
  ITheme,
} from "roottypes";
import EntityCard from "../entityCard";
import useGetBoardPattern, { IBoardPattern } from "../useGetBoardPattern";

interface IElementsStatusTrackingProps {
  modelId: string;
  entities: IEntityReadDto[];
  loading: boolean;
}

const ElementsStatusTracking: React.FunctionComponent<
  IElementsStatusTrackingProps
> = (props: IElementsStatusTrackingProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const model: IModelReadDto | undefined = useAppSelector(
    (state) => state.model.models
  ).find((el) => el._id.toString() === props.modelId.toString());

  const styles = useStyles({ theme: theme });
  const getTranslatedText = useGetTranslatedText();
  const boardPattern: IBoardPattern[] = useGetBoardPattern({
    model,
    entities: props.entities,
  });

  //#region View
  const mainModelFields: IModelField[] =
    model?.modelFields.filter((modelField) => Boolean(modelField.mainField)) ||
    [];

  if (!model) return null;

  //#endregion View
  return (
    <React.Fragment>
      {props.loading && <Loading color={theme.primary} />}

      {!props.loading &&
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
    </React.Fragment>
  );
};

export default ElementsStatusTracking;
