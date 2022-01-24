export const base64Encode = (
    toConvert: string | Record<string, any> | null | undefined,
  ) => {
    let value;
  
    if (!toConvert) return null;
  
    // eslint-disable-next-line default-case
    switch (typeof toConvert) {
      case 'string':
        value = toConvert;
        break;
  
      case 'object':
        value = JSON.stringify(toConvert);
        break;
    }
  
    return Buffer.from(value as string, 'utf-8').toString('base64');
  };
  
  export const base64Decode = (toConvert: string | undefined) => {
    if (!toConvert) return null;
    return Buffer.from(toConvert, 'base64').toString('utf-8');
  };