import { Routes } from '@angular/router';
import { TaskBoardComponent } from './features/task_board/components/task-board/task-board.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: TaskBoardComponent },
];
