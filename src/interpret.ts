import type { Task, Parallel } from "./types/language";
import type { WorkerCom, WorkerEvent } from "./types/interpreter";

export default class Interpreter {
    program: { tasks: Task[], parallel: Parallel };
    workers: Worker[];

    constructor(program: { tasks: Task[], parallel: Parallel }) {
        this.program = program;
        this.workers = [];
    }

    handleEvent(event: WorkerCom, index: number) {
        switch (event.type) {
            case "signal":
                this.workers.forEach((worker, i) => {
                    if (i !== index) {
                        worker.postMessage(event);
                    }
                });
                break;
        }
    }

    runWorkers(tasks: String[], maxThreads: number) {
        const workerURL = new URL("./interpreterWorker.js", import.meta.url);

        if (tasks.length === 0) {
            return;
        }

        for (let i = this.workers.length; i < maxThreads; i++) {
            let task = tasks.shift();

            const worker = new Worker(workerURL);
            worker.postMessage({
                task: this.program.tasks.find((t) => t.name === task)
            } as WorkerEvent);
            this.workers.push(worker);

            worker.onmessage = (message) => {
                if (message.data === "done") {
                    worker.terminate();
                    this.workers.splice(this.workers.indexOf(worker), 1);
                    this.runWorkers(tasks, maxThreads);
                } else {
                    this.handleEvent(message.data, this.workers.indexOf(worker));
                }
            };
        }
    }

    interpret() {
        let tasks = this.program.parallel.tasks.slice();
        let maxThreads: number;
        if (this.program.parallel.maxThreads) {
            maxThreads = this.program.parallel.maxThreads;
        } else {
            maxThreads = tasks.length;
        }

        this.runWorkers(tasks, maxThreads);
    }
}