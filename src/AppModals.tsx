import React from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MessageFilePreview from "./components/chatComponents/message/messageFilePreview";
import { chatSlice } from "./store/slices/chatSlice";
import { IFileReadDto } from "roottypes";

interface IAppModalsProps {}

const AppModals: React.FunctionComponent<IAppModalsProps> = (
  props: IAppModalsProps
) => {
  const messageFilePreviews = useAppSelector(
    (state) => state.chat.messageFilePreviews
  );

  const dispatch = useAppDispatch();
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
    </React.Fragment>
  );
};

export default AppModals;
