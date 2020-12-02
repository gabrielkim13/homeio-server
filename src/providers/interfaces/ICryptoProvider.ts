interface ICryptoProvider {
  encrypt(password: string): { hash: string; salt: string };
  verify(password: string, hash: string, salt: string): boolean;
}

export default ICryptoProvider;
