import { AxiosInstance } from "axios";
import { IEntityReadDto, IEventReadDto } from "roottypes";

const sendEventApiCall = async ({
  event,
  axios,
  createdOrUpdateEntity,
}: {
  event: IEventReadDto;
  axios: AxiosInstance;
  createdOrUpdateEntity: IEntityReadDto | null;
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
