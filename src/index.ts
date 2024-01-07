import { Lexer, generateCstDts } from "chevrotain";

import { allTokens } from "./tokens";
import Parser from "./parser";
import Visitor from "./visitor";

const input = "1+1"
const lexer = new Lexer(allTokens);
const { tokens } = lexer.tokenize(input);

const parser = new Parser();
parser.input = tokens;
const cst = parser.expression();

// console.log(generateCstDts(parser.getGAstProductions()))

const visitor = new Visitor();
const result = visitor.visit(cst);

console.log(result);