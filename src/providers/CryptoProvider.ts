import { randomBytes, createHmac } from 'crypto';

import ICryptoProvider from './interfaces/ICryptoProvider';

class CryptoProvider implements ICryptoProvider {
  encrypt(password: string): { hash: string; salt: string } {
    const salt = randomBytes(8).toString('hex');
    const hash = createHmac('sha256', salt).update(password).digest('hex');

    return { hash, salt };
  }

  verify(password: string, hash: string, salt: string): boolean {
    const expectedHash = createHmac('sha256', salt)
      .update(password)
      .digest('hex');

    return expectedHash === hash;
  }
}

export default CryptoProvider;
