import axios from "axios";
import { GetAPIResponse, MutationAPIResponse } from "../types/types";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/todos",
});

export const todosAPI = {
  async getTodos() {
    try {
      const res = await instance.get<GetAPIResponse>("/");

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async addTodo(userId: number, title: string, completed: boolean) {
    try {
      const res = await instance.post<MutationAPIResponse>("/", {
        userId,
        title,
        completed,
      });

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async putTodo(id: number, userId: number, title: string, completed: boolean) {
    try {
      const res = await instance.put<MutationAPIResponse>(`/${id}`, {
        id,
        userId,
        title,
        completed,
      });

      return res.data;
    } catch (e) {
      return false;
    }
  },
  async deleteTodo(id: number) {
    try {
      const res = await instance.delete<MutationAPIResponse>(`/${id}`);

      return res.data;
    } catch (e) {
      return false;
    }
  },
};
