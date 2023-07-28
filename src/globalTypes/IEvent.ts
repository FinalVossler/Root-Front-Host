import { IMicroFrontend } from "../store/slices/microFrontendSlice";

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

  microFrontend?: IMicroFrontend;
}

export enum EventTriggerEnum {
  OnCreate = "OnCreate",
  OnUpdate = "OnUpdate",
  OnClick = "OnClick",
}
export enum EventTypeEnum {
  ApiCall = "ApiCall",
  Redirection = "Redirection",
  MicroFrontendRedirection = "MicroFrontendRedirection",
}

export interface IEventRequestHeader {
  key: string;
  value: string;
}

export type EventCommand = {
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

  microFrontendId?: string;
};
