import type { WorkerEvent, WorkerCom } from "./types/interpreter";
import type { Keyword, TaskCall } from "./types/language";

declare var self: Worker;

let keywords: Keyword[] = [];
let workerComms: WorkerCom[] = []; // for things like signal and waitfor
let index = 0;
let heartbeat = false;

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