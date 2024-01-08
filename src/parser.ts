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
        this.CONSUME(Log, { ERR_MSG: "Expected log" });
        this.CONSUME(LParen, { ERR_MSG: "Expected (" });
        this.CONSUME(String, { ERR_MSG: "Expected string" });
        this.CONSUME(RParen, { ERR_MSG: "Expected )" });
    });

    public sleepClause = this.RULE("sleepClause", () => {
        this.CONSUME(Sleep, { ERR_MSG: "Expected sleep" });
        this.CONSUME(LParen, { ERR_MSG: "Expected (" });
        this.CONSUME(NumberLiteral, { ERR_MSG: "Expected integer" });
        this.CONSUME(RParen, { ERR_MSG: "Expected )" });
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
        this.CONSUME(Task, { ERR_MSG: "Expected task" });
        this.CONSUME(Indentifier, { ERR_MSG: "Expected identifier | task name" });
        this.SUBRULE(this.taskBody);
        this.CONSUME(EndTask, { ERR_MSG: "Expected endtask" });
    });

    public taskCall = this.RULE("taskCall", () => {
        this.CONSUME(Exclamation, { ERR_MSG: "Expected !" });
        this.CONSUME(Indentifier, { ERR_MSG: "Expected identifier | task name" });
    });

    public parallelBody = this.RULE("parallelBody", () => {
        this.MANY(() => {
            this.SUBRULE(this.taskCall);
        });
    });

    public parallelClause = this.RULE("parallelClause", () => {
        this.CONSUME(Parallel, { ERR_MSG: "Expected parallel" });
        this.SUBRULE(this.parallelBody);
    });

    printErrorsWithSource(inputText: string) {
        this.errors.forEach(error => {
            const startOffset = error.token.startOffset;
            const endOffset = error.token.endOffset as number;

            const beforeError = inputText.substring(startOffset - 25, startOffset);
            let errorText;
            let afterError;
            if (startOffset === endOffset) {
                errorText = inputText[startOffset];
                afterError = inputText.substring(endOffset + 1, endOffset + 25);
            } else {
                errorText = inputText.substring(startOffset, endOffset);
                afterError = inputText.substring(endOffset, endOffset + 25);
            }

            console.error(`Error at ${error.token.startLine}:${error.token.startColumn} - ${error.token.endLine}:${error.token.endColumn}`);
            process.stdout.write(`... ${beforeError}`);
            process.stdout.write(`>>> ${errorText} <<< ${error.message}   ...  `);
            process.stdout.write(`${afterError} ...\n`);
        });
    }
}