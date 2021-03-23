export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private expirationIn: Date
  ) {}

  get token() {
    if (!this.expirationIn || new Date() > this.expirationIn) {
      return null;
    }
    return this._token;
  }
}
