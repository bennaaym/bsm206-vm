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
    public LDA = (steps:() => void) =>
    {
        steps();

        // T5 : AC <- DR
        const DR = this.registersRef.getRegister(EREG.DR);
        this.registersRef.getRegister(EREG.AC).write(DR.read());
    }
}

export default BaseExecutor;