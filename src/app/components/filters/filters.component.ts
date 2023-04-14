import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ITask } from 'src/app/interfaces/ITask';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  inputValue = new FormControl(''); // Instacia de form control que luego su valor lo recibira value
  value: string |  null = ""
  taskSearch: ITask[] = []; // resibe la busqueda de onSubmit

  constructor(private taskSevice: TaskService) {}
  async ngOnInit() {
    this.onChangeValue();
  }

// inputValue recibe el valor de lo recibo por input y se lo asigno a value como un (e.target.name: [e.target.value])
  onChangeValue() {
      this.inputValue.valueChanges.pipe(
      tap(res => this.value = res)
    ).subscribe()

  }

  // onSubmit para la busqueda de tareas donde llamo a mi servcio getTask pero esta ves le paso el value
  // que sera recibido por mi servicio como una Query
 async onSubmit() {

  if (this.value) {

    const search = await this.taskSevice.getTasks(this.value.split(" ").join(""));
     if (search) {
       this.taskSearch = search;
     } else {
       this.taskSearch = [];
     }
  } else {
    this.taskSearch = [];
  }
   console.log(this.taskSearch);

  }

  // onDeleteCard para borrar de mi taskSearch las tarjetas de busqueda
  onDeleteCard(i: string) {
  let  filterSearch =  this.taskSearch.filter(t => t._id !== i)
   this.taskSearch = filterSearch;

  }
}
