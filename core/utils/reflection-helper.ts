/**
 * Iterate each properties recursively through nested object (JSON)
 * @param obj 
 * @param callback 
 */
export function IterateThroughObjectToChangeValues (obj: object, callback: (funcObj, key, value) => any) {
    Object.entries(obj)
        .forEach(([key, value]) => {
            if (typeof obj[key] === 'object' && obj[key] !== null)
                obj[key] = IterateThroughObjectToChangeValues(obj[key], callback);
            callback(obj, key, value);
        });
    return obj;
}