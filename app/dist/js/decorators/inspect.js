export function inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Method: ${propertyKey}`);
        console.log(`------ parameters: ${JSON.stringify(args)}`);
        const returnOriginalMethod = originalMethod.apply(this, args);
        console.log(`------ return: ${JSON.stringify(returnOriginalMethod)}`);
        return returnOriginalMethod;
    };
    return descriptor;
}
