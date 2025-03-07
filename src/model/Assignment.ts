import Driver from "./Driver.js";
import type Plot from "./Plot.js";
import type Task from "./Task.js";

export default class Assignment {
  constructor(
    public id: number,
    public worker: Driver,
    public date: Date,
    public type: AssignmentType,
    public time: number,
    public plot?: Plot,
    public task?: Task,
    public value?: number,
  ) {}
}

export enum AssignmentType {
  CULTURE = "CULTURE",
  METHA = "METHA",
  OTHER = "OTHER",
  SLURRY = "SLURRY",
}