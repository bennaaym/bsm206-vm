interface IALU  
{
    // Arithmetic operations
    add(reg_1:number,reg_2:number,carry:number):{sum:number,carry:number};
    sub(reg_1:number,reg_2:number,carry:number):{sub:number,carry:number};
    mult(reg_1:number,reg_2:number):number // 8 bits multiplication
    div(reg_1:number,reg_2:number):{quotient:number,remainder:number} // 8 bits division
    cmp(reg:number):number;
    
    // Logic operations
    neg(reg:number):number; // returns the 2's complement of the argument
    com(reg:number):number; // returns the 1's complement of the argument
    and(reg_1:number,reg_2:number):number;
    or(reg_1:number,reg_2:number):number;
    xor(reg_1:number,reg_2:number):number;
    shl(reg:number):number; // shift the arguments one position to the left
    shr(reg:number):number; // shift the arguments one position to the right

    calculateEffectiveAddress(reg:number,offset:number,unsigned:boolean):number;
}

export default IALU;