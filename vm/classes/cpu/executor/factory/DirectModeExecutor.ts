import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import BaseExecutor from "../BaseExecutor";

class DirectModeExecutor extends BaseExecutor implements IExecutor
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
                this.LDA(this.maxCommonSteps);
            
            case EIDEC.STA:
                this.STA(this.minCommonSteps);
                break;
        }
    };



    // Phases 
    private maxCommonSteps = () =>
    {
        this.T3();
        this.T4();
        this.T5();
        this.T6();
        this.T7();
    }

    private minCommonSteps = () =>
    {
        this.T3();
        this.T4();
        this.T5();
    }

    private T3 = (): void =>
    {
        // T3 : TR_H <- M[AR], AR <- AR + 1
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.TR).writeMSB(data);
        AR.increment();        
    }

    private T4 = (): void =>
    {
        // T4 : TL_L <- M[AR], PC <- PC + 1
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.TR).writeLSB(data);
        this.registersRef.getRegister(EREG.PC).increment();
    }

    private T5 = (): void =>
    {
        // T5 : AR <- TR
        const TR = this.registersRef.getRegister(EREG.TR);
        this.registersRef.getRegister(EREG.AR).write(TR.read());
    }

    private T6 = () =>
    {
        // T6 : DR_H <- M[AR], AR <- AR + 1
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeMSB(data);
        AR.increment();
    }

    private T7 = () =>
    {
        // T7 : DR_L <- M[AR]
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeLSB(data);

    }
}

export default DirectModeExecutor;