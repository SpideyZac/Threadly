import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ProgramCstNode extends CstNode {
    name: "program";
    children: ProgramCstChildren;
}

export type ProgramCstChildren = {
    statement?: StatementCstNode[];
};

export interface StatementCstNode extends CstNode {
    name: "statement";
    children: StatementCstChildren;
}

export type StatementCstChildren = {
    taskClause?: TaskClauseCstNode[];
    parallelClause?: ParallelClauseCstNode[];
};

export interface LogClauseCstNode extends CstNode {
    name: "logClause";
    children: LogClauseCstChildren;
}

export type LogClauseCstChildren = {
    Log: IToken[];
    LParen: IToken[];
    String: IToken[];
    RParen: IToken[];
};

export interface SleepClauseCstNode extends CstNode {
    name: "sleepClause";
    children: SleepClauseCstChildren;
}

export type SleepClauseCstChildren = {
    Sleep: IToken[];
    LParen: IToken[];
    NumberLiteral: IToken[];
    RParen: IToken[];
};

export interface TaskKeywordCstNode extends CstNode {
    name: "taskKeyword";
    children: TaskKeywordCstChildren;
}

export type TaskKeywordCstChildren = {
    logClause?: LogClauseCstNode[];
    sleepClause?: SleepClauseCstNode[];
    taskCall?: TaskCallCstNode[];
};

export interface TaskBodyCstNode extends CstNode {
    name: "taskBody";
    children: TaskBodyCstChildren;
}

export type TaskBodyCstChildren = {
    taskKeyword?: TaskKeywordCstNode[];
};

export interface TaskClauseCstNode extends CstNode {
    name: "taskClause";
    children: TaskClauseCstChildren;
}

export type TaskClauseCstChildren = {
    Task: IToken[];
    Indentifier: IToken[];
    taskBody: TaskBodyCstNode[];
    EndTask: IToken[];
};

export interface TaskCallCstNode extends CstNode {
    name: "taskCall";
    children: TaskCallCstChildren;
}

export type TaskCallCstChildren = {
    Exclamation: IToken[];
    Indentifier: IToken[];
};

export interface ParallelBodyCstNode extends CstNode {
    name: "parallelBody";
    children: ParallelBodyCstChildren;
}

export type ParallelBodyCstChildren = {
    taskCall?: TaskCallCstNode[];
};

export interface ParallelClauseCstNode extends CstNode {
    name: "parallelClause";
    children: ParallelClauseCstChildren;
}

export type ParallelClauseCstChildren = {
    Parallel: IToken[];
    parallelBody: ParallelBodyCstNode[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
    program(children: ProgramCstChildren, param?: IN): OUT;
    statement(children: StatementCstChildren, param?: IN): OUT;
    logClause(children: LogClauseCstChildren, param?: IN): OUT;
    sleepClause(children: SleepClauseCstChildren, param?: IN): OUT;
    taskKeyword(children: TaskKeywordCstChildren, param?: IN): OUT;
    taskBody(children: TaskBodyCstChildren, param?: IN): OUT;
    taskClause(children: TaskClauseCstChildren, param?: IN): OUT;
    taskCall(children: TaskCallCstChildren, param?: IN): OUT;
    parallelBody(children: ParallelBodyCstChildren, param?: IN): OUT;
    parallelClause(children: ParallelClauseCstChildren, param?: IN): OUT;
}