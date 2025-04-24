import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CreateTask, UpdateTask } from '../../../state/task.actions';
import { Store } from '@ngxs/store';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-task-form',
  imports: [
    LoaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  public taskForm!: FormGroup;
  loading = false;
  statuses = ['todo', 'in-progress', 'done'];
  @Output() formSubmit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', this.futureDateValidator],
      status: ['todo'],
    });
  }
  async ngOnInit() {
    if (this.data.taskToEdit) {
      this.taskForm.patchValue({
        title: this.data.taskToEdit.title,
        description: this.data.taskToEdit.description,
        dueDate: this.data.taskToEdit.dueDate,
        status: this.data.taskToEdit.status,
      });
    }
  }
  futureDateValidator(input: any) {
    const selectedDate = new Date(input.value);
    const currentDate = new Date();
    return selectedDate > currentDate ? null : { invalidDate: true };
  }
  submit() {
    try {
      if (!this.taskForm.valid && !this.taskForm.disabled) {
        for (const i in this.taskForm.controls) {
          this.taskForm.controls[i].markAsTouched();
        }
        return;
      }
      if (this.data.taskToEdit) {
        this.loading = true;
        this.store.dispatch(
          new UpdateTask(this.data.taskToEdit.id, this.taskForm.value)
        );
      } else {
        this.store.dispatch(new CreateTask(this.taskForm.value));
      }
      this.formSubmit.emit();
      this.taskForm.reset();
      this.dialog.closeAll();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
