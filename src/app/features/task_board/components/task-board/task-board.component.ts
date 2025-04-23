import { Component } from '@angular/core';
import { Task } from '../../../../services/task-api.service';
import { Store } from '@ngxs/store';
import { DeleteTask, LoadTasks, ReorderTasks, UpdateTask } from '../../../../state/task.actions';
import { TaskSelectors } from '../../../../state/task.selectors';
import {DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task_form/task-form/task-form.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-task-board',
  imports: [DragDropModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {
  todoTasks: Task[]| undefined;
  inProgressTasks!: Task[];
  doneTasks!: Task[];
  taskToEdit: Task | null = null;
  tasks:Task[]=[];
  statuses = ['todo', 'in-progress', 'done'];
  constructor(private store: Store,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadTasks());

  this.store.select(TaskSelectors.getTodoTasks).subscribe(tasks => {
    this.todoTasks = tasks;
  });

  this.store.select(TaskSelectors.getInProgressTasks).subscribe(tasks => {
    this.inProgressTasks = tasks;
  });

  this.store.select(TaskSelectors.getDoneTasks).subscribe(tasks => {
    this.doneTasks = tasks;
  });
}

  onDrop(event: any) {
    const newStatus = event.container.id;
    const taskId = event.item.data.id;
    this.store.dispatch(new UpdateTask(taskId, { status:newStatus }));
  }
  onReorder(tasks: any) {
    console.log(tasks,'order');
    
    this.store.dispatch(new ReorderTasks(tasks));
  }
  onEdit(task: Task|null) {
    this.taskToEdit = task;
    const dialogRef = this.dialog.open(TaskFormComponent, {
      disableClose: false,
      data: {taskToEdit:this.taskToEdit}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result)  this.store.dispatch(new LoadTasks());
    });
  }

  onDeleteTask = async (task:Task) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data:'Are you sure you want to delete this task?'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) this.onDelete(task);
    });
  }
  onDelete(task:Task){
    this.store.dispatch(new DeleteTask(task.id))
  }
}