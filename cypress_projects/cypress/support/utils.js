
// To check whether an object has a certain key

export function containsKey(obj, key) {
    if (obj.hasOwnProperty(key)) return true;
    for (let i in obj) {
        if (typeof obj[i] === 'object' && containsKey(obj[i], key)) return true;
    }
    return false;
}