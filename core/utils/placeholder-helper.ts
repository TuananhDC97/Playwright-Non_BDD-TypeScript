import * as generalPlaceholder from '@constants/placeholder-constants';
import { PLACEHOLDER_PATTERN } from '@constants/placeholder-constants';
import { randomUUID } from 'crypto';
import { IterateThroughObjectToChangeValues } from './reflection-helper';
import { GenerateAlphanumericText, GeneratePassword } from '@helpers/generators/text-generator';

/**
 * supposed that there is a string: "a white cat jumps over the black dog in Saigon at $$NOW$$"
 * $$NOW$$ is a generally defined placeholder 
 * I want to replace the placeholder $$NOW$$ to the current date (example: "02/12/2023")
 * After I call this function, I receive this string: "a white cat jumps over the black dog in Saigon at 02/12/2023"
 * @param str - the original string that contains the placeholder
 * @returns: New replaced string
 *  
 */ 
export function ReplaceGeneralPlaceHolderWithGeneratedValue (strWithPlaceholder: string) : string {  
    const placeholders = GetAllPlaceholders(strWithPlaceholder);
    let modifiedStr = strWithPlaceholder;
    let replacedValue = '';

    for (const placeholderType of placeholders) {
        switch (placeholderType[1]) {
        case generalPlaceholder.GUID:
            replacedValue = randomUUID(); 
            break;
        case generalPlaceholder.YESTERDAY: {
            const yesterday = new Date(Date.now() - 1);

            replacedValue = yesterday.getDate().toLocaleString();
            break;
        }
        case generalPlaceholder.NOW: {
            const now = new Date(Date.now());

            replacedValue = now.getDate().toLocaleString();
            break;
        }
        case generalPlaceholder.USERNAME:
            replacedValue = process.env.BOOKSTORE_USERNAME;
            break;
        case generalPlaceholder.PASSWORD:
            replacedValue = process.env.BOOKSTORE_PASSWORD;
            break;
        case generalPlaceholder.RANDOM_EMAIL:
            replacedValue = `${GenerateAlphanumericText(6)}@${GenerateAlphanumericText(3)}.com`;
            break;
        case generalPlaceholder.RANDOM_TEXT:
            replacedValue = GenerateAlphanumericText(10);
            break;
        case generalPlaceholder.RANDOM_PASSWORD:
            replacedValue = GeneratePassword(12);
            break;
        default: {
            console.error('Placeholder not supported');
            continue;
        }
        }

        modifiedStr = modifiedStr.replace(PLACEHOLDER_PATTERN, replacedValue);
    }
    
    return modifiedStr;
}

/**
 * Replace placeholder in an object
 * @param objWithPlaceholders 
 * @returns New modified object with replaced placeholders
 */
export function ReplacePlaceHolderValueInObjbect (objWithPlaceholders: object) : object {
    // eslint-disable-next-line prefer-const
    let modifiedObj = objWithPlaceholders;

    IterateThroughObjectToChangeValues(modifiedObj, (obj, key, value) => {
        if (HasPlaceHolder(value as string)) 
            obj[key] = ReplaceGeneralPlaceHolderWithGeneratedValue(value as string);
        return obj[key];
    });
        
    return modifiedObj;
}

/**
 * supposed that there is a string: "a white cat jumps over the black dog in $$LOCATION$$ today"
 * $$LOCATION$$ is a placeholder 
 * I want to replace the placeholder $$LOCATION$$ with a specific value "Saigon"
 * After I call this function, I receive this string: "a white cat jumps over the black dog in Saigon today"
 * @param str - the original string that contains the placeholder
 * @param value - the value to be replaced into the placeholder
 * @returns: New replaced string
 *  
 */ 
export function ReplacePlaceHolderWithSpecificValue (str: string, value: string) {
    return str.replace(PLACEHOLDER_PATTERN, value);
}

export function GetAllPlaceholders (str: string) : string[] {
    if (!HasPlaceHolder(str)) return [];
    let result = [];
    
    result = [...str.matchAll(PLACEHOLDER_PATTERN)];

    return result;
}

export function HasPlaceHolder (str: string) : boolean {
    if (typeof str !== 'string') return false;
    return !!str.toString().match(PLACEHOLDER_PATTERN);
}