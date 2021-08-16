interface ICPU 
{
    instructionCycle():void;
    reset():ICPU; // resets all the value of all registers to zero
}

export default ICPU;