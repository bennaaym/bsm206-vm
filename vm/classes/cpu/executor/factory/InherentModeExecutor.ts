import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IALU from "../../../../interfaces/cpu/IALU";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import IRegisters from "../../../../interfaces/cpu/IRegisters";
import ALU from "../../ALU";
import Registers from "../../Registers";

class InherentModeExecutor implements IExecutor
{
     // Properties
     private IDEC:number;
     private registersRef :IRegisters;
     private ALURef: IALU;
 
     // Constructors
     constructor(IDEC:number)
     {
         this.registersRef = Registers.getInstance();
         this.ALURef = ALU.getInstance();
         this.IDEC = IDEC;
     }

    // Methods
    public execute = (): void =>
    {
        switch(this.IDEC)
        {
            case EIDEC.CLR:
                this.CLR();
                break;

            case EIDEC.DECR:
                this.DECR();
                break;

            case EIDEC.INCR:
                this.INCR();
                break;

            case EIDEC.HLT:
                this.HLT();
                break;

            default:
                this.NOP();
                
        }
    };

    private NOP = (): void => {};
    private HLT = (): void => {throw EIDEC.HLT};
    
    private CLR = (): void => 
    {
        // T3 : AC <- 0000H
        this.registersRef.getRegister(EREG.AC).write(0x0000);
    }

    private DECR = (): void =>
    {
        // T3 : AC <- AC - 1
        const AC = this.registersRef.getRegister(EREG.AC);
        const {sub} = this.ALURef.sub(AC.read(),1,0);
        AC.write(sub);
    }

    private INCR = (): void =>
    {
        // T3 : AC <- AC + 1
        this.registersRef.getRegister(EREG.AC).increment();
    }

}

export default InherentModeExecutor;