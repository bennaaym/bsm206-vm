import EIDEC from "../enums/EIDEC";
import EREG from "../enums/EREG";
import ICPU from "../interfaces/cpu/ICPU";
import IRegister from "../interfaces/cpu/IRegister";
import IVM from "../interfaces/IVM";
import IMemory from "../interfaces/memory/IMemory";
import CPU from "./cpu/CPU";
import Registers from "./cpu/Registers";
import Memory from "./memory/Memory";
import { performance } from "perf_hooks";
import MaxExecutionTimeError from "./error/MaxExecutionTimeError";

class VM implements IVM
{
    // Properties
    private code:string[];
    private cpu : ICPU;
    private memory :IMemory;
    
    // Constructor
    constructor(code:string[])
    {
        this.code = code;
        this.cpu = CPU.getInstance();
        this.memory = Memory.getInstance();
    }

    // Methods
    public run = (): [{regs:{[reg:string]:string}[],memory:string[]}[]|null,string|null] =>
    {
        
        this.loadCodeIntoMemory();
        
        const MAX_TIME  = 30 * 1000 // 30 seconds
        const startTime = performance.now();
        let output: {regs:{[reg:string]:string}[],memory:string[]}[] = [];

        while(true)
        {
            try
            {
                this.cpu.instructionCycle();
                
                if(performance.now() - startTime > MAX_TIME)
                {
                    throw new MaxExecutionTimeError("maximum execution time threshold exceeded, likely to have an infinite loop or an << HLT >> instruction not found");
                }

                output.push({regs:this.buildRegsArray(),memory:this.buildMemoryView()});
            }
            catch(error)
            {
                if(error === EIDEC.HLT) break;
                return [null,error.get()];
            }
        }
        
        return [output,null];
    }

    
    private loadCodeIntoMemory = (): void =>
    {
        this.code.forEach((byte,index) => {
            this.memory.write(index,parseInt(byte,2));
        });
    }

    // return an array of object {reg:value}
    private buildRegsArray = ():{[reg:string]:string}[] =>
    {
        const registersRef = Registers.getInstance();
        let regs:{[reg:string]:string}[] = [];

        for(let reg in EREG)
        {
            const buffer:IRegister = registersRef.getRegister(reg);
            regs.push( {[reg] : buffer.read().toString(16).padStart(buffer.sizeInBytes() * 2,'0').toUpperCase()} )
        }

        return regs;
    }

    // returns the memory view as an array of strings
    private buildMemoryView = ():string[] =>
    {
        // build memory array
        let memory:string[] = [];
        for(let adr =0 ;adr<this.memory.sizeInBytes();adr++)
        {
            memory.push(this.memory.read(adr).toString(16).padStart(2,'0').toUpperCase())
        }

        return memory;
    }

}

export default VM;