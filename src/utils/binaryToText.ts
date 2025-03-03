/**
 * Convert a binary string to a string of text.
 * @param binary - The binary string to convert to text.
 * @returns The text representation of the binary string as ASCII characters.
 */
export function binaryToText(binary: string): string {
  return binary
    .split(' ')
    .map((char) => String.fromCharCode(parseInt(char, 2)))
    .join('');
}
