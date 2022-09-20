export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface Payment {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export type Status = 'none' | 'requested' | 'failed' | 'success';
