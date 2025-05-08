import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { TaskStatus } from '../models/task-status.enum';
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
public apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTasks(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Partial<Task>) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, changes: Partial<Task>) {
    return this.http.patch<Task>(this.apiUrl+"/"+id, changes);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
