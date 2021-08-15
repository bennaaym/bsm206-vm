import {Request,Response} from "express";
import Assembler from "../../assembly/classes/Assembler";
import IAssembler from "../../assembly/interfaces/IAssembler";
import VM from "../../vm/classes/VM";
import IVM from "../../vm/interfaces/IVM";


export const compile = (req:Request,res:Response) =>
{
    const code = req.body["assemblyCode"] ;

    const assembler:IAssembler = new Assembler(code);
    const [machineCode,compileError] = assembler.run();
    if(compileError)
    {
        res.send({
            data:null,
            error:compileError.get()
        })
    }

    const vm:IVM = new VM(machineCode);
    const [object,error] = vm.run();
    if(error)
    {
        res.send({
            data:null,
            error
        })
    }

    res.send({
        data:{
            machineCode,
            regs:object?.regs,
            memory:object?.memory
        },
        error:null
    });
}