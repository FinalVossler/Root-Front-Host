import React from "react";
import { AxiosResponse } from "axios";

import { chatSlice } from "../../store/slices/chatSlice";
import useAuthorizedAxios from "../useAuthorizedAxios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  IMessageReadDto,
  IReactionCreateCommand,
  IReactionReadDto,
} from "roottypes";

const useCreateReaction = () => {
  const user = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAuthorizedAxios();
  const dispatch = useAppDispatch();

  const createReaction = (
    command: IReactionCreateCommand,
    message: IMessageReadDto
  ) =>
    new Promise<IReactionReadDto>((resolve, reject) => {
      dispatch(
        chatSlice.actions.addReactionToMessage({
          message,
          reaction: {
            _id: "",
            user,
            reaction: command.reaction,
            createdAt: "",
            updatedAt: "",
          },
        })
      );

      setLoading(true);
      axios
        .request<AxiosResponse<IReactionReadDto>>({
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
