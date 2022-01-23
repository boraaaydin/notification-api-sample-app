export function logError(msg) {
  console.log(msg);
  alert(msg);
  throw new Error(msg);
}

export function logInfo(msg) {
  console.log(msg);
  alert(msg);
}
