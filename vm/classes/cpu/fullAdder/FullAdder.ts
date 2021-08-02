import IFullAdder from "../../../interfaces/cpu/IFullAdder";

class FullAdder implements IFullAdder
{
    // Methods
    public addBit = (a:number,b:number,c:number):{sum:number,carry:number} =>
    {

        const sum:number = a ^ b ^ c; 
        const carry:number = (c & (a ^ b)) | (a & b);
        return {sum,carry};
    }

   
    public add16Bits = (a:number,b:number,c:number):{sum:number,carry:number} =>
    {
        
        const firstOperand = a.toString(2).padStart(16,'0');
        const secondOperand = b.toString(2).padStart(16,'0');
        let finalSum : string = '';
        let finalCarry: number = c;
        console.log(firstOperand);
        console.log(secondOperand);
        for(let i=15 ; i>=0 ;i--)
        {   
            const firstOpBit:number = parseInt(firstOperand[i]);
            const secondOpBit:number = parseInt(secondOperand[i]);
            const {sum,carry}= this.addBit(firstOpBit,secondOpBit,finalCarry);
            
            finalSum = sum + finalSum;
            finalCarry = carry;
        }
                
        return {
            sum: parseInt(finalSum,2),
            carry: finalCarry 
        };
    }
   
}


export default FullAdder;