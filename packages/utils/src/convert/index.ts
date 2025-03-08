export  function toFloat(value: any, defaultValue: number = 0): number {
  return value ? parseFloat(value.toString()) : defaultValue;
}

export  function toInt (value: any, defaultValue: number = 0): number {
  return value ? parseInt(value.toString()) : defaultValue;
}