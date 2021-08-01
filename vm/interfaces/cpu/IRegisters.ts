import IRegister from "./IRegister";

interface IRegisters
{
    getRegister(name:string):IRegister; // returns the specified register
}

export default IRegisters