import { AxiosInstance } from "axios";

import { IEvent } from "../globalTypes/IEvent";
import { IEntity } from "../store/slices/entitySlice";

const sendEventApiCall = async ({
  event,
  axios,
  createdOrUpdateEntity,
}: {
  event: IEvent;
  axios: AxiosInstance;
  createdOrUpdateEntity: IEntity | null;
}) => {
  let bodyData: any = {};
  if (event.requestDataIsCreatedEntity) {
    bodyData = createdOrUpdateEntity;
  } else {
    try {
      bodyData = JSON.parse(event.requestData);
    } catch (e) {
      bodyData = {};
    }
  }
  const headers = {};
  event.requestHeaders.map((header) => {
    headers[header.key] = header.value;
  });
  await axios.request({
    url: event.requestUrl,
    method: event.requestMethod,
    data: bodyData,
    headers,
  });
};

export default sendEventApiCall;
