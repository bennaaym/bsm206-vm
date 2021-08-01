import IExecutor from "../../../../interfaces/cpu/IExecutor";

class IndirectModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('indirect mode executor');
}

export default IndirectModeExecutor;