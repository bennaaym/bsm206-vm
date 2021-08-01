import EREG from "../../enums/EREG";
import IControlUnit from "../../interfaces/cpu/IControlUnit";
import IRegister from "../../interfaces/cpu/IRegister";
import IRegisters from "../../interfaces/cpu/IRegisters";
import IMemory from "../../interfaces/memory/IMemory";
import Memory from "../memory/Memory";
import Registers from "./Registers";


class ControlUnit implements IControlUnit
{
    //Properties
    private PC:IRegister;
    private IR:IRegister;
    private registersRef:IRegisters;
    private memoryRef:IMemory;
    //Constructor
    constructor()
    {
        this.PC = Registers.getInstance().getRegister(EREG.PC);
        this.IR = Registers.getInstance().getRegister(EREG.IR);
        this.registersRef = Registers.getInstance();
        this.memoryRef = Memory.getInstance();
    }

    //Methods

    public fetch = (): void => 
    {   
        // T0 : AR <- PC
        // gets the address of the next instruction to be executed (PC), and assigns it to the address register(AR)
        this.registersRef.getRegister(EREG.AR).write(this.PC.read());

        // T1 : IR <- M[AR], PC <- PC + 1
        // gets the opcode specified by the address register (AR) from the memory and assigns to the instructions register(IR)
        const AR:number = this.registersRef.getRegister(EREG.AR).read();
        const opcode:number = this.memoryRef.read(AR);
        this.IR.write(opcode);
        this.PC.increment();
    };
    
    public decode = (): {ADRMD:number,IDEC:number} => 
    {
        return {'ADRMD':0,'IDEC':0}
    };

    public execute = (): void => console.log('execute');

}

export default ControlUnit;