export type ProfessionType = {
  id: string;
  name: string;
};

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  phone_number: string;
  email?: string;
  profession?: ProfessionType[];
  image_profile?: string;
};

export interface CustomMessageHandlers {
  [key: number]: (message: string) => void;
}

export interface ErrorResponse {
  message: string;
}
