import { UserFields } from './types';

class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _phoneNumber: string;

  constructor(fields: UserFields) {
    this._id = fields.id;
    this._name = fields.name;
    this._email = fields.email;
    this._phoneNumber = fields.phoneNumber;
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  email(): string {
    return this._email;
  }

  phoneNumber(): string {
    return this._phoneNumber;
  }
}

export default User;
