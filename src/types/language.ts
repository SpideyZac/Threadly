type KeywordType = "log" | "sleep" | "taskCall";

export interface Keyword {
    [k: string]: any;
    type: KeywordType;
}

export interface LogCall extends Keyword {
    value: string;
    type: "log";
}

export interface SleepCall extends Keyword {
    value: number;
    type: "sleep";
}

export interface TaskCall extends Keyword {
    task: Task;
    type: "taskCall";
}

export interface Task {
    name: string;
    body: Keyword[];
}

export interface Parallel {
    tasks: String[];
}