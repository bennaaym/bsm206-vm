import EIDEC from "../enums/EIDEC";
import EREG from "../enums/EREG";
import ICPU from "../interfaces/cpu/ICPU";
import IRegister from "../interfaces/cpu/IRegister";
import IVM from "../interfaces/IVM";
import IMemory from "../interfaces/memory/IMemory";
import CPU from "./cpu/CPU";
import Registers from "./cpu/Registers";
import Memory from "./memory/Memory";

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
    public run = (): [{regs:{[reg:string]:string}[],memory:string[]}|null,string|null] =>
    {
        
        this.loadCodeIntoMemory();
        
        while(true)
        {
            try
            {
                this.cpu.instructionCycle();
            }
            catch(error)
            {
                if(error === EIDEC.HLT) break;
                return [null,error.get()]
            }
        }

        // build regs array
        const registersRef = Registers.getInstance();
        let regs:{[reg:string]:string}[] = [];

        for(let reg in EREG)
        {
            const buffer:IRegister = registersRef.getRegister(reg);
            regs.push( {[reg] : buffer.read().toString(16).padStart(buffer.sizeInBytes() * 2,'0').toUpperCase()} )
        }

        // build memory array
        let memory:string[] = [];
        for(let adr =0 ;adr<this.memory.sizeInBytes();adr++)
        {
            memory.push(this.memory.read(adr).toString(16).padStart(2,'0').toUpperCase());
        }

        return [{regs,memory},null];
    }

    
    private loadCodeIntoMemory = (): void =>
    {
        this.code.forEach((byte,index) => {
            this.memory.write(index,parseInt(byte,2));
        });
    }
}

export default VM;