import React from "react";
import { AxiosResponse } from "axios";

import { IReaction, ReactionEnum } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";

export type ReactionCreateCommand = {
  messageId: string;
  reaction: ReactionEnum;
};

const useCreateReaction = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();

  const createReaction = (command: ReactionCreateCommand) =>
    new Promise<IReaction>((resolve, reject) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IReaction>>({
          url: "/reactions",
          method: "POST",
          data: command,
        })
        .then((res) => {})
        .finally(() => setLoading(false));
    });

  return { createReaction, loading };
};

export default useCreateReaction;
