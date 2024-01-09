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

    runWorkers(tasks: String[], maxThreads: number) {
        const workerURL = new URL("./interpreterWorker.js", import.meta.url);

        if (tasks.length === 0) {
            return;
        }

        for (let i = 0; i < maxThreads; i++) {
            let task = tasks.shift();

            const worker = new Worker(workerURL);
            worker.postMessage({
                task: this.program.tasks.find((t) => t.name === task)
            } as WorkerEvent);
            this.workers.push(worker);

            worker.onmessage = (message) => {
                if (message.data === "done") {
                    worker.terminate();
                    this.runWorkers(tasks, maxThreads);
                } else {
                    this.handleEvent(message.data);
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