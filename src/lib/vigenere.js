export function vigenereEncrypt(plaintext, keyword) {
  const clean = plaintext.toLowerCase().replace(/[^a-z]/g, '');
  const key = keyword.toLowerCase().replace(/[^a-z]/g, '');
  let result = '';
  for (let i = 0; i < clean.length; i++) {
    const p = clean.charCodeAt(i) - 97;
    const k = key.charCodeAt(i % key.length) - 97;
    result += String.fromCharCode(((p + k) % 26) + 97);
  }
  return result;
}

export function vigenereDecrypt(ciphertext, keyword) {
  const clean = ciphertext.toLowerCase().replace(/[^a-z]/g, '');
  const key = keyword.toLowerCase().replace(/[^a-z]/g, '');
  let result = '';
  for (let i = 0; i < clean.length; i++) {
    const c = clean.charCodeAt(i) - 97;
    const k = key.charCodeAt(i % key.length) - 97;
    result += String.fromCharCode(((c - k + 26) % 26) + 97);
  }
  return result;
}