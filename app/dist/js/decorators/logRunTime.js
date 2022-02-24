export function logRunTime(inSeconds = false) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unit = "milliseconds";
            if (inSeconds) {
                divisor = 1000;
                unit = "seconds;";
            }
            const t1 = performance.now();
            const returnOriginalMethod = originalMethod.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey}, run time: ${(t2 - t1) / divisor} ${unit}.`);
            returnOriginalMethod;
        };
        return descriptor;
    };
}
