import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskBoardComponent } from './task_board/components/task-board/task-board.component';
import { TaskFormComponent } from '@features/task_form/task-form/task-form.component';

const routes: Routes = [
  { path: '', component: TaskBoardComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class FeatureModule { }
