export interface ITask {
   _id: string;
   name: string;
   description: string;
   category: string;
   expitarionDate: Date;
}

export interface TaskForm {
   name: string;
   description: string;
   category: string;
   expitarionDate: Date;
}
