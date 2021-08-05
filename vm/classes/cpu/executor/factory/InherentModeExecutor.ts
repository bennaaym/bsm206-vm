import EFLAG from "../../../../enums/EFLAG";
import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IALU from "../../../../interfaces/cpu/IALU";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import IRegisters from "../../../../interfaces/cpu/IRegisters";
import IMemory from "../../../../interfaces/memory/IMemory";
import Memory from "../../../memory/Memory";
import ALU from "../../ALU";
import Registers from "../../Registers";

class InherentModeExecutor implements IExecutor
{
     // Properties
     private IDEC:number;
     private registersRef :IRegisters;
     private ALURef: IALU;
     private memoryRef: IMemory;
 
     // Constructors
     constructor(IDEC:number)
     {
         this.registersRef = Registers.getInstance();
         this.ALURef = ALU.getInstance();
         this.memoryRef = Memory.getInstance();
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

            case EIDEC.DECX:
                this.DECX();
                break;

            case EIDEC.INCX:
                this.INCX();
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
            
            case EIDEC.PSH:
                this.PSH();
                break;
            
            case EIDEC.PUL:
                this.PUL();
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

    private DECX = (): void =>
    {
        // T3 : IX <- IX - 1
        const IX = this.registersRef.getRegister(EREG.IX);
        const {sub} = this.ALURef.sub(IX.read(),1,0);
        IX.write(sub);
    }

    private INCX = (): void =>
    {
        // T3 : IX <- IX + 1
        this.registersRef.getRegister(EREG.IX).increment();
    }

    private PSH = (): void =>
    {
        // T3: AR <- SP
        const AR = this.registersRef.getRegister(EREG.AR);
        const SP = this.registersRef.getRegister(EREG.SP);
        AR.write(SP.read());

        // T4: M[AR] <- AC_L , SP <- SP - 1 , AR <- AR - 1
        const AC = this.registersRef.getRegister(EREG.AC);
        this.memoryRef.write(AR.read(),AC.readLSB());
        SP.decrement();
        AR.decrement();

        // T5: M[AR] <- AC_H , SP <- SP - 1
        this.memoryRef.write(AR.read(),AC.readMSB());
        SP.decrement();
    }

    private PUL = ():void =>
    {
        // T3: SP <- SP + 1
        const SP = this.registersRef.getRegister(EREG.SP);
        SP.increment();

        // T4: AR <- SP
        const AR = this.registersRef.getRegister(EREG.AR);
        AR.write(SP.read());

        // T5: DR_H <- M[AR], SP <- SP + 1, AR <- AR + 1
        const DR = this.registersRef.getRegister(EREG.DR);
        let data = this.memoryRef.read(AR.read());
        DR.writeMSB(data);
        SP.increment();
        AR.increment();

        // T6: DR_L <- M[AR]
        data = this.memoryRef.read(AR.read());
        DR.writeLSB(data);

        // T7: AC <- DR
        const AC = this.registersRef.getRegister(EREG.AC);
        AC.write(DR.read());
    }

}

export default InherentModeExecutor;