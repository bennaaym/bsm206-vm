import IExecutor from "../../../../interfaces/cpu/IExecutor";

class InherentModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('inherent mode executor');
}

export default InherentModeExecutor;