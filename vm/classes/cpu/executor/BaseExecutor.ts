import EREG from "../../../enums/EREG";
import IRegisters from "../../../interfaces/cpu/IRegisters";
import IMemory from "../../../interfaces/memory/IMemory";
import Memory from "../../memory/Memory";
import Registers from "../Registers";


class BaseExecutor
{
    // Properties
    protected IDEC:number;
    protected memoryRef : IMemory;
    protected registersRef :IRegisters;

    // Constructors
    constructor(IDEC:number)
    {
        this.memoryRef = Memory.getInstance();
        this.registersRef = Registers.getInstance();
        this.IDEC = IDEC;
    }

    // Methods
    protected LDA = (steps:() => void) =>
    {
        steps();

        // T_LAST : AC <- DR
        const DR = this.registersRef.getRegister(EREG.DR);
        this.registersRef.getRegister(EREG.AC).write(DR.read());
    }

    protected STA = (steps:() => void) =>
    {
        steps();

        // T_BEFORE_LAST : M[AR] <- AC_H, AR <- AR + 1
        const AC = this.registersRef.getRegister(EREG.AC) 
        const AR = this.registersRef.getRegister(EREG.AR);
        this.memoryRef.write(AR.read(),AC.readMSB());
        AR.increment();

        // T_LAST : M[AR] <- AC_L
        this.memoryRef.write(AR.read(),AC.readLSB());
    }
}

export default BaseExecutor;