import IdGenerator from './IdGenerator.js';

export default class CryptoUUIDGenerator extends IdGenerator {
  generate() {
    return crypto.randomUUID();
  }
}
