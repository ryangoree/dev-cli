/**
 * Convert a string of text to a binary string.
 * @param text - The text to convert to binary.
 * @returns The binary representation of the text as 8-bit ASCII characters.
 */
export function textToBinary(text: string): string {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}
