import EIDEC from "../../../enums/EIDEC";
import EREG from "../../../enums/EREG";
import IExecutor from "../../../interfaces/cpu/IExecutor";
import IRegisters from "../../../interfaces/cpu/IRegisters";
import IMemory from "../../../interfaces/memory/IMemory";
import Memory from "../../memory/Memory";
import Registers from "../Registers";
import ExecutorFactory from "./ExecutorFactory";

class ImmediateModeExecutor  implements IExecutor
{
    // Properties
    private IDEC:number;
    private memoryRef : IMemory;
    private registersRef :IRegisters;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
        this.memoryRef = Memory.getInstance();
        this.registersRef = Registers.getInstance();
    }

    // Methods
    public execute = (): void =>
    {
        switch(this.IDEC)
        {
            case EIDEC.LDA:
                this.LDA();
                break;
        }
    };


    
    public LDA = () =>
    {
        this.commonSteps();

        // T5 : AC <- DR
        const DR = this.registersRef.getRegister(EREG.DR);
        this.registersRef.getRegister(EREG.AC).write(DR.read());
    }



    



    // Phases 
    public commonSteps = () =>
    {
        this.T3();
        this.T4();
    }

    public T3 = (): void =>
    {
        // T3 : DR_H <- M[AR], AR <- AR + 1 
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeMSB(data);
        AR.increment();
    }

    public T4 = (): void =>
    {
        // T4 : DR_L <- M[AR], PC <- PC + 1
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeLSB(data);
        this.registersRef.getRegister(EREG.PC).increment();
    }
}

export default ImmediateModeExecutor;