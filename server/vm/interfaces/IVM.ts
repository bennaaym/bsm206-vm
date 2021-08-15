interface IVM 
{
    run():[{regs:{[reg:string]:string}[],memory:string[]}|null,string|null];
}

export default IVM;