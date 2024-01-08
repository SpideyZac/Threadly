import { CstParser } from "chevrotain";

import { allTokens, Indentifier, Parallel, Task, Log, LParen, String, RParen, EndTask, Exclamation, Sleep, NumberLiteral } from "./tokens";

export default class Parser extends CstParser {
    constructor() {
        super(allTokens);
        this.performSelfAnalysis();
    }

    public program = this.RULE("program", () => {
        this.MANY(() => {
            this.SUBRULE(this.statement);
        });
    });

    public statement = this.RULE("statement", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.taskClause) },
            { ALT: () => this.SUBRULE(this.parallelClause) },
        ]);
    });

    public logClause = this.RULE("logClause", () => {
        this.CONSUME(Log);
        this.CONSUME(LParen);
        this.CONSUME(String);
        this.CONSUME(RParen);
    });

    public sleepClause = this.RULE("sleepClause", () => {
        this.CONSUME(Sleep);
        this.CONSUME(LParen);
        this.CONSUME(NumberLiteral);
        this.CONSUME(RParen);
    });

    public taskKeyword = this.RULE("taskKeyword", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.logClause) },
            { ALT: () => this.SUBRULE(this.sleepClause) },
            { ALT: () => this.SUBRULE(this.taskCall) },
        ]);
    });

    public taskBody = this.RULE("taskBody", () => {
        this.MANY(() => {
            this.SUBRULE(this.taskKeyword);
        });
    });

    public taskClause = this.RULE("taskClause", () => {
        this.CONSUME(Task);
        this.CONSUME(Indentifier);
        this.SUBRULE(this.taskBody);
        this.CONSUME(EndTask);
    });

    public taskCall = this.RULE("taskCall", () => {
        this.CONSUME(Exclamation);
        this.CONSUME(Indentifier);
    });

    public parallelBody = this.RULE("parallelBody", () => {
        this.MANY(() => {
            this.SUBRULE(this.taskCall);
        });
    });

    public parallelClause = this.RULE("parallelClause", () => {
        this.CONSUME(Parallel);
        this.SUBRULE(this.parallelBody);
    });
}