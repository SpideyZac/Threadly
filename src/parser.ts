import { CstParser } from "chevrotain";

import { AdditionOperator, FloatLiteral, LParen, MultiplicationOperator, NumberLiteral, RParen, allTokens } from "./tokens";

export default class Parser extends CstParser {
    constructor() {
        super(allTokens);
        this.performSelfAnalysis();
    }

    public expression = this.RULE("expression", () => {
        this.SUBRULE(this.additionExpression);
    });

    public additionExpression = this.RULE("additionExpression", () => {
        this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
        this.MANY(() => {
            this.CONSUME(AdditionOperator);
            this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
        });
    });

    public multiplicationExpression = this.RULE("multiplicationExpression", () => {
        this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
        this.MANY(() => {
            this.CONSUME(MultiplicationOperator);
            this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
        });
    });

    public atomicExpression = this.RULE("atomicExpression", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.parenthesisExpression) },
            { ALT: () => this.CONSUME(NumberLiteral) },
            { ALT: () => this.CONSUME(FloatLiteral) },
        ]);
    });

    public parenthesisExpression = this.RULE("parenthesisExpression", () => {
        this.CONSUME(LParen);
        this.SUBRULE(this.expression);
        this.CONSUME(RParen);
    });
}