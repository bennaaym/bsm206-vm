import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import BaseExecutor from "../BaseExecutor";

class ImmediateModeExecutor extends BaseExecutor implements IExecutor
{
 
    // Constructor  
    constructor(IDEC:number)
    {
        super(IDEC);
    }

    // Methods
    public execute = (): void =>
    {
        switch(this.IDEC)
        {
            case EIDEC.LDA:
                this.LDA(this.commonSteps);
                break;
        }
    };



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