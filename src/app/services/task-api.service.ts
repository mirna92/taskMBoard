import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
}

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly API_URL = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(){
    return this.http.get<Task[]>(this.API_URL);
  }

  createTask(task: Partial<Task>) {
    return this.http.post<Task>(this.API_URL, task);
  }

  updateTask(id: number, changes: Partial<Task>) {
    return this.http.patch<Task>(this.API_URL+"/"+id, changes);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
