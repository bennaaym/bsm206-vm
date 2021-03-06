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
                this.LDA();
                break;

            case EIDEC.LDAX:
                this.LDAX();
                break;

            case EIDEC.LDAS:
                this.LDAS();
                break;

            case EIDEC.ADD:
                this.ADD();
                break;
                
            case EIDEC.ADDC:
                this.ADDC();
                break;

            case EIDEC.SUB:
                this.SUB();
                break;

            case EIDEC.SUBC:
                this.SUBC();
                break;

            case EIDEC.DIV:
                this.DIV();
                break;

            case EIDEC.MUL:
                this.MUL();
                break;
                
            case EIDEC.AND:
                this.AND();
                break;
                
            case EIDEC.OR:
                this.OR();
                break;
            
            case EIDEC.XOR:
                this.XOR();
                break;
        }
    };



    // Methods
    protected LDAX () 
    {
        super.LDAX();
        this.registersRef.getRegister(EREG.PC).increment();
    }

    protected LDAS ()
    {
        super.LDAS();
        this.registersRef.getRegister(EREG.PC).increment();
    }

    // Phases 
    protected maxCommonSteps = () =>
    {
        this.T3();
        this.T4();
    }


    private T3 = (): void =>
    {
        // T3 : DR_H <- M[AR], AR <- AR + 1 
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeMSB(data);
        AR.increment();
    }

    private T4 = (): void =>
    {
        // T4 : DR_L <- M[AR], PC <- PC + 1
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeLSB(data);
        this.registersRef.getRegister(EREG.PC).increment();
    }

}

export default ImmediateModeExecutor;