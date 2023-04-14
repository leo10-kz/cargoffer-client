import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/ITask';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList: ITask[] = [];
  taskProgress: ITask[] = [];
  taskDone: ITask[] = [];

  constructor( private task: TaskService ) {}

  ngOnInit(): void {
    this.getTaskList()
  }

  async getTaskList() {
    const tasks = await this.task.getTasks();
    console.log(tasks);

    this.taskList=tasks

  }

  async deleteTask(id: string) {
    const taskDelete = await this.task.deteleTask(id);
    alert(taskDelete.message),
    this.getTaskList();
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
