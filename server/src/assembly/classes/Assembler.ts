import IError from "../interfaces/error/IError";
import IAssembler from "../interfaces/IAssembler";
import IInterpreter from "../interfaces/interpreter/IInterpreter";
import ILexer from "../interfaces/lexer/ILexer";
import IParser from "../interfaces/parser/IParser";
import Interpreter from "./interpreter/Interpreter";
import Lexer from "./lexer/Lexer";
import Parser from "./parser/Parser";

class Assembler implements IAssembler
{
    // Properties
    private code:string;
    private lexer:ILexer;
    private parser:IParser;
    private interpreter:IInterpreter;
    
    // Constructor
    constructor(code:string)
    {
        this.code = code;
    }

    // Methods
    public run = (): [string[],IError|null] =>
    {
        // lexing phase
        this.lexer = new Lexer(this.code);
        const [tokens,lexingError] = this.lexer.tokenize();
        if(lexingError) return [[],lexingError];

        // parsing phase
        this.parser = new Parser(tokens);
        const [nodes,parsingError] = this.parser.parse();
        if(parsingError) return [[],parsingError];
        
        // interpreting phase
        this.interpreter = new Interpreter(nodes);
        const [bytes,error] = this.interpreter.interpret();
        if(error) return [[],error];

        return [bytes,null];
    }
}

export default Assembler;