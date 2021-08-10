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

            case EIDEC.BRA:
                this.BRA();
                break;
            
            case EIDEC.BCC:
                this.BCC();
                break;

            case EIDEC.BCS:
                this.BCS();
                break;

            case EIDEC.BZR:
                this.BZR();
                break;

            case EIDEC.BNE:
                this.BNE();
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
        this.assignEffectiveAddressToPC();
    }

    private BRA = (): void => this.assignEffectiveAddressToPC();

    private BCC = (): void => 
    {
        // T3 : if C == 0 : PC <- effective address
        const carryFlag = this.registersRef.getRegister(EREG.CCR).getFlag(EFLAG.C);
        if(!carryFlag) this.assignEffectiveAddressToPC();
    }

    private BCS = ():void =>
    {
        // T3: if C == 1 : PC <- effective address
        const carryFlag = this.registersRef.getRegister(EREG.CCR).getFlag(EFLAG.C);
        if(carryFlag) this.assignEffectiveAddressToPC();
    }


    private BZR = (): void =>
    {
        // T3 if Z == 1 : PC <- effective address
        const zeroFlag = this.registersRef.getRegister(EREG.CCR).getFlag(EFLAG.Z);
        if(zeroFlag) this.assignEffectiveAddressToPC();
    }

    private BNE = (): void =>
    {
        // T3 if Z == 0 : PC <- effective address
        const zeroFlag = this.registersRef.getRegister(EREG.CCR).getFlag(EFLAG.Z);
        if(!zeroFlag) this.assignEffectiveAddressToPC();
    }

    private assignEffectiveAddressToPC = () =>
    {
        const PC = this.registersRef.getRegister(EREG.PC);
        const AR = this.registersRef.getRegister(EREG.AR);
        const offset = this.memoryRef.read(AR.read());
        const effectiveAddress = this.ALURef.calculateEffectiveAddress(PC.read(),offset,false);
        PC.write(effectiveAddress);
    }

}

export default RelativeModeExecutor;