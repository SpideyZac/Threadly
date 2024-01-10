import type { Task } from "./language";

type WorkerComType = "signal";

export interface WorkerCom {
    type: WorkerComType;
    data: { [k: string]: any };
}

export interface SignalWorkerCom extends WorkerCom {
    type: "signal";
    data: {
        signal: string;
        value?: number | string;
    };
}

export interface WorkerEvent {
    task?: Task
}