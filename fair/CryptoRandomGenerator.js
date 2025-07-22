import crypto from 'crypto';

export default class CryptoRandomGenerator {
  static generateKey(bits = 256) {
    return crypto
      .randomBytes(bits / 8)
      .toString('hex')
      .toUpperCase();
  }

  static getSecureInt(max, min = 0) {
    if (max <= 0) throw new Error('Range must be positive');
    const range = max - min + 1;
    const maxAcceptable = Math.floor(256 / range) * range - 1;

    let byte;
    do {
      [byte] = crypto.randomBytes(1);
    } while (byte > maxAcceptable);

    return min + (byte % range);
  }

  static computeHMAC_SHA3(message, hexKey) {
    return crypto
      .createHmac('sha3-256', Buffer.from(hexKey, 'hex'))
      .update(message.toString())
      .digest('hex');
  }
}
