import { AxiosResponse } from "axios";
import React from "react";
import { toast } from "react-toastify";

import useAxios from "../useAxios";

export type EmailSendCommand = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const useSendMail = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const axios = useAxios();

  const sendMail = (command: EmailSendCommand) =>
    new Promise((resolve, reject) => {
      setLoading(true);

      axios
        .request<AxiosResponse<void>>({
          method: "POST",
          url: "/emails",
          data: command,
        })
        .then(() => {
          toast.success("Thanks for getting in touch. Talk soon!");
          resolve(null);
        })
        .finally(() => setLoading(false))
        .catch((e: Error) => {
          toast.error(e.message);
          reject(e);
        });
    });

  return { sendMail, loading };
};

export default useSendMail;
