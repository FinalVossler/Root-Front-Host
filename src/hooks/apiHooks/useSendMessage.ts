import React from "react";
import { AxiosResponse } from "axios";

import { IMessage, IPopulatedMessage } from "../../store/slices/chatSlice";
import IFile from "../../globalTypes/IFile";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type MessageSendCommand = {
  from: IMessage["from"];
  to: IMessage["to"];
  message: IMessage["message"];
  files: IMessage["files"];
};

const useSendMessage = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();

  const sendMessage = (command: MessageSendCommand, files: File[]) =>
    new Promise<IPopulatedMessage>(async (resolve, reject) => {
      setLoading(true);

      const filesToSend: IFile[] = await uploadFiles(files);
      command.files = filesToSend;

      axios
        .request<AxiosResponse<IPopulatedMessage>>({
          method: "POST",
          url: "/messages",
          data: command,
        })
        .then((res) => {
          const message: IPopulatedMessage = res.data.data;
          resolve(message);
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { sendMessage, loading };
};

export default useSendMessage;
