
export const whiteSpace = (): string => `<span>&nbsp;</span>`;
export const newLine    = (): string  => `<br>`;

export const highLightComment  = (comment:string,isLight:boolean = true): string =>
{   
    return (isLight)? 
    `<span class="text-light-comment">${comment}</span>`:
    `<span class="text-dark-comment">${comment}</span>`;
}

export const highLighKeyword = (keyword:string,isLight:boolean =true): string =>
{
    return(isLight)?
    `<span class="text-light-keyword">${keyword}</span>`:
    `<span class="text-dark-keyword">${keyword}</span>`;
}

export const highLightAddressingChar = (char:string,isLight:boolean =true): string =>
{
    return(isLight)?
    `<span class="text-light-symbol">${char[0]}</span>`:
    `<span class="text-dark-symbol">${char[0]}</span>`;
}

export const highLightHexValue = (hex:string,isLight:boolean = true) =>
{
    return(isLight)?
    `<span class="text-light-number">${hex}</span>`:
    `<span class="text-dark-number">${hex}</span>`
}
