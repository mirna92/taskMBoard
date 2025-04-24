import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/setting';
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

  constructor(private http: HttpClient) {}

  getTasks(){
    return this.http.get<Task[]>(API_URL);
  }

  createTask(task: Partial<Task>) {
    return this.http.post<Task>(API_URL, task);
  }

  updateTask(id: number, changes: Partial<Task>) {
    return this.http.patch<Task>(API_URL+"/"+id, changes);
  }

  deleteTask(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }

}
