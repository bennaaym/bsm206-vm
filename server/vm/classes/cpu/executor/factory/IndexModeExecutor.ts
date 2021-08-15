import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import BaseExecutor from "../BaseExecutor";

class IndexModeExecutor extends BaseExecutor implements IExecutor
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
            case EIDEC.JSR:
                this.JSR();
                break;

            case EIDEC.JMP:
                this.JMP();
                break;

            case EIDEC.LDA:
                this.LDA();
                break;

            case EIDEC.STA:
                this.STA();
                break;

            case EIDEC.LDAX:
                this.LDAX();
                break;
       }
    };



    protected maxCommonSteps = (): void =>
    {
        this.T3();
        this.T4();
        this.T5();
    }

    protected minCommonSteps =(): void => this.T3();

    private JSR = (): void =>
    {
        // T3 : TR <- AR
        const TR = this.registersRef.getRegister(EREG.TR);
        const AR = this.registersRef.getRegister(EREG.AR);
        TR.write(AR.read());

        // T4: AR <- SP
        const SP = this.registersRef.getRegister(EREG.SP);
        AR.write(SP.read());
        
        // T5: M[AR] <- PC_L, AR <- AR - 1, SP <- SP - 1
        const PC = this.registersRef.getRegister(EREG.PC);
        this.memoryRef.write(AR.read(),PC.readLSB());
        AR.decrement();
        SP.decrement();

        // T6: M[AR] <- PC_H, SP <- SP - 1
        this.memoryRef.write(AR.read(),PC.readMSB());
        SP.decrement();

        // T7: AR <- TR
        AR.write(TR.read());

       // T8: PC <- effective address
       const IX = this.registersRef.getRegister(EREG.IX);
       const offset = this.memoryRef.read(AR.read());
       const effectiveAddress = this.ALURef.calculateEffectiveAddress(IX.read(),offset,true);
       PC.write(effectiveAddress);

    }

    private JMP = (): void =>
    {
       // T3: PC <- effective address
       const PC = this.registersRef.getRegister(EREG.PC);
       const IX = this.registersRef.getRegister(EREG.IX);
       const AR = this.registersRef.getRegister(EREG.AR);
       const offset = this.memoryRef.read(AR.read());
       const effectiveAddress = this.ALURef.calculateEffectiveAddress(IX.read(),offset,true);
       PC.write(effectiveAddress);
    }



    private T3 = (): void =>
    {
        // T3 : AR <- effective address
        const AR = this.registersRef.getRegister(EREG.AR);
        const IX = this.registersRef.getRegister(EREG.IX);
        const offset = this.memoryRef.read(AR.read());
        const effectiveAddress = this.ALURef.calculateEffectiveAddress(IX.read(),offset,true);
        AR.write(effectiveAddress);
    }

    private T4 = (): void =>
    {
        // T4 : DR_H <- M[AR], AR <- AR + 1 
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeMSB(data);
        AR.increment();
    }

    private T5 = (): void =>
    {
        // T4 : DR_L <- M[AR]
        const AR = this.registersRef.getRegister(EREG.AR);
        const data = this.memoryRef.read(AR.read());
        this.registersRef.getRegister(EREG.DR).writeLSB(data);
    }

}

export default IndexModeExecutor;