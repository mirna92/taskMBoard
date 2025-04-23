import { Selector } from '@ngxs/store';
import { MyStateModel } from './mystate.model';
import { TaskState } from './task.state';
export class TaskSelectors {
  @Selector([TaskState])
  static getAllTasks(state: MyStateModel) {
    return state.tasks;
  }

  @Selector([TaskState])
  static getTodoTasks(state: MyStateModel) {
    return state.tasks.filter((task) => task.status === 'todo');
  }

  @Selector([TaskState])
  static getInProgressTasks(state: MyStateModel) {
    return state.tasks.filter((task) => task.status === 'in-progress');
  }

  @Selector([TaskState])
  static getDoneTasks(state: MyStateModel) {
    return state.tasks.filter((task) => task.status === 'done');
  }
}
