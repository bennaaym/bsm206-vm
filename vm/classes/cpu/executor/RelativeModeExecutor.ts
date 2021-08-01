import IExecutor from "../../../interfaces/cpu/IExecutor";

class RelativeModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('relative mode executor');
}

export default RelativeModeExecutor;