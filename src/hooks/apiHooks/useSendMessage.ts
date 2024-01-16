import React from "react";
import { AxiosResponse } from "axios";

import { IPopulatedMessageReadDto } from "../../store/slices/chatSlice";
import IFile from "../../globalTypes/IFile";
import uploadFiles from "../../utils/uploadFiles";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { IMessageSendCommand } from "roottypes";

const useSendMessage = () => {
  const [loading, setLoading] = React.useState(false);

  const axios = useAuthorizedAxios();

  const sendMessage = (command: IMessageSendCommand, files: File[]) =>
    new Promise<IPopulatedMessageReadDto>(async (resolve, reject) => {
      setLoading(true);

      const filesToSend: IFile[] = await uploadFiles(files);
      command.files = filesToSend;

      axios
        .request<AxiosResponse<IPopulatedMessageReadDto>>({
          method: "POST",
          url: "/messages",
          data: command,
        })
        .then((res) => {
          const message: IPopulatedMessageReadDto = res.data.data;
          resolve(message);
        })
        .catch((e) => reject(e))
        .finally(() => setLoading(false));
    });

  return { sendMessage, loading };
};

export default useSendMessage;
