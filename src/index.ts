import { Lexer, generateCstDts } from "chevrotain";

import { allTokens } from "./tokens";
import Parser from "./parser";
import Visitor from "./visitor";
import Interpreter from "./interpret";

const input = `task log1
sleep(3000)
log("Hello World! (hi)")
endtask

task log2
log("Hi!")
!log1
endtask
parallel
!log1
!log2`;

const lexer = new Lexer(allTokens);
const { tokens } = lexer.tokenize(input);

const parser = new Parser();
parser.input = tokens;
const cst = parser.program();

// console.log(generateCstDts(parser.getGAstProductions()))

const visitor = new Visitor();
const result = visitor.visit(cst);

let interpreter = new Interpreter(result);
interpreter.interpret();