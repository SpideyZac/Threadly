import { tokenMatcher } from "chevrotain";

import type {
    ExpressionCstChildren,
    AdditionExpressionCstChildren,
    MultiplicationExpressionCstChildren,
    AtomicExpressionCstChildren,
    ParenthesisExpressionCstChildren
} from "./types/visitor";
import Parser from "./parser";
import { Multiply, Plus } from "./tokens";

const parser = new Parser();
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export default class Visitor extends BaseCstVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    public expression(ctx: ExpressionCstChildren) {
        return this.visit(ctx.additionExpression);
    }

    public additionExpression(ctx: AdditionExpressionCstChildren) {
        let result = this.visit(ctx.lhs);

        if (ctx.rhs) {
            ctx.rhs.forEach((rhs, index) => {
                let rhsValue = this.visit(rhs);
                let operator = ctx.AdditionOperator![index];

                if (tokenMatcher(operator, Plus)) {
                    result += rhsValue;
                } else {
                    result -= rhsValue;
                }
            });
        }

        return result;
    }

    public multiplicationExpression(ctx: MultiplicationExpressionCstChildren) {
        let result = this.visit(ctx.lhs);

        if (ctx.rhs) {
            ctx.rhs.forEach((rhs, index) => {
                let rhsValue = this.visit(rhs);
                let operator = ctx.MultiplicationOperator![index];

                if (tokenMatcher(operator, Multiply)) {
                    result *= rhsValue;
                } else {
                    result /= rhsValue;
                }
            });
        }

        return result;
    }

    public atomicExpression(ctx: AtomicExpressionCstChildren) {
        if (ctx.parenthesisExpression) {
            return this.visit(ctx.parenthesisExpression);
        } else if (ctx.NumberLiteral) {
            return Number(ctx.NumberLiteral[0].image);
        } else if (ctx.FloatLiteral) {
            return Number(ctx.FloatLiteral[0].image);
        }
    }

    public parenthesisExpression(ctx: ParenthesisExpressionCstChildren) {
        return this.visit(ctx.expression);
    }
}