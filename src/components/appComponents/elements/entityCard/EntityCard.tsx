import React from "react";
import { BiEdit } from "react-icons/bi";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
  IModelStateReadDto,
  IUserReadDto,
} from "roottypes";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IModelField } from "../../../../store/slices/modelSlice";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import getModelStateConcernedFields from "../../../../utils/getModelStateConcernedFields";
import doesEntityMeetModelStateCondition from "../../../../utils/doesEntityMeetModelStateCondition";

import {
  EditorTypeEnum,
  editorSlice,
} from "../../../../store/slices/editorSlice";
import useStyles from "./entityCard.styles";

interface IEntityCardProps {
  entity: IEntityReadDto;
  modelId: string;
  mainModelFields: IModelField[];
  model: IModelReadDto;
}

const EntityCard: React.FunctionComponent<IEntityCardProps> = (
  props: IEntityCardProps
) => {
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();

  const handleOpenEditor = () => {
    dispatch(
      editorSlice.actions.addEditor({
        editorType: EditorTypeEnum.Entity,
        element: props.entity,
        modelId: props.model._id,
      })
    );
  };

  return (
    <div className={styles.entityCard}>
      <BiEdit onClick={handleOpenEditor} className={styles.editEntityIcon} />
      <Link
        target="_blank"
        rel="noreferrer"
        to={"/entities/" + props.modelId + "/" + props.entity._id}
      >
        <FaDirections className={styles.visitEntityIcon} />
      </Link>

      <div className={styles.mainModelFields}>
        {props.mainModelFields.map((modelField) => {
          return (
            <span
              className={styles.entityMainFieldValue}
              key={(modelField.field as IFieldReadDto)._id}
            >
              <span className={styles.fieldLabel}>
                {getTranslatedText((modelField.field as IFieldReadDto).name)}:
              </span>
              {getTranslatedText(
                props.entity.entityFieldValues.find(
                  (el) =>
                    (el.field as IFieldReadDto)._id.toString() ===
                    (modelField.field as IFieldReadDto)._id.toString()
                )?.value
              ) || ""}
            </span>
          );
        })}
      </div>
      <div className={styles.subStates}>
        {props.model.subStates &&
          (props.model.subStates as IModelStateReadDto[])?.map(
            (subState: IModelStateReadDto) => {
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
                  key={subState._id}
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
      {props.entity.assignedUsers && props.entity.assignedUsers?.length > 0 && (
        <div className={styles.assignedToContainer}>
          <h2 className={styles.assignedToCardTitle}>
            {getTranslatedText(staticText?.assignedTo)}:
          </h2>
          <ul>
            {(props.entity.assignedUsers as IUserReadDto[])?.map(
              (assignedUser) => {
                return (
                  <li
                    className={styles.assignedUser}
                    key={assignedUser._id.toString()}
                  >
                    {assignedUser.firstName + " " + assignedUser.lastName}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EntityCard;
