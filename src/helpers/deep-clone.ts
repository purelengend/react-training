export const deepClone = <T>(inputObj: T): T => {
  const cloneObj = JSON.parse(JSON.stringify(inputObj));
  return cloneObj;
};
