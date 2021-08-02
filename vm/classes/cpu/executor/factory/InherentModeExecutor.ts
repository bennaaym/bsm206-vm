import EREG from "../../../../enums/EREG";
import IExecutor from "../../../../interfaces/cpu/IExecutor";
import IRegisters from "../../../../interfaces/cpu/IRegisters";
import Registers from "../../Registers";

class InherentModeExecutor implements IExecutor
{
     // Properties
     protected IDEC:number;
     protected registersRef :IRegisters;
 
     // Constructors
     constructor(IDEC:number)
     {
         this.registersRef = Registers.getInstance();
         this.IDEC = IDEC;
     }

    // Methods
    public execute = (): void =>
    {
        switch(this.IDEC)
        {
            default:
                this.NOP();
                
        }
    };

    private NOP = (): void => {};

}

export default InherentModeExecutor;