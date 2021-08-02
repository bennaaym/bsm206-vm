interface IALU
{
    add(reg_1:number,reg_2:number,carry:number):{sum:number,carry:number};
    neg(reg:number):{complement:number,carry:number}; // returns the 2's complement of the argument
}

export default IALU;