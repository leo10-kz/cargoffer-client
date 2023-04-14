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
  inputValue = new FormControl('');
  value: string |  null = ""
  taskSearch: ITask[] = [];

  constructor(private taskSevice: TaskService) {}
  ngOnInit(): void {

    this.onChangeValue();
  }

  onChangeValue() {
      this.inputValue.valueChanges.pipe(
      tap(res => this.value=res)
    ).subscribe()

  }

 async onSubmit() {

  if (this.value) {
    const search = await this.taskSevice.getTasks(this.value)
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

}
