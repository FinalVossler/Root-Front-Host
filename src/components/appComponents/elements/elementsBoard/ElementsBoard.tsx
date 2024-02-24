import React from "react";
import Loading from "react-loading";

import { ITheme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { IModelField } from "../../../../store/slices/modelSlice";

import useStyles from "./elementsBoard.styles";
import { IEntityReadDto, IModelReadDto } from "roottypes";
import EntityCard from "../entityCard";
import useGetBoardPattern, { IBoardPattern } from "../useGetBoardPattern";

interface IElementsBoardProps {
  modelId: string;
  entities: IEntityReadDto[];
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

      {!props.loading && (
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
