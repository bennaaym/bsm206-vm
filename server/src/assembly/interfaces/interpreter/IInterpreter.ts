import IError from "../error/IError";

interface IInterpreter
{
    interpret():[string[],IError|null];
}

export default IInterpreter;