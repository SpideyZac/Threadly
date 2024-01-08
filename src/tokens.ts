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

// Strings
export const String = createToken({
    name: "String",
    pattern: /"[^"]*"/,
});

// Indentifiers
export const Indentifier = createToken({
    name: "Indentifier",
    pattern: /[a-zA-Z_]\w*/,
    longer_alt: String,
});

// Statements
export const EndTask = createToken({
    name: "EndTask",
    pattern: /endtask/,
    longer_alt: Indentifier,
});

export const Task = createToken({
    name: "Task",
    pattern: /task/,
    longer_alt: [Indentifier, EndTask],
});

export const Parallel = createToken({
    name: "Parallel",
    pattern: /parallel/,
    longer_alt: Indentifier,
});

// Keywords
export const Log = createToken({
    name: "Log",
    pattern: /log/,
    longer_alt: Indentifier,
});

export const Sleep = createToken({
    name: "Sleep",
    pattern: /sleep/,
    longer_alt: Indentifier,
});

// Whitespace
export const Whitespace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

// Symbols
export const LParen = createToken({
    name: "LParen",
    pattern: /\(/,
    longer_alt: String,
});

export const RParen = createToken({
    name: "RParen",
    pattern: /\)/,
    longer_alt: String,
});

export const Exclamation = createToken({
    name: "Exclamation",
    pattern: /!/,
    longer_alt: String,
});

// All tokens
export const allTokens = [
    Whitespace,
    Task,
    EndTask,
    Log,
    Sleep,
    Parallel,
    Indentifier,
    String,
    NumberLiteral,
    FloatLiteral,
    LParen,
    RParen,
    Exclamation,
];