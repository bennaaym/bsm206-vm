interface IALU
{
    add(AC:number,DR:number,carry:number):{sum:number,carry:number};
}

export default IALU;