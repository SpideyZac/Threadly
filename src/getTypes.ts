import { generateCstDts } from "chevrotain";

import Parser from "./parser";

const parser = new Parser();
console.log(generateCstDts(parser.getGAstProductions()))