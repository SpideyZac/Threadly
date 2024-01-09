import { generateCstDts } from "chevrotain";

import Parser from "./src/parser";

const parser = new Parser();
console.log(generateCstDts(parser.getGAstProductions()))