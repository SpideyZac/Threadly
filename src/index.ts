#!/usr/bin/env bun

import { Lexer } from "chevrotain";
import { Command } from "commander";
import figlet from "figlet";

import { allTokens } from "./tokens";
import Parser from "./parser";
import Visitor from "./visitor";
import Interpreter from "./interpret";

const program = new Command();
console.log(figlet.textSync("Threadly"));

program
    .version("0.0.2")
    .description("The interpreter for the Threadly language")
    .option("-f, --file <file>", "The file to interpret")
    .option("-c", "--clear", "Clear the console before running")
    .parse(process.argv);

const options = program.opts();

if (!options.file) {
    console.error("No file specified; Run with --help for usage");
    process.exit(1);
}

const file = Bun.file(options.file);
file.text().then((text) => {
    if (options.clear) {
        console.clear();
    } else {
        console.log("\n".repeat(50));
    }
    const input = text;

    const lexer = new Lexer(allTokens);
    const { tokens } = lexer.tokenize(input);

    const parser = new Parser();
    parser.input = tokens;
    const cst = parser.program();

    if (parser.errors.length > 0) {
        parser.printErrorsWithSource(input);
    } else {
        const visitor = new Visitor();
        const result = visitor.visit(cst);

        let interpreter = new Interpreter(result);
        interpreter.interpret();
    }
}).catch(() => {
    console.error(`Could not read file "${options.file}"`);
    process.exit(1);
});