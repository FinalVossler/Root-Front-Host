import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { IEntity } from "../../../store/slices/entitySlice";
import {
  IModel,
  IModelField,
  IModelState,
} from "../../../store/slices/modelSlice";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";

import useStyles from "./elementsBoard.styles";
import { BiEdit } from "react-icons/bi";
import { FaDirections } from "react-icons/fa";
import { Link } from "react-router-dom";
import getModelStateConcernedFields from "../../../utils/getModelStateConcernedFields";
import doesEntityMeetModelStateCondition from "../../../utils/doesEntityMeetModelStateCondition";
import { Element } from "../Elements";

interface IEntityCardProps {
  entity: IEntity;
  modelId: string;
  mainModelFields: IModelField[];
  model: IModel;
  Editor: React.FunctionComponent<{
    open: boolean;
    setOpen: (open: boolean) => void;
    element?: Element | null;
  }>;
}

const EntityCard: React.FunctionComponent<IEntityCardProps> = (
  props: IEntityCardProps
) => {
  const [editorOpen, setEditorOpen] = React.useState<boolean>(false);

  const theme = useAppSelector((state) => state.websiteConfiguration.theme);
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  const handleOpenEditor = () => {
    setEditorOpen(true);
  };

  return (
    <div className={styles.entityCard}>
      <BiEdit onClick={handleOpenEditor} className={styles.editEntityIcon} />
      <props.Editor
        open={editorOpen}
        setOpen={setEditorOpen}
        element={props.entity}
      />
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
              key={modelField.field._id}
            >
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
          props.model.subStates?.map((subState: IModelState) => {
            const concernedFields: IModelField[] = getModelStateConcernedFields(
              {
                model: props.model,
                modelState: subState,
              }
            );
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
          })}
      </div>
      {props.entity.assignedUsers && props.entity.assignedUsers?.length > 0 && (
        <div className={styles.assignedToContainer}>
          <h2 className={styles.assignedToCardTitle}>
            {getTranslatedText(staticText?.assignedTo)}:
          </h2>
          <ul>
            {props.entity.assignedUsers?.map((assignedUser) => {
              return (
                <li
                  className={styles.assignedUser}
                  key={assignedUser._id.toString()}
                >
                  {assignedUser.firstName + " " + assignedUser.lastName}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EntityCard;
