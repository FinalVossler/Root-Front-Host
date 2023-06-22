import { useFormik } from "formik";
import React from "react";
import { BiPlus, BiText } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import { Theme } from "../../../../config/theme";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useAppSelector } from "../../../../store/hooks";
import { EntityEventNotificationTrigger } from "../../../../store/slices/roleSlice";
import Button from "../../../button";
import Checkbox from "../../../checkbox";
import Input from "../../../input";
import Textarea from "../../../textarea/Textarea";
import { IEntityEventNotificationForm } from "../RoleEditor";

import useStyles from "./roleEntityEventsNotification.styles";

interface IRoleEntityEventsNotification {
  entityEventNotifications: IEntityEventNotificationForm[];
  handleApplyEventNotifications: (
    entityEventNotifications: IEntityEventNotificationForm[]
  ) => void;
}

const RoleEntityEventsNotification: React.FunctionComponent<IRoleEntityEventsNotification> =
  (props: IRoleEntityEventsNotification) => {
    const theme: Theme = useAppSelector(
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
        trigger: EntityEventNotificationTrigger.OnCreate,
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
      <div className={styles.roleEntityEventNotificationContainer}>
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
                    EntityEventNotificationTrigger.OnCreate
                  }
                  onChange={() =>
                    handleFieldChange(
                      EntityEventNotificationTrigger.OnCreate,
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
                    EntityEventNotificationTrigger.OnAssigned
                  }
                  onChange={() =>
                    handleFieldChange(
                      EntityEventNotificationTrigger.OnAssigned,
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
                />
                <Textarea
                  onChange={(e) =>
                    handleFieldChange(e.target.value, index, "text")
                  }
                  value={entityEventNotification.text}
                  label={getTranslatedText(staticText?.eventDescription)}
                />
              </div>
            );
          }
        )}

        <Button onClick={handleAddEvent}>
          {getTranslatedText(staticText?.addEvent)}{" "}
          <BiPlus className={styles.plusButton} />
        </Button>
      </div>
    );
  };

export default React.memo(RoleEntityEventsNotification);
