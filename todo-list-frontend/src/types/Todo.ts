export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
}
export type CreateTodoPayload = {
  title: string;
  description?: string;
  completed: boolean;
};