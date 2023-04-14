import { Component, OnInit } from '@angular/core';
import { ITask, TaskForm } from 'src/app/interfaces/ITask';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskForm = {
    name: "",
    description: "",
    category: "",
    expitarionDate: new Date()
  }

  edit: boolean = false;
 params: any

constructor(private taskServise: TaskService, private router: Router, private activateRoute: ActivatedRoute) {}

  async ngOnInit() {
     this.params = this.activateRoute.snapshot.params;

    if (this.params) {
      const taskId = await this.taskServise.getTask(this.params.id);


      this.task = {
        name: taskId.name,
        description: taskId.description,
        category: taskId.category,
        expitarionDate: taskId.expitarionDate
      };
      this.edit = true;
    }
  }

  async createTask() {
    const taskCreate = await this.taskServise.createTask(this.task);
    if (taskCreate.hasOwnProperty('error')) {
       alert(`Could not create Task: ${taskCreate}`)
       this.task = {
         name: "",
         description: "",
         category: "",
         expitarionDate: new Date()
       }
    } else {
       this.router.navigate(['/'])
    }

  }

  async updateTask( ) {
    const taskUpdate = await this.taskServise.updateTask(this.params, this.task);
    if (taskUpdate) {
      alert(taskUpdate.message)
      this.router.navigate(['/'])
   } else {
    alert('Update Rejected');

   }
  }

}
