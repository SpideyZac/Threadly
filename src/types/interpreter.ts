import type { Task } from "./language";

type EventType = "";
type WorkerComType = "";

export interface Event {
    type: EventType;
    data: { [k: string]: any };
}

export interface WorkerCom {
    type: WorkerComType;
    data: { [k: string]: any };
}

export interface WorkerEvent {
    task?: Task
}