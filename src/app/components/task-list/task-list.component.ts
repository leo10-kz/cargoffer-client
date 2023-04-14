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
// Creo tres arrays para poder utilizar en el drop
  taskList: ITask[] = [];
  taskProgress: ITask[] = [];
  taskDone: ITask[] = [];

  // instancio mmi servisio para poder utilizar sus metodos
  constructor( private task: TaskService ) {}

  ngOnInit(): void {
    this.getTaskList()
  }

  // Creo una funcion basica para pedir mi lista de tareas y las lleno en mi taskList que es el arrego
  // que se posicionara en To Do
  async getTaskList() {
    const tasks = await this.task.getTasks();

    // Hago el map solo para poner en mayuscula la primera letra del nombre
    // ya que guardo todo en miniscula en la BD
    let formatTask = tasks.map(t => {
       let first = t.name[0].toLocaleUpperCase();
       let restName = t.name.substring(1);
       let name = first + restName;

      return  {
        _id: t._id,
        name: name,
        description: t.description,
        category: t.category,
        expitarionDate: t.expitarionDate
      }
    })

    this.taskList=formatTask;

  }

  // De mis servicios utilizo el metodo delete y le paso el id del task en el que esto para poder eliminarlo
  async deleteTask(id: string) {
    const taskDelete = await this.task.deteleTask(id);
    alert(taskDelete.message),
    await this.getTaskList();
  }

  /**
   *"Drop" se llama cuando se suelta una tarjeta en una de las tres columnas. Si la tarjeta se suelta en la misma columna en la que se encontraba anteriormente, la función moveItemInArray mueve la tarjeta dentro del mismo arreglo para actualizar su posición. En cambio, si la tarjeta se suelta en una columna diferente, la función transferArrayItem mueve la tarjeta de un arreglo a otro.
   *
   */
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
    console.log("progress", this.taskProgress)
  }
}
