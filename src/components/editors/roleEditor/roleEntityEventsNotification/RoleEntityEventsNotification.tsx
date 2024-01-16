import { useFormik } from "formik";
import React from "react";
import { BiPlus, BiText } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { ITheme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Input from "../../../input";
import Textarea from "../../../textarea/Textarea";
import { IEntityEventNotificationForm } from "../RoleEditor";

import useStyles from "./roleEntityEventsNotification.styles";
import { EntityEventNotificationTriggerEnum } from "roottypes";

interface IRoleEntityEventsNotificationProps {
  entityEventNotifications: IEntityEventNotificationForm[];
  handleApplyEventNotifications: (
    entityEventNotifications: IEntityEventNotificationForm[]
  ) => void;
  modelId?: string;
}

const RoleEntityEventsNotification: React.FunctionComponent<
  IRoleEntityEventsNotificationProps
> = (props: IRoleEntityEventsNotificationProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.roles
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const formik = useFormik<{
    entityEventNotifications: IEntityEventNotificationForm[];
  }>({
    initialValues: {
      entityEventNotifications: [...props.entityEventNotifications],
    },
    onSubmit: (values: {
      entityEventNotifications: IEntityEventNotificationForm[];
    }) => {},
  });

  React.useEffect(() => {
    formik.setFieldValue("entityEventNotifications", [
      ...props.entityEventNotifications,
    ]);
  }, [props.entityEventNotifications]);

  const handleFieldChange = (
    value: string | boolean,
    entityEventNotificationIndex: number,
    fieldName: string
  ) => {
    const newValues = formik.values.entityEventNotifications.map(
      (not, index) => {
        if (index === entityEventNotificationIndex) {
          return { ...not, [fieldName]: value };
        } else {
          return not;
        }
      }
    );
    formik.setFieldValue("entityEventNotifications", newValues);
    props.handleApplyEventNotifications(newValues);
  };

  const handleAddEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newEvent: IEntityEventNotificationForm = {
      text: "",
      title: "",
      trigger: EntityEventNotificationTriggerEnum.OnCreate,
    };
    const newValues: IEntityEventNotificationForm[] = [
      ...formik.values.entityEventNotifications,
      newEvent,
    ];
    formik.setFieldValue("entityEventNotifications", newValues);
    props.handleApplyEventNotifications(newValues);
  };

  const handleDeleteEvent = (index: number) => {
    const newValues = [...formik.values.entityEventNotifications];
    newValues.splice(index, 1);
    formik.setFieldValue("entityEventNotifications", newValues);
    props.handleApplyEventNotifications(newValues);
  };

  return (
    <div
      className={styles.roleEntityEventNotificationContainer}
      data-cy={"entityEventsNotificationForModel" + props.modelId}
    >
      {formik.values.entityEventNotifications.map(
        (
          entityEventNotification: IEntityEventNotificationForm,
          index: number
        ) => {
          return (
            <div key={index} className={styles.singleEventNotification}>
              <MdDelete
                onClick={() => handleDeleteEvent(index)}
                className={styles.deleteIcon}
              />
              <Checkbox
                label={getTranslatedText(staticText?.onCreate)}
                checked={
                  entityEventNotification.trigger ===
                  EntityEventNotificationTriggerEnum.OnCreate
                }
                onChange={() =>
                  handleFieldChange(
                    EntityEventNotificationTriggerEnum.OnCreate,
                    index,
                    "trigger"
                  )
                }
                labelStyles={{ width: 100 }}
              />
              <Checkbox
                label={getTranslatedText(staticText?.onAssigned)}
                checked={
                  entityEventNotification.trigger ===
                  EntityEventNotificationTriggerEnum.OnAssigned
                }
                onChange={() =>
                  handleFieldChange(
                    EntityEventNotificationTriggerEnum.OnAssigned,
                    index,
                    "trigger"
                  )
                }
                labelStyles={{ width: 100 }}
              />
              <Input
                onChange={(e) =>
                  handleFieldChange(e.target.value, index, "title")
                }
                label={getTranslatedText(staticText?.eventTitle)}
                value={entityEventNotification.title}
                Icon={BiText}
                inputDataCy={
                  "entityEvenNotificationEventTitleInputForModel" +
                  props.modelId
                }
              />
              <Textarea
                onChange={(e) =>
                  handleFieldChange(e.target.value, index, "text")
                }
                value={entityEventNotification.text}
                label={getTranslatedText(staticText?.eventDescription)}
                textareaProps={{
                  ["data-cy"]:
                    "entityEventNotificationEventDescriptionForModel" +
                    props.modelId,
                }}
              />
            </div>
          );
        }
      )}

      <Button
        onClick={handleAddEvent}
        buttonDataCy={
          "entityEventNoitificationAddEventButtonForModel" + props.modelId
        }
      >
        {getTranslatedText(staticText?.addEvent)}{" "}
        <BiPlus className={styles.plusButton} />
      </Button>
    </div>
  );
};

export default React.memo(RoleEntityEventsNotification);
