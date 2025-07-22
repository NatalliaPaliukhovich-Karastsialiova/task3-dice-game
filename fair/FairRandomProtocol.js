import CryptoRandomGenerator from './CryptoRandomGenerator.js';

export default class FairRandomProtocol {
  constructor(rangeMax) {
    this.rangeMax = rangeMax;
    this.secretKey = null;
    this.secretNumber = null;
    this.hmac = null;
  }

  commit() {
    this.secretNumber = CryptoRandomGenerator.getSecureInt(this.rangeMax);
    this.secretKey = CryptoRandomGenerator.generateKey();
    this.hmac = CryptoRandomGenerator.computeHMAC_SHA3(
      this.secretNumber,
      this.secretKey
    );
    return this.hmac;
  }

  reveal() {
    return {
      number: this.secretNumber,
      key: this.secretKey,
    };
  }

  static verify(number, key, hmac) {
    const check = CryptoRandomGenerator.computeHMAC_SHA3(number, key);
    return check === hmac;
  }
}
