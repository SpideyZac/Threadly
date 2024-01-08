import type { Task, Parallel } from "./types/language";
import type { Event, WorkerEvent } from "./types/interpreter";

export default class Interpreter {
    program: { tasks: Task[], parallel: Parallel };
    workers: Worker[];

    constructor(program: { tasks: Task[], parallel: Parallel }) {
        this.program = program;
        this.workers = [];
    }

    handleEvent(event: Event) {
        switch (event.type) {
            
        }
    }

    interpret() {
        const workerURL = new URL("./interpreterWorker.js", import.meta.url);
    
        this.program.parallel.tasks.forEach((task) => {
            const worker = new Worker(workerURL);
            worker.postMessage({
                task: this.program.tasks.find((t) => t.name === task)
            } as WorkerEvent);
            this.workers.push(worker);
    
            worker.onmessage = (message) => {
                if (message.data === "done") {
                    worker.terminate();
                } else {
                    this.handleEvent(message.data);
                }
            };
        });
    }
}