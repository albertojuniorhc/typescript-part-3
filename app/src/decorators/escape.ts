export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let returnOriginalMethod = originalMethod.apply(this, args);
    if (typeof (returnOriginalMethod === "string")) {
      // console.log(
      //   `@escape running on class ${this.constructor.name} to method ${propertyKey}`
      // );
      returnOriginalMethod = returnOriginalMethod.replace(
        /<script>[\s\S]*?<script>/,
        ""
      );
    }
    return returnOriginalMethod;
  };
  return descriptor;
}
