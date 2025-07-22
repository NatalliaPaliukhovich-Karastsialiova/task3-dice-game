import crypto from 'crypto';

export default class CryptoRandomGenerator {
  static generateKey(bits = 256) {
    return crypto
      .randomBytes(bits / 8)
      .toString('hex')
      .toUpperCase();
  }

  static getSecureInt(max, min = 0) {
    return crypto.randomInt(min, max);
  }

  static computeHMAC_SHA3(message, hexKey) {
    return crypto
      .createHmac('sha3-256', Buffer.from(hexKey, 'hex'))
      .update(message.toString())
      .digest('hex');
  }
}
