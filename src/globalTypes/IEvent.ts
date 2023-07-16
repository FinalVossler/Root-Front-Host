export interface IEvent {
  eventTrigger: EventTriggerEnum;
  eventType: EventTypeEnum;

  // Redirection options
  redirectionUrl: string;
  redirectionToSelf: boolean;

  // API call options
  requestMethod: string;
  requestUrl: string;
  requestDataIsCreatedEntity: boolean;
  requestData: string;
  requestHeaders: IEventRequestHeader[];
}

export enum EventTriggerEnum {
  OnCreate = "OnCreate",
  OnUpdate = "OnUpdate",
  OnClick = "OnClick",
}
export enum EventTypeEnum {
  ApiCall = "ApiCall",
  Redirection = "Redirection",
}

export interface IEventRequestHeader {
  key: string;
  value: string;
}
