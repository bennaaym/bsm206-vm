import IExecutor from "../../../interfaces/cpu/IExecutor";
import IMemory from "../../../interfaces/memory/IMemory";

class ImmediateModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;
    private memoryRef:IMemory;
    private registersRef:IMemory;
    
    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }

    // Methods
    public execute = (): void =>
    {

    };


    

}

export default ImmediateModeExecutor;