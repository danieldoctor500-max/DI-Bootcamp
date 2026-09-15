// Daily Challenge: Union Type Validator

function validateUnionType(
    value: any,
    allowedTypes: string[]
): boolean {
    for (const type of allowedTypes) {
        if (typeof value === type) {
            return true;
        }
    }

    return false;
}


// Test variables

const numberValue = 100;
const stringValue = "Hello";
const booleanValue = true;
const arrayValue = [1, 2, 3];


// Test the function

console.log(validateUnionType(numberValue, ["number", "string"]));

console.log(validateUnionType(stringValue, ["number", "string"]));

console.log(validateUnionType(booleanValue, ["number", "string"]));

console.log(validateUnionType(arrayValue, ["object", "string"]));

console.log(validateUnionType(booleanValue, ["boolean", "number"]));