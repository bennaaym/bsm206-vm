import IPosition from "../../interfaces/lexer/IPosition";
import Error from "./Error";

class SyntaxError extends Error
{
    // Constructor
    constructor(details:string,position:IPosition)
    {
        super('SyntaxError',details,position);
    }
}

export default SyntaxError;