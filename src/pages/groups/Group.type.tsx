import { UserType } from "../users/Users.type";

export type GroupType = {
  id: string,
  name: string,
  color: string,
  members?: UserType[] | undefined,
};

export interface CustomMessageHandlers {
  [key: number]: (message: string) => void;
}

export interface ErrorResponse {
  message: string;
}
