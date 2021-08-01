import EREG from "../../enums/EREG";
import IRegister from "../../interfaces/cpu/IRegister";
import IRegisters from "../../interfaces/cpu/IRegisters";
import Register from "./Register";

/**
 * This VM has 11 registers
 * IR and CCR registers are 8 bits registers
 * All the other registers are 16 bits registers
 */ 

class Registers implements IRegisters
{
    // Singleton instance
    private static instance:Registers;


    //Properties
    private map:{[name:string]:IRegister};

    //Constructor
    private constructor()
    {
        this.map = this.registerMapping();
    }

    //Methods

    public static getInstance = (): Registers =>
    {
        if(!Registers.instance)
        {
            Registers.instance = new Registers();
        }

        return Registers.instance;
    }

    public getRegister = (name:string):IRegister => this.map[name];


    private registerMapping = () : {[name:string]:IRegister} =>
    {
        let map:{[name:string]:IRegister} = {[EREG.PC]: new Register()};

        for(let reg in EREG)
        {
            if (reg === EREG.PC) continue; 
            map[reg] = (reg === EREG.IR || reg === EREG.CCR)? new Register(1) : new Register();
        }

        return map
    }   

    //Debug;
    public debug = (): void => 
    {
        for(let reg in EREG)
        {
            console.log(`${reg.padEnd(4,' ')} => 0x${this.map[reg].read().toString(16).padStart(this.map[reg].sizeInBytes()*2,'0')}`)
        }

        console.log();
    };

}

export default Registers;