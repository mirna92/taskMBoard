import { State, Action, StateContext } from '@ngxs/store';

import { Injectable } from '@angular/core';
import {
  LoadTasks,
  CreateTask,
  UpdateTask,
  DeleteTask,
  ReorderTasks,
} from './task.actions';
import { tap } from 'rxjs/operators';
import { Task, TaskApiService } from '../services/task-api.service';

export interface TaskStateModel {
  tasks: Task[];
}

@State<TaskStateModel>({
  name: 'task',
  defaults: {
    tasks: [],
  },
})
@Injectable()
export class TaskState {
  constructor(private taskApiService: TaskApiService) {}

  @Action(LoadTasks)
  loadTasks(ctx: StateContext<TaskStateModel>) {
    return this.taskApiService.getTasks().pipe(
      tap((tasks) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          tasks,
        });
        console.log(tasks, 'tasks2');
      })
    );
  }

  @Action(CreateTask)
  createTask(ctx: StateContext<TaskStateModel>, { task }: CreateTask) {
    return this.taskApiService.createTask(task).pipe(
      tap((newTask) => {
        const state = ctx.getState();
        ctx.setState({
          tasks: [...state.tasks, newTask],
        });
      })
    );
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, { id, changes }: UpdateTask) {
    return this.taskApiService.updateTask(id, changes).pipe(
      tap((updatedTask) => {
        const state = ctx.getState();
        const tasks = state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        );
        ctx.setState({ tasks });
      })
    );
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, { id }: DeleteTask) {
    return this.taskApiService.deleteTask(id).pipe(
      tap(() => {
        const state = ctx.getState();
        const tasks = state.tasks.filter((task) => task.id !== id);
        ctx.setState({ tasks });
      })
    );
  }

  @Action(ReorderTasks)
  reorderTasks(ctx: StateContext<TaskStateModel>, { tasks }: ReorderTasks) {
    const state = ctx.getState();
    ctx.setState({ ...state, tasks });
  }
}
