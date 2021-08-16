import IRegister from "./IRegister";

interface IRegisters
{
    getRegister(name:string):IRegister; // returns the specified register
    reset():IRegisters // resets the value of all registers to zero
}

export default IRegisters