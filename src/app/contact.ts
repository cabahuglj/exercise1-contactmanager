import {Identification} from './identification';
import {Address} from './address';
import {Communication} from './communication';

export class Contact {
  identification: Identification;
  addresses: Address[];
  communications: Communication[];

  constructor(identification: Identification, addresses: Address[], communications: Communication[]) {
    this.identification = identification;
    this.addresses = addresses;
    this.communications = communications;
  }
}
