import IdGenerator from './IdGenerator';

export default class CryptoUUIDGenerator extends IdGenerator {
  generate() {
    return crypto.randomUUID();
  }
}
