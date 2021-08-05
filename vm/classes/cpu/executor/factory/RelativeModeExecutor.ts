import EIDEC from "../../../../enums/EIDEC";
import EREG from "../../../../enums/EREG";
import IALU from "../../../../interfaces/cpu/IALU";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import IRegisters from "../../../../interfaces/cpu/IRegisters";
import IMemory from "../../../../interfaces/memory/IMemory";
import Memory from "../../../memory/Memory";
import ALU from "../../ALU";
import Registers from "../../Registers";

class RelativeModeExecutor implements IExecutor
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
            case EIDEC.BSR:
                this.BSR();
                break;
        }
    };


    private BSR = (): void =>
    {
        // T3: TR <- AR
        const TR = this.registersRef.getRegister(EREG.TR);
        const AR = this.registersRef.getRegister(EREG.AR);
        TR.write(AR.read());

        // T4: AR <- SP
        const SP = this.registersRef.getRegister(EREG.SP);
        AR.write(SP.read());

        // T5: M[AR] <- PC_L, SP <- SP - 1 , AR <- AR - 1
        const PC = this.registersRef.getRegister(EREG.PC);
        this.memoryRef.write(AR.read(),PC.readLSB());
        SP.decrement();
        AR.decrement();

        // T6: M[AR] <- PC_H, SP <- SP - 1 
        this.memoryRef.write(AR.read(),PC.readMSB())
        SP.decrement();

        // T7: AR <- TR
        AR.write(TR.read());

        // T8: PC <- effective address
        const offset = this.memoryRef.read(AR.read());
        const effectiveAddress = this.ALURef.calculateEffectiveAddress(PC.read(),offset,false);
        PC.write(effectiveAddress);
    }

}

export default RelativeModeExecutor;