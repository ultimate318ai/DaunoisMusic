import * as antlr4 from "antlr4";
import * as ECMAScriptLexer from "./lib/ECMAScriptLexer.js";
import * as ECMAScriptParser from "./lib/ECMAScriptParser.js";

const input = "{x: 1}";

const chars = new antlr4.InputStream(input);
const lexer = new ECMAScriptLexer.ECMAScriptLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ECMAScriptParser.ECMAScriptParser(tokens);
const tree = parser.program();

console.log(tree.toStringTree(parser.ruleNames));
