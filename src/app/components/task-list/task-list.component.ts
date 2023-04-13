import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor( private task: TaskService ) {}

  ngOnInit(): void {
    this.getTaskList()
  }

  async getTaskList() {
    const tasks = await this.task.getTasks();
    console.log(tasks);

  }
}
