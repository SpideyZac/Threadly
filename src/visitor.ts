import { tokenMatcher } from "chevrotain";

import type * as types from "./types/visitor";
import type { LogCall, SleepCall, TaskCall, Keyword, Parallel, Task } from "./types/language";
import Parser from "./parser";
import {} from "./tokens";

const parser = new Parser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export default class Visitor extends BaseCstVisitor {
    tasks: Task[] = [];
    parallel: Parallel = {
        tasks: [],
    };

    constructor() {
        super();
        this.validateVisitor();
    }

    program(ctx: types.ProgramCstChildren) {
        if (ctx.statement) {
            ctx.statement.forEach((statement) => this.visit(statement));
        }

        return {
            tasks: this.tasks,
            parallel: this.parallel,
        };
    }

    statement(ctx: types.StatementCstChildren) {
        if (ctx.taskClause) {
            this.visit(ctx.taskClause);
        } else if (ctx.parallelClause) {
            this.visit(ctx.parallelClause);
        }
    }

    logClause(ctx: types.LogClauseCstChildren): LogCall {
        return {
            value: ctx.String[0].image,
            type: "log",
        } as LogCall;
    }

    sleepClause(ctx: types.SleepClauseCstChildren) {
        return {
            value: Number(ctx.NumberLiteral[0].image),
            type: "sleep",
        } as SleepCall;
    }

    taskCall(ctx: types.TaskCallCstChildren) {
        let task = this.tasks.find((task) => task.name === ctx.Indentifier[0].image);

        if (!task) {
            throw new Error(`Task ${ctx.Indentifier[0].image} does not exist`);
        }

        return {
            task: task as Task,
            type: "taskCall",
        } as TaskCall;
    }

    taskKeyword(ctx: types.TaskKeywordCstChildren) {
        if (ctx.logClause) {
            return this.visit(ctx.logClause);
        } else if (ctx.sleepClause) {
            return this.visit(ctx.sleepClause);
        } else if (ctx.taskCall) {
            return this.visit(ctx.taskCall);
        }
    }

    taskBody(ctx: types.TaskBodyCstChildren) {
        const body: Keyword[] = [];
        if (ctx.taskKeyword) {
            ctx.taskKeyword.forEach((keyword) => body.push(this.visit(keyword)));
        }
        return body;
    }

    taskClause(ctx: types.TaskClauseCstChildren) {
        const task: Task = {
            name: ctx.Indentifier[0].image,
            body: [],
        };
        this.tasks.push(task);
        this.tasks[this.tasks.length - 1].body = this.visit(ctx.taskBody);
    }

    parallelBody(ctx: types.ParallelBodyCstChildren) {
        if (ctx.taskCall) {
            ctx.taskCall.forEach((taskCall) => {
                this.parallel.tasks.push(this.visit(taskCall).task.name);
            });
        }
    }

    parallelClause(ctx: types.ParallelClauseCstChildren) {
        this.visit(ctx.parallelBody);
    }
}