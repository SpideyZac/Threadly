import type { WorkerEvent, WorkerCom } from "./types/interpreter";
import type { Keyword, TaskCall } from "./types/language";

declare var self: Worker;

let keywords: Keyword[] = [];
let workerComms: WorkerCom[] = []; // for things like signal and waitfor
let index = 0;
let heartbeat = false;

/*
Heart beat explained...
When we recieve a task, we start a heartbeat. The heartbeat will run until it is told to stop.
Certain keywords will stop the heartbeat as they require data from another thread (like waitfor).
So, when we reach one of these keywords, we stop the heartbeat and wait for the other thread to send us data.
Once we recieve the data, we restart the heartbeat and continue, using the new data.
Example:
lets say in task1 we have a waitfor keyword. We start the heartbeat and run until we reach the waitfor keyword.
In task2 we have a signal keyword.
While task1 waits for the signal, its heartbeat is stopped.
When task2 sends the signal, task1's heartbeat is restarted and task1 continues.
*/

async function doHeartbeat() {
    while (heartbeat) {
        if (index >= keywords.length) {
            heartbeat = false;
            postMessage("done");
            break;
        }

        const keyword = keywords[index];

        if (keyword.type === "log") {
            console.log(keyword.value.replace(/\"/g, "")); // dont delete this console log
        } else if (keyword.type === "sleep") {
            await Bun.sleep(keyword.value);
        } else if (keyword.type === "taskCall") {
            let taskCall = keyword as TaskCall;
            keywords = keywords.slice(0, index).concat(taskCall.task.body).concat(keywords.slice(index + 1));
            index--; // so that !taskCall doesn't count as a line and we start at the first instruction of said task
        }
        index++;
    }
}

function restartHeartbeat() {
    heartbeat = true;
    doHeartbeat();
}

self.onmessage = (event: MessageEvent) => {
    const workerEvent = event.data as WorkerEvent;

    if (workerEvent.task) {
        const task = workerEvent.task;
        
        task.body.forEach((keyword) => {
            keywords.push(keyword);
        });

        restartHeartbeat();
    }
}