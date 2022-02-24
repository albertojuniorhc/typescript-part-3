export function escape(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let returnOriginalMethod = originalMethod.apply(this, args);
        if (typeof (returnOriginalMethod === "string")) {
            returnOriginalMethod = returnOriginalMethod.replace(/<script>[\s\S]*?<script>/, "");
        }
        return returnOriginalMethod;
    };
    return descriptor;
}
