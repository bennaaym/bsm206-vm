import IExecutor from "../../../interfaces/cpu/IExecutor";

class DirectModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('direct mode executor');
}

export default DirectModeExecutor;