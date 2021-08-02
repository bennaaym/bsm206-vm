interface IALU  
{
    // Arithmetic operations
    add(reg_1:number,reg_2:number,carry:number):{sum:number,carry:number};
    

    // Logic operations
    neg(reg:number):number; // returns the 2's complement of the argument
    com(reg:number):number; // returns the 1's complement of the argument
}

export default IALU;