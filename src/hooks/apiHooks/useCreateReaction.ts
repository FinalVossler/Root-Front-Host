import React from "react";
import { AxiosResponse } from "axios";

import {
  IMessage,
  chatSlice,
  IReaction,
  ReactionEnum,
} from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export type ReactionCreateCommand = {
  messageId: string;
  reaction: ReactionEnum;
};

const useCreateReaction = () => {
  const user = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createReaction = (command: ReactionCreateCommand, message: IMessage) =>
    new Promise<IReaction>((resolve, reject) => {
      dispatch(
        chatSlice.actions.addReactionToMessage({
          message,
          reaction: {
            user,
            reaction: command.reaction,
            createdAt: "",
            updatedAt: "",
          },
        })
      );

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
