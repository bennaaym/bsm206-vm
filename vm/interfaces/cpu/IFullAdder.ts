interface IFullAdder
{
    add16Bits(a:number,b:number,c:number):{sum:number,carry:number}; // add two operands of size 16 bits together
}

export default IFullAdder;