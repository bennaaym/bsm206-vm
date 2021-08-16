import {Request,Response} from "express";
import Assembler from "../../assembly/classes/Assembler";
import IAssembler from "../../assembly/interfaces/IAssembler";
import VM from "../../vm/classes/VM";
import IVM from "../../vm/interfaces/IVM";


export const compile = (req:Request,res:Response) =>
{
    const code = req.body["assemblyCode"];

    if(!code) 
    {
        res.status(400).send({data:null,error:null});
        return;
    }

    const assembler:IAssembler = new Assembler(code);
    const [machineCode,compileError] = assembler.run();
    if(compileError)
    {
        res.status(200).send({
            data:null,
            error:compileError.get()
        });
        return;
    }

    const vm:IVM = new VM(machineCode);
    const [steps,error] = vm.run();
    if(error)
    {
        res.status(200).send({
            data:null,
            error
        });
        return;
    }

    res.status(200).send({
        data:{
            machineCode : machineCode.join(' '),
            steps
        },
        error:null
    });
}