import EFLAG from "../../../../enums/EFLAG";
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

            case EIDEC.COM:
                this.COM();
                break;

            case EIDEC.NEG:
                this.NEG();
                break;

            case EIDEC.SAR:
                this.SAR();
                break;

            case EIDEC.SAL:
                this.SAL();
                break;
                
            case EIDEC.CLC:
                this.CLC();
                break;

            case EIDEC.CLI:
                this.CLI();
                break;
            
            case EIDEC.CLV:
                this.CLV();
                break;

            case EIDEC.STC:
                this.STC();
                break;

            case EIDEC.STI:
                this.STI();
                break;

            case EIDEC.STV:
                this.STV();
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

    private COM = (): void =>
    {
        // T3 : AC <- AC's 1's complement
        const AC = this.registersRef.getRegister(EREG.AC);
        const complement = this.ALURef.com(AC.read());
        AC.write(complement);
    }

    private NEG = (): void =>
    {
        // T3 : AC <- AC's 2's complement
        const AC = this.registersRef.getRegister(EREG.AC);
        const complement = this.ALURef.neg(AC.read());
        AC.write(complement);
    }

    private SAR = (): void =>
    {
        // T3 : AC <- shr AC
        const AR= this.registersRef.getRegister(EREG.AC)
        const res = this.ALURef.shr(AR.read());
        AR.write(res);
    }

    private SAL = (): void =>
    {
        // T3 : AC <- shr AC
        const AR= this.registersRef.getRegister(EREG.AC)
        const res = this.ALURef.shl(AR.read());
        AR.write(res);
    }

    private CLC = (): void =>
    {
        // T3 : CCR.C <- 0
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.C,0);
    }

    private CLI = (): void =>
    {
        // T3 : CCR.I <- 0
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.I,0);
    }

    private CLV = (): void =>
    {
        // T3 : CCR.V <- 0
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.V,0);
    }

    private STC = (): void =>
    {
        // T3 : CCR.C <- 1
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.C,1);
    }

    private STI = (): void =>
    {
        // T3 : CCR.C <- 1
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.I,1);
    }

    private STV = (): void =>
    {
        // T3 : CCR.C <- 1
        this.registersRef.getRegister(EREG.CCR).setFlag(EFLAG.V,1);
    }

}

export default InherentModeExecutor;