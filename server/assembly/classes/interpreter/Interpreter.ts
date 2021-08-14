import IInterpreter from "../../interfaces/interpreter/IInterpreter";
import INode from "../../interfaces/parser/INode";

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
    public interprete = (): string[] => [];
    
}

export default Interpreter;