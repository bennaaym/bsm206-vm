import IError from "./error/IError";

interface IAssembler
{
    run():[string[],IError|null];
}

export default IAssembler;