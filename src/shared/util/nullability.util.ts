export const checkNullability = (param?: string | number | boolean) => {
  return (
    param != null &&
    param != '' &&
    param != 'null' &&
    param != 'undefined' &&
    param != undefined
  );
};

export const checkArrayNullability = (arr?: unknown[]) => {
  return (
    arr != null &&
    typeof arr === 'object' &&
    arr != undefined &&
    arr?.length > 0
  );
};

export const checkObjectNullability = (obj?: object) => {
  return (
    obj != null &&
    typeof obj === 'object' &&
    obj != undefined &&
    Object.keys(obj ?? {}).length > 0
  );
};
