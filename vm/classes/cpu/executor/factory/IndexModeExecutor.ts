import IExecutor from "../../../../interfaces/cpu/IExecutor";

class IndexModeExecutor implements IExecutor
{
    // Properties
    private IDEC:number;

    // Constructor  
    constructor(IDEC:number)
    {
        this.IDEC = IDEC;
    }
    // Methods

    public execute = (): void => console.log('index mode executor');
}

export default IndexModeExecutor;