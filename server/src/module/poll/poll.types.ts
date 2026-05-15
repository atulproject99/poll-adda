export interface IOption {
  value: string;
}

export interface IQuestion {
  question: string;
  required?: boolean;
  options?: IOption[];
}

export interface CreatePollRequestType {
  title: string;
  description?: string;
  responseMode?: "anonymous" | "authenticated";
  expiresAt?: Date | string | null;
  isPublished?: boolean;
  questions: IQuestion[];
  createdBy?: string;
}


