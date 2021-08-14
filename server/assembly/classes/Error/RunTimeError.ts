import IPosition from "../../interfaces/lexer/IPosition";
import Error from "./Error";

class RunTimeError extends Error
{
    // Constructor
    constructor(details:string,position:IPosition)
    {
        super('RunTimeError',details,position);
    }
}

export default RunTimeError;