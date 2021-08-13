/**
 * CCR : is the flag register in this VM
 * 
 */

enum EFLAG
{
    C = 0B000,      // carry 
    Z = 0B001,      // zero 
    N = 0B010,      // sign 
    V = 0B011,      // overflow 
    I = 0B100,      // interrupt
}

export default EFLAG