import User from '../user/user';
import { PublicationCharacteristic, PublicationFields, PublicationImage } from './types';

class Publication {
  private _id: string;
  private _name: string;
  private _description: string;
  private _category: string;
  private _gender: string;
  private _breed: string | null;
  private _weightInGrams: number | null;
  private _ageInYears: number | null;
  private _zipCode: string;
  private _city: string;
  private _state: string;
  private _isArchived: boolean;
  private _characteristics: PublicationCharacteristic[];
  private _images: PublicationImage[];
  private _author: User;

  constructor(fields: PublicationFields) {
    this._id = fields.id;
    this._name = fields.name;
    this._description = fields.description;
    this._category = fields.category;
    this._gender = fields.gender;
    this._breed = fields.breed;
    this._weightInGrams = fields.weightInGrams;
    this._ageInYears = fields.ageInYears;
    this._zipCode = fields.zipCode;
    this._city = fields.city;
    this._state = fields.state;
    this._isArchived = fields.isArchived;
    this._characteristics = fields.characteristics;
    this._images = fields.images;
    this._author = new User(fields.author);
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  description(): string {
    return this._description;
  }

  category(): string {
    return this._category;
  }

  gender(): string {
    return this._gender;
  }

  breed(): string | null {
    return this._breed;
  }

  weightInGrams(): number | null {
    return this._weightInGrams;
  }

  ageInYears(): number | null {
    return this._ageInYears;
  }

  zipCode(): string {
    return this._zipCode;
  }

  city(): string {
    return this._city;
  }

  state(): string {
    return this._state;
  }

  isArchived(): boolean {
    return this._isArchived;
  }

  characteristics(): PublicationCharacteristic[] {
    return this._characteristics;
  }

  images(): PublicationImage[] {
    return this._images;
  }

  author(): User {
    return this._author;
  }
}

export default Publication;
