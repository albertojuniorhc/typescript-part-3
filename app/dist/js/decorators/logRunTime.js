export function logRunTime() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const t1 = performance.now();
            const returnOriginalMethod = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, run time: ${(t2 - t1) / 1000} seconds.`);
            returnOriginalMethod;
        };
        return descriptor;
    };
}
