import React from "react";
import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IMicroFrontendReadDto,
  IModelReadDto,
  IPageReadDto,
  IPaymentMethodReadDto,
  IRoleReadDto,
  IUserReadDto,
  PermissionEnum,
} from "roottypes";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import MessageFilePreview from "./components/appComponents/chatComponents/message/messageFilePreview";
import { chatSlice } from "./store/slices/chatSlice";
import { EditorTypeEnum } from "./store/slices/editorSlice";
import FieldEditor from "./components/appComponents/editors/fieldEditor";
import ModelEditor from "./components/appComponents/editors/modelEditor";
import EntityEditor from "./components/appComponents/editors/entityEditor";
import UserEditor from "./components/appComponents/editors/userEditor";
import MicroFrontendEditor from "./components/appComponents/editors/microFrontendEditor";
import RoleEditor from "./components/appComponents/editors/roleEditor";
import PageEditor from "./components/appComponents/editors/pageEditor";
import useHasPermission from "./hooks/useHasPermission";
import WebsiteConfigurationEditor from "./components/appComponents/editors/websiteConfigurationEditor";
import PaymentMethodEditor from "./components/appComponents/editors/paymentMethodEditor";

interface IAppModalsAndEditorsProps {}

const AppModalsAndEditors: React.FunctionComponent<
  IAppModalsAndEditorsProps
> = (props: IAppModalsAndEditorsProps) => {
  const messageFilePreviews = useAppSelector(
    (state) => state.chat.messageFilePreviews
  );
  const editors = useAppSelector((state) => state.editor.editors);
  const theme = useAppSelector((state) => state.websiteConfiguration.theme);

  const dispatch = useAppDispatch();
  const { hasPermission } = useHasPermission();

  return (
    <React.Fragment>
      {messageFilePreviews.map((messageFilePreview) => {
        return (
          <MessageFilePreview
            key={messageFilePreview.file?._id?.toString() || ""}
            message={messageFilePreview.message}
            file={messageFilePreview.file as IFileReadDto}
            onClose={() =>
              dispatch(
                chatSlice.actions.removeMessageFilePreviews({
                  messageId: messageFilePreview.message._id.toString(),
                })
              )
            }
          />
        );
      })}

      {editors.map((e) => {
        switch (e.editorType) {
          case EditorTypeEnum.WebsiteConfiguration:
            if (hasPermission(PermissionEnum.EditConfiguration)) {
              return <WebsiteConfigurationEditor key={e.id} id={e.id} />;
            } else {
              return null;
            }

          case EditorTypeEnum.Field:
            return (
              <FieldEditor
                key={e.id}
                id={e.id}
                field={e.element as IFieldReadDto}
              />
            );
          case EditorTypeEnum.Model:
            return (
              <ModelEditor
                key={e.id}
                id={e.id}
                model={e.element as IModelReadDto}
              />
            );

          case EditorTypeEnum.Entity:
            return (
              <EntityEditor
                theme={theme}
                key={e.id}
                id={e.id}
                entity={e.element as IEntityReadDto}
                modelId={e.modelId}
              />
            );

          case EditorTypeEnum.User:
            return (
              <UserEditor
                key={e.id}
                id={e.id}
                user={e.element as IUserReadDto}
              />
            );

          case EditorTypeEnum.Role:
            return (
              <RoleEditor
                key={e.id}
                id={e.id}
                role={e.element as IRoleReadDto}
              />
            );

          case EditorTypeEnum.MicroFrontend:
            return (
              <MicroFrontendEditor
                key={e.id}
                id={e.id}
                microFrontend={e.element as IMicroFrontendReadDto}
              />
            );

          case EditorTypeEnum.Page:
            return (
              <PageEditor
                key={e.id}
                id={e.id}
                page={e.element as IPageReadDto}
              />
            );
          case EditorTypeEnum.PaymentMethod:
            return (
              <PaymentMethodEditor
                key={e.id}
                id={e.id}
                paymentMethod={e.element as IPaymentMethodReadDto}
              />
            );
          default:
            return null;
        }
      })}
    </React.Fragment>
  );
};

export default AppModalsAndEditors;
