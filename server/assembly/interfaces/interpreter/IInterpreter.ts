import IError from "../Error/IError";

interface IInterpreter
{
    interpret():[string[],IError|null];
}

export default IInterpreter;