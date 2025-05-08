import { Task } from 'src/app/core/services/task-api.service';

export class LoadTasks {
  static readonly type = '[Task] Load Tasks';
}

export class CreateTask {
  static readonly type = '[Task] Create Task';
  constructor(public task: Partial<Task>) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task';
  constructor(public id: number, public changes: Partial<Task>) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete Task';
  constructor(public id: number) {}
}

export class ReorderTasks {
  static readonly type = '[Task] Reorder Tasks';
  constructor(public tasks: Task[]) {}
}
