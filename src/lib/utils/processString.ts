type Option = {
  fn: <T>(key: number, result: RegExpExecArray) => T | JSX.Element;
  regex: RegExp;
};

type ProcessInputWithRegexType =
  | string
  | JSX.Element
  | Array<JSX.Element | string>;

function processString(options: Option[]) {
  let key = 0;

  function processInputWithRegex(
    option: Option,
    input: ProcessInputWithRegexType,
  ): ProcessInputWithRegexType {
    if (!option.fn || typeof option.fn !== 'function') return input;

    if (!option.regex || !(option.regex instanceof RegExp)) return input;

    if (typeof input === 'string') {
      const { regex } = option;
      let result = null;
      const output: Array<JSX.Element | string> = [];

      while ((result = regex.exec(input)) !== null) {
        const { index } = result;
        const [match] = result;

        output.push(input.substring(0, index));
        output.push(option.fn<JSX.Element>(++key, result));

        input = input.substring(index + match.length, input.length + 1);
        regex.lastIndex = 0;
      }

      output.push(input);

      return output;
    }

    if (Array.isArray(input)) {
      return input.map(chunk =>
        processInputWithRegex(option, chunk),
      ) as ProcessInputWithRegexType;
    }

    return input;
  }

  return (input: string): ProcessInputWithRegexType => {
    if (!options || !Array.isArray(options) || !options.length) return input;

    options.forEach(
      option =>
        ((input as ProcessInputWithRegexType) = processInputWithRegex(
          option,
          input,
        )),
    );

    return input;
  };
}

export default processString;
