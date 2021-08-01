import EADRMD from "../../enums/EADRMD";
import EIDEC from "../../enums/EIDEC";
import EREG from "../../enums/EREG";
import IControlUnit from "../../interfaces/cpu/IControlUnit";
import IDecoder from "../../interfaces/cpu/IDecoder";
import IExecutor from "../../interfaces/cpu/IExecutor";
import IRegister from "../../interfaces/cpu/IRegister";
import IRegisters from "../../interfaces/cpu/IRegisters";
import IMemory from "../../interfaces/memory/IMemory";
import Memory from "../memory/Memory";
import AddressingModeDecoder from "./decoders/AddressingModeDecoder";
import InstructionDecoder from "./decoders/InstructionDecoder";
import ExecutorFactory from "./executor/ExecutorFactory";
import Registers from "./Registers";


class ControlUnit implements IControlUnit
{
    // Singleton instance
    private static instance:ControlUnit;

    //Properties
    private PC:IRegister;
    private IR:IRegister;
    private registersRef:IRegisters;
    private memoryRef:IMemory;

    //Constructor
    private constructor()
    {
        this.PC = Registers.getInstance().getRegister(EREG.PC);
        this.IR = Registers.getInstance().getRegister(EREG.IR);
        this.registersRef = Registers.getInstance();
        this.memoryRef = Memory.getInstance();
    }

    //Methods

    public static getInstance = (): ControlUnit =>
    {
        if(!ControlUnit.instance)
        {
            ControlUnit.instance = new ControlUnit();
        }

        return ControlUnit.instance;
    }

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
        // Decoding
        const addressingModeDecoder: IDecoder = new AddressingModeDecoder();
        const instructionDecoder: IDecoder = new InstructionDecoder();

        const IDEC:number = instructionDecoder.decode(this.IR.read());
        const ADRMD:number = (IDEC === EIDEC.NOP)? EADRMD.INHERENT : addressingModeDecoder.decode(this.IR.read());

        // T2 : AR <- PC, PC <- PC + 1
        if(ADRMD !== EADRMD.INHERENT)
        {
            this.registersRef.getRegister(EREG.AR).write(this.PC.read());
            this.PC.increment();
        }
       

        return {ADRMD,IDEC};
    };

    public execute = (ADRMD:number,IDEC:number): void => new ExecutorFactory().getExecutor(ADRMD,IDEC).execute();

}

export default ControlUnit;