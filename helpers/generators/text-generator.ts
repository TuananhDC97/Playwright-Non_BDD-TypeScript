const UPPER_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_ALPHABET = UPPER_ALPHABET.toLowerCase();
const NUMBER = '0123456789';
const SPECIAL_CHARACTER = '@#$%^';

export function GenerateNumericText (length: number) : string {
    let result = '';
    
    while (length > 0) {
        result += (Math.random() * 10).toFixed(0).toString();
        length--;
    }
    return result;
}

export function GenerateTextBasedOnAvailableCharacter (length: number, characters: string) : string {
    let result = '';
    
    for (let i = length; i > 0; --i)
        result += characters[Math.floor(Math.random() * characters.length)];

    return result;
}

export function GenerateAlphaText (length: number) : string {
    const chars = UPPER_ALPHABET + LOWER_ALPHABET;

    return GenerateTextBasedOnAvailableCharacter(length, chars);
}

export function GenerateUpperAlphaText (length: number) : string {
    const chars = UPPER_ALPHABET;

    return GenerateTextBasedOnAvailableCharacter(length, chars);
}

export function GenerateLowerAlphaText (length: number) : string {
    const chars = UPPER_ALPHABET;

    return GenerateTextBasedOnAvailableCharacter(length, chars);
}

export function GenerateAlphanumericText (length: number) : string {
    const chars = UPPER_ALPHABET + LOWER_ALPHABET + NUMBER;

    return GenerateTextBasedOnAvailableCharacter(length, chars);
}

export function GenerateSpecialCharacter (length: number) : string {
    const chars = SPECIAL_CHARACTER;

    return GenerateTextBasedOnAvailableCharacter(length, chars);
}

export function GeneratePassword (length: number) : string {
    const chars = UPPER_ALPHABET + LOWER_ALPHABET + NUMBER + SPECIAL_CHARACTER;

    return GenerateTextBasedOnAvailableCharacter(length - 4, chars) 
    + GenerateUpperAlphaText(1) + GenerateSpecialCharacter(1)
    + GenerateLowerAlphaText(1) + GenerateNumericText(1);
}