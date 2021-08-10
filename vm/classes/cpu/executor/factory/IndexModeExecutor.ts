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
       }
    };



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

}

export default IndexModeExecutor;