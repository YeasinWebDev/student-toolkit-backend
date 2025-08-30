import { Types } from "mongoose";


export interface ISchedule {
    userId: Types.ObjectId,
    subject: string,
    instructor: string,
    day: string,
    start: string,
    end: string,
    color: string,
    location: string
}