export default function copyTextToClipboard(
  input: string,
  { target = document.body } = {},
) {
  const element = document.createElement('textarea');

  element.value = input;

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '');

  const selection = document.getSelection();
  let originalRange: boolean | Range = false;
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  target.append(element);
  element.select();

  // Explicit selection workaround for iOS
  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    // ios
    isSuccess = document.execCommand('copy');
  } catch {}

  element.remove();

  if (originalRange && selection) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  return isSuccess;
}
