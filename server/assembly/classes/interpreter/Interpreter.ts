import IError from "../../interfaces/Error/IError";
import IInterpreter from "../../interfaces/interpreter/IInterpreter";
import INode from "../../interfaces/parser/INode";
import {MNEMONICS} from "./MNEMONIC";
import {ADRMD} from "./ADRMD";
import EADRMD from "../../enums/EADRMD";
import RunTimeError from "../Error/RunTimeError";
import ETOKEN from "../../enums/ETOKEN";

class Interpreter implements IInterpreter
{
    // Properties
    private nodes:INode[];

    // Constructor
    constructor(nodes:INode[])
    {
        this.nodes = nodes;
    }

    // Methdos
    public interpret = (): [string[],IError|null] => 
    {
        let machineCode:string[] = [];
        
        for(let i=0 ;i<this.nodes.length;i++)
        {
            const [opcode,error] = this.nodeToOpcode(this.nodes[i]);
            if(error) return [[],error];
            if(opcode) machineCode = [...machineCode,...opcode];
        }
        
        return [machineCode,null];
    };

    private nodeToOpcode = (node:INode): [string[]|[],IError|null] =>
    {
        // in case of an inherent mode mnemonic
        if(node.getADRMD() === null && node.getOperand() === null)
        {
            const [opcode,error] = this.makeOpcode(node,EADRMD.INHERENT);
            if(error) return [[],error];
            if(opcode) return [[opcode],null];
        }

        // in case of an direct mode mnemonic 
        else if(node.getADRMD() === null)
        {
            const [opcode,error] = this.makeOpcode(node,EADRMD.DIRECT);
            if(error) return [[],error];
            if(opcode) return [[opcode,...this.makeOperand(node,EADRMD.DIRECT)],error];
        }

        // in case of other modes
        else 
        {
            let adrmd:string = '';

            switch(node.getADRMD()?.getType())
            {

                case ETOKEN.TAG : 
                    adrmd = EADRMD.IMMEDIATE;
                    break;
                case ETOKEN.LPAREN:
                    adrmd = EADRMD.INDIRECT;
                    break;
                case ETOKEN.ASTERISK:
                    adrmd = EADRMD.INDEX;
                    break;
                case ETOKEN.TILDE:
                    adrmd = EADRMD.RELATIVE;
                    break;
                default : break;
            }

            const [opcode,error] = this.makeOpcode(node,adrmd);
            if(error) return [[],error];
            if(opcode) return [[opcode,...this.makeOperand(node,adrmd)],error];
        }

        return [[],null];
    }



    private makeOpcode = (node:INode, adrmd:string):[string|null,IError|null] =>
    {
        const mnemonic = node.getMnemonic()?.getValue();
        if(mnemonic)
        {
            const  instruction = MNEMONICS[adrmd][mnemonic];
            const  addressingMode = ADRMD[adrmd];

            if(instruction === undefined)
            {
                return [null,this.raiseRunTimeError(node,adrmd)];
            }            
             /**
             * opcode encoding is based on the specific architecture this VM follows
             * 7,3,2,1,0 bits of the opcode represents the instruction 
             * 6,5,4 bits of the opcode represents the addressing mode
             */
        
            const idec:string = instruction.toString(2).padStart(5,'0');
            const adr:string = addressingMode.toString(2).padStart(3,'0');
            const opcode = idec[0]+adr+idec.substring(1,idec.length);

            return [opcode,null];
        } 

        return [null,null];
    }

    private makeOperand = (node:INode,ADRMD:string): string[] =>
    {
       let operand = node.getOperand()?.getValue();
       if(operand)
       {
        operand = parseInt(operand,16).toString(2).padStart(32,'0');
        const operandMSB = operand.substring(16,24);
        const operandLSB = operand.substring(24,32);
        if(ADRMD === EADRMD.INDEX || ADRMD === EADRMD.RELATIVE) return [operandLSB];
        return [operandMSB,operandLSB];
       }
       return [];
    }

    private raiseRunTimeError = (node:INode,ADRMD:string):IError =>
    {
        return new RunTimeError(`<< ${node.getMnemonic().getValue()} >> command cannot be used with ${ADRMD} addressing mode`,node.getMnemonic().getPositionStart());
    }
    
}

export default Interpreter;