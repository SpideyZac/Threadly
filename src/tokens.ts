import { Lexer, createToken } from "chevrotain";

// Numbers
export const FloatLiteral = createToken({
    name: "FloatLiteral",
    pattern: /\d+\.\d+/,
});

export const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /\d+/,
    longer_alt: FloatLiteral,
});

// Operators
export const AdditionOperator = createToken({
    name: "AdditionOperator",
    pattern: Lexer.NA,
});

export const Plus = createToken({
    name: "Plus",
    pattern: /\+/,
    categories: AdditionOperator,
});

export const Minus = createToken({
    name: "Minus",
    pattern: /-/,
    categories: AdditionOperator,
});

export const MultiplicationOperator = createToken({
    name: "MultiplicationOperator",
    pattern: Lexer.NA,
});

export const Multiply = createToken({
    name: "Multiply",
    pattern: /\*/,
    categories: MultiplicationOperator,
});

export const Divide = createToken({
    name: "Divide",
    pattern: /\//,
    categories: MultiplicationOperator,
});

export const LParen = createToken({
    name: "LParen",
    pattern: /\(/,
});

export const RParen = createToken({
    name: "RParen",
    pattern: /\)/,
});

// Whitespace
export const Whitespace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    line_breaks: true,
    group: Lexer.SKIPPED,
});

// All tokens
export const allTokens = [
    Whitespace,
    Plus,
    Minus,
    Multiply,
    Divide,
    LParen,
    RParen,
    NumberLiteral,
    FloatLiteral,
    AdditionOperator,
    MultiplicationOperator,
];