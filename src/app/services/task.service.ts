import { Injectable } from '@angular/core';
import { IData } from '../interfaces/IData';
import { ITask } from '../interfaces/ITask';

import axios from './axios/axios.config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  async getTasks(): Promise<ITask[]> {
     const response = await axios.get('/task');
     return response.data;
  }

  async getTask(id: string): Promise<ITask> {
    const response =  await axios.get(`/task/${id}`);
    return response.data;
  }

  async createTask(task: ITask): Promise<IData> {
     const response = await axios.post('/task', task);
     return response.data;
  }

  async updateTask(id: string, task: ITask): Promise<IData> {
    const response = await axios.put(`/task/${id}`, task);
    return response.data;
  }

  async deteleTask (id: string): Promise<IData> {
    const response = await axios.delete(`/task/${id}`);
    return response.data;
  }
}
