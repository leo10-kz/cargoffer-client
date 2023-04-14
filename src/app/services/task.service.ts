import { Injectable } from '@angular/core';
import { IData } from '../interfaces/IData';
import { ITask, TaskForm } from '../interfaces/ITask';

import axios from './axios/axios.config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  async getTasks(name?: string | null): Promise<ITask[]> {

    let response;

    if (name) {
      response = await axios.get(`/task?name=${name}`);
    } else {
      response = await axios.get(`/task`);
    }
     return response.data.tasks;
  }

  async getTask(id: string): Promise<ITask> {
    const response =  await axios.get(`/task/${id}`);
    return response.data.task;
  }

  async createTask(task: TaskForm): Promise<any> {
     const response = await axios.post('/task', task);
     return response.data;
  }

  async updateTask(id: string, task: TaskForm): Promise<IData> {
    const response = await axios.put(`/task/${id}`, task);
    return response.data;
  }

  async deteleTask (id: string): Promise<IData> {
    const response = await axios.delete(`/task/${id}`);
    return response.data;
  }
}
