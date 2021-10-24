export type ResponseTodoFromAPI = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoToAPIType = {
  userId: number;
  title: string;
  completed: boolean;
};

export type GetAPIResponse = Array<ResponseTodoFromAPI> | false;
export type MutationAPIResponse = ResponseTodoFromAPI | false;
