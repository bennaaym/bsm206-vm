# BSM206 VM

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#documentation">Documentation</a>
      <ul>
        <li><a href="#built-with">Architecture</a></li>
        <li><a href="#built-with">Addressing Modes</a></li>
        <li><a href="#built-with">Instruction Set</a></li>
        <li><a href="#built-with">Assembly Language</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#links">Links</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/bennaaym/mini-vm.git)

<table>
  <tr>
    <td>
      <img src="https://i.ibb.co/c89QTmh/mobile-dark-1.png" alt="drawing" width="200"/>
    </td>
     <td>
      <img src="https://i.ibb.co/cNT5mkW/mobile-dark.png" alt="drawing" width="200"/>
    </td>
     <td>
      <img src="https://i.ibb.co/S73SFSF/screely-1630016893449.png" alt="drawing" width="200"/>
    </td>
  </tr>
<table>


* [BSM206 VM](https://github.com/bennaaym/mini-vm.git) is an integrated simulation environment, designed to help students understand the basic architecture of a computer.


* This project consists mainly of:

    *   A 16-bit virtual machine that simulates a basic computer architecture, the architecture was designed for educational purposes so it's really easy to start with.
    
    *  The definition of an assembly language with 60 different instructions

    *  An assembler to transform the assembly language into machine code

    *   A  REST API 
    
    *   UI :
        * Fully-fledged code editor for the assembly language
        * Memory Viewer 
        * Registers Viewer
        * Step by step execution
 

 
### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Tailwindcss](https://tailwindcss.com/)




## Documentaion 

### Architecture 

* Von-Neumann Model was used

* CPU : 

    * 16 bits CPU with an accumulator based architecture
    * Total of 11 registers

* Memory : 

    * Total size : 64KB
    * Word size  : 1 byte

* Registers :
    
    |SYMBOL|NAME|SIZE (bits)|FUNCTION|
    |--- |--- |--- |--- |
    |PC|program counter|16|Holds the memory address of the next instruction to be fetched|
    |IR|instruction register|8|Holds the instruction which is just about to be executed|
    |DR|data register|16|Holds memory operand|
    |AR|address register|16|Holds the address of the location to be accessed from memory|
    |IX|index register|16|Contains the base address that's used to calculate the effective address when using index addressing mode|
    |AC|accumulator|16|Main processor register. It contains the results of the various operations|
    |INR|input register|16|Carries input characters|
    |OUTR|output register|16|Carries output character|
    |TR|temporary register|16|Holds temporary data|
    |CCR|condition code Register|8|Contains different flags that indicate the status of any operation|
    |SP|stack pointer|16|Stores the address of the last program request in a stack|

### Addressing Modes

* A total of 6 addressing modes are available

    <table class="documentation_table__2Bg9-"><thead><tr><th>mode</th><th>symbol</th><th>bytes</th><th>description</th></tr></thead><tbody><tr><td>inherent</td><td></td><td>1</td><td> In this mode, the operands are not in the memory</td></tr><tr><td>immediate</td><td>#</td><td>3</td><td>In this mode, when the instruction is assembled, the operand comes immediately after the opcode</td></tr><tr><td>direct</td><td></td><td>3</td><td>In this mode, address field in the instruction contains the effective address of the operand and no intermediate memory access is required</td></tr><tr><td>indirect</td><td>()</td><td>3</td><td>In this mode, address field in the instruction contains the memory location where effective address of operand is present.</td></tr><tr><td>index</td><td>*</td><td>2</td><td>In this mode, contents of Index register is added to address part of instruction to obtain effective address</td></tr><tr><td>relative</td><td>~</td><td>2</td><td>In this mode, contents of Index register is added to address part of instruction to obtain effective address</td></tr></tbody></table>

### Instruction Set 

<table class="documentation_table__2Bg9-"><thead><tr><th>mnemonic</th><th>mode</th><th>opcode</th><th>bytes</th><th>cycles</th><th>function</th><th>exemple</th></tr></thead><tbody><tr><td>ADD</td><td>immediate</td><td>10</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Adds the value operand to the value of the Accumulator</td><td class="w-28 text-base">ADD #1234</td></tr><tr><td>ADD</td><td>direct</td><td>20</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">ADD 1234</td></tr><tr><td>ADD</td><td>indirect</td><td>30</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">ADD (1234)</td></tr><tr><td>ADD</td><td>index</td><td>40</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">ADD *12</td></tr><tr><td>ADDC</td><td>immediate</td><td>11</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Adds the value operand to the value of the Accumulator,the carry flag will be added too</td><td class="w-28 text-base">ADDC #1234</td></tr><tr><td>ADDC</td><td>direct</td><td>21</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">ADDC 1234</td></tr><tr><td>ADDC</td><td>indirect</td><td>31</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">ADDC (1234)</td></tr><tr><td>ADDC</td><td>index</td><td>41</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">ADDC *12</td></tr><tr><td>AND</td><td>immediate</td><td>12</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Performs a logical AND operation between the Accumulator value and the operand</td><td class="w-28 text-base">AND #1234</td></tr><tr><td>AND</td><td>direct</td><td>22</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">AND 1234</td></tr><tr><td>AND</td><td>indirect</td><td>32</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">AND (1234)</td></tr><tr><td>AND</td><td>index</td><td>42</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">AND *12</td></tr><tr><td>CLR</td><td>inherent</td><td>01</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the accumulator to zero</td><td class="w-28 text-base">CLR</td></tr><tr><td>DECR</td><td>inherent</td><td>02</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Decrements the value of the accumulator by 1</td><td class="w-28 text-base">DECR</td></tr><tr><td>DIV</td><td>immediate</td><td>15</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Divides the value of the Accumulator by the operand, the quotient will be stored in the Accumulator and the remainder will be stored in the Data register</td><td class="w-28 text-base">DIV #1234</td></tr><tr><td>DIV</td><td>direct</td><td>25</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">DIV 1234</td></tr><tr><td>DIV</td><td>indirect</td><td>35</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">DIV (1234)</td></tr><tr><td>DIV</td><td>index</td><td>45</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">DIV *12</td></tr><tr><td>XOR</td><td>immediate</td><td>16</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Performs a logical XOR operation between the Accumulator value and the operand</td><td class="w-28 text-base">XOR #1234</td></tr><tr><td>XOR</td><td>direct</td><td>26</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">XOR 1234</td></tr><tr><td>XOR</td><td>indirect</td><td>36</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">XOR (1234)</td></tr><tr><td>XOR</td><td>index</td><td>46</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">XOR *12</td></tr><tr><td>INCR</td><td>inherent</td><td>03</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Increments the value of the accumulator by 1</td><td class="w-28 text-base">INCR</td></tr><tr><td>COM</td><td>inherent</td><td>04</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the value of the Accumulator to its 1's complement</td><td class="w-28 text-base">COM</td></tr><tr><td>NEG</td><td>inherent</td><td>05</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the value of the Accumulator to its 2's complement</td><td class="w-28 text-base">NEG</td></tr><tr><td>LDA</td><td>immediate</td><td>1A</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Loads the operand to the Accumulator</td><td class="w-28 text-base">LDA #1234</td></tr><tr><td>LDA</td><td>direct</td><td>2A</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">LDA 1234</td></tr><tr><td>LDA</td><td>indirect</td><td>3A</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">LDA (1234)</td></tr><tr><td>LDA</td><td>index</td><td>4A</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">LDA *12</td></tr><tr><td>OR</td><td>immediate</td><td>1B</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Performs a logical OR operation between the Accumulator value and the operand</td><td class="w-28 text-base">OR #1234</td></tr><tr><td>OR</td><td>direct</td><td>2B</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">OR 1234</td></tr><tr><td>OR</td><td>indirect</td><td>3B</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">OR (1234)</td></tr><tr><td>OR</td><td>index</td><td>4B</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">OR *12</td></tr><tr><td>PSH</td><td>inherent</td><td>06</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Stores the value of the Accumulator into the memory address pointed by the Stack Pointer</td><td class="w-28 text-base">PSH</td></tr><tr><td>PUL</td><td>inherent</td><td>07</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Pulls data from  the memory location pointed by the Stack Pointer and loads it into the Accumulator</td><td class="w-28 text-base">PUL</td></tr><tr><td>SAR</td><td>inherent</td><td>08</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Zero fill right shift</td><td class="w-28 text-base">SAR</td></tr><tr><td>SAL</td><td>inherent</td><td>09</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Zero fill left shift</td><td class="w-28 text-base">SAL</td></tr><tr><td>SUB</td><td>immediate</td><td>1E</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Substructures the value of the accumulator from operand </td><td class="w-28 text-base">SUB #1234</td></tr><tr><td>SUB</td><td>direct</td><td>2E</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">SUB 1234</td></tr><tr><td>SUB</td><td>indirect</td><td>3E</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">SUB (1234)</td></tr><tr><td>SUB</td><td>index</td><td>4E</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">SUB *12</td></tr><tr><td>SUBC</td><td>immediate</td><td>1F</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Substructures the value of the accumulator from operand, the carry flag will be subtracted too</td><td class="w-28 text-base">SUBC #1234</td></tr><tr><td>SUBC</td><td>direct</td><td>2F</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">SUBC 1234</td></tr><tr><td>SUBC</td><td>indirect</td><td>3F</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">SUBC (1234)</td></tr><tr><td>SUBC</td><td>index</td><td>4F</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">SUBC *12</td></tr><tr><td>STA</td><td>direct</td><td>A0</td><td>3</td><td class="documentation_before-last__2pxiK">5</td><td rowspan="3" class="text-left">Stores the accumulator value into memory</td><td class="w-28 text-base">STA 1234</td></tr><tr><td>STA</td><td>indirect</td><td>B0</td><td>3</td><td class="documentation_before-last__2pxiK">8</td><td class="w-28 text-base">STA (1234)</td></tr><tr><td>STA</td><td>index</td><td>C0</td><td>2</td><td class="documentation_before-last__2pxiK">3</td><td class="w-28 text-base">STA *12</td></tr><tr><td>MUL</td><td>immediate</td><td>95</td><td>3</td><td class="documentation_before-last__2pxiK">3</td><td rowspan="4" class="text-left">Multiplies the Low bytes of the Accumulator with The Low bytes of the operand (8bits multiplication)</td><td class="w-28 text-base">MUL #0012</td></tr><tr><td>MUL</td><td>direct</td><td>A5</td><td>3</td><td class="documentation_before-last__2pxiK">6</td><td class="w-28 text-base">MUL 1234</td></tr><tr><td>MUL</td><td>indirect</td><td>B5</td><td>3</td><td class="documentation_before-last__2pxiK">9</td><td class="w-28 text-base">MUL (1234)</td></tr><tr><td>MUL</td><td>index</td><td>C5</td><td>2</td><td class="documentation_before-last__2pxiK">4</td><td class="w-28 text-base">MUL *12</td></tr><tr><td>LDAX</td><td>immediate</td><td>91</td><td>3</td><td class="documentation_before-last__2pxiK">2</td><td rowspan="4" class="text-left">Loads the operand value into the Index register</td><td class="w-28 text-base">LDAX #1234</td></tr><tr><td>LDAX</td><td>direct</td><td>A1</td><td>3</td><td class="documentation_before-last__2pxiK">5</td><td class="w-28 text-base">LDAX 1234</td></tr><tr><td>LDAX</td><td>indirect</td><td>B1</td><td>3</td><td class="documentation_before-last__2pxiK">8</td><td class="w-28 text-base">LDAX (1234)</td></tr><tr><td>LDAX</td><td>index</td><td>C1</td><td>2</td><td class="documentation_before-last__2pxiK">3</td><td class="w-28 text-base">LDAX *12</td></tr><tr><td>LDAS</td><td>immediate</td><td>92</td><td>3</td><td class="documentation_before-last__2pxiK">2</td><td rowspan="4" class="text-left">Loads the operand value into the Stack Pointer</td><td class="w-28 text-base">LDAS #1234</td></tr><tr><td>LDAS</td><td>direct</td><td>A2</td><td>3</td><td class="documentation_before-last__2pxiK">5</td><td class="w-28 text-base">LDAS 1234</td></tr><tr><td>LDAS</td><td>indirect</td><td>B2</td><td>3</td><td class="documentation_before-last__2pxiK">8</td><td class="w-28 text-base">LDAS (1234)</td></tr><tr><td>LDAS</td><td>index</td><td>C2</td><td>2</td><td class="documentation_before-last__2pxiK">3</td><td class="w-28 text-base">LDAS *12</td></tr><tr><td>STAX</td><td>direct</td><td>A3</td><td>3</td><td class="documentation_before-last__2pxiK">5</td><td rowspan="2" class="text-left">Stores the value of the Index register into memory</td><td class="w-28 text-base">STAX 1234</td></tr><tr><td>STAX</td><td>indirect</td><td>B3</td><td>3</td><td class="documentation_before-last__2pxiK">8</td><td class="w-28 text-base">STAX (1234)</td></tr><tr><td>DECX</td><td>inherent</td><td>0A</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Decrements the Index register by 1</td><td class="w-28 text-base">DECX</td></tr><tr><td>INCX</td><td>inherent</td><td>0B</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Increments the Index register by 1</td><td class="w-28 text-base">INCX</td></tr><tr><td>BRA</td><td>relative</td><td>50</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Unconditional branching  to address, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BRA ~06</td></tr><tr><td>BCC</td><td>relative</td><td>51</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if C = 0, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BCC ~06</td></tr><tr><td>BCS</td><td>relative</td><td>52</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if C == 1, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BCS ~06</td></tr><tr><td>BZR</td><td>relative</td><td>53</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if Z == 1, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BZR ~06</td></tr><tr><td>BMI</td><td>relative</td><td>5A</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if N == 1, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BMI ~06</td></tr><tr><td>BNE</td><td>relative</td><td>5B</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if Z == 0, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BNE ~06</td></tr><tr><td>BVC</td><td>relative</td><td>5C</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if V == 0, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BVC ~06</td></tr><tr><td>BVS</td><td>relative</td><td>5D</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if V == 1, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BVS ~06</td></tr><tr><td>BPL</td><td>relative</td><td>5E</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Conditional Branching  to address if N == 0, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BPL ~06</td></tr><tr><td>BSR</td><td>relative</td><td>5F</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Unconditional branching to subroutine, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">BSR ~06</td></tr><tr><td>RTS</td><td>inherent</td><td>8A</td><td>1</td><td class="documentation_before-last__2pxiK">4</td><td rowspan="1" class="text-left">Returns from subroutine</td><td class="w-28 text-base">RTS</td></tr><tr><td>JMP</td><td>index</td><td>4C</td><td>2</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Unconditional jump to address, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">JMP *06</td></tr><tr><td>JSR</td><td>index</td><td>4D</td><td>2</td><td class="documentation_before-last__2pxiK">6</td><td rowspan="1" class="text-left">Unconditional jump to subroutine, uses the bytes after the opcode to calculate the effective address</td><td class="w-28 text-base">JSR *06</td></tr><tr><td>NOP</td><td>inherent</td><td>89</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">No opeation</td><td class="w-28 text-base">NOP</td></tr><tr><td>HLT</td><td>inherent</td><td>0E</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Halt the microprocessor</td><td class="w-28 text-base">HLT</td></tr><tr><td>CLC</td><td>inherent</td><td>83</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the carry flag to 0</td><td class="w-28 text-base">CLC</td></tr><tr><td>CLI</td><td>inherent</td><td>84</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the interrupt flag to 0</td><td class="w-28 text-base">CLI</td></tr><tr><td>CLV</td><td>inherent</td><td>85</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the overflow flag to 0</td><td class="w-28 text-base">CLV</td></tr><tr><td>STC</td><td>inherent</td><td>86</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the carry flag to 1</td><td class="w-28 text-base">STC</td></tr><tr><td>STI</td><td>inherent</td><td>87</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the interrupt flag to 1</td><td class="w-28 text-base">STI</td></tr><tr><td>STV</td><td>inherent</td><td>88</td><td>1</td><td class="documentation_before-last__2pxiK">1</td><td rowspan="1" class="text-left">Sets the overflow flag to 1</td><td class="w-28 text-base">STV</td></tr></tbody></table>



### Assembly Language 

* Syntax 

    *       MNEMONIC OPERAND ; COMMENT
            
        examples
    *       LDA #1234 ; LOADS 1234 INTO THE ACCUMULATOR
    *       STA 0AB00 


* Numbers 
    *   All numbers are considered as a hexadecimal value
    *   If the hexadecimal value starts with a letter [A-F] an insignificant zero should be added at the beginning otherwise an error will be raised

    *       LDA #1234; 1234 IS A HEXADECIMAL VALUE
    *       LDA #A123; AN ERROR WILL BE RAISED BECAUSE A123 WON'T BE EVALUATED AS A NUMERICAL VALUE
    *       LDA #0A123; NO ERROR WILL BE RAISED AND A123 WILL BE EVALUATED AS NUMERICAL VALUE










<!-- LICENSE -->
## License
[![MIT License][license-shield]][license-url]<br>
Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Links

* Project repo: [https://github.com/bennaaym/mini-vm.git](https://github.com/bennaaym/mini-vm.git)







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/bennaaym/mini-vm/blob/main/LICENSE
[product-screenshot]: https://i.ibb.co/h78NT0P/UI-2.png
[product-screenshot-2]:https://i.ibb.co/YT7qqJF/UI-Mobile.png
