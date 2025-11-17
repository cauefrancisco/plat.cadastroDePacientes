export class Patient {

  id: number;
  gender: number;
  name: string;
  lastName: string;
  email: string;
  rg: string;
  cpf: string;
  uf: string;
  birthDate: string;
  landline: string;
  mobile: string;
  insurance: string;
  cardNumber: string;
  validity: string;
  active?: boolean;

  constructor(
    id: number,
    gender: number,
    name: string,
    lastName: string,
    email: string,
    rg: string,
    cpf: string,
    uf: string,
    birthDate: string,
    landline: string,
    mobile: string,
    insurance: string,
    cardNumber: string,
    validity: string,
    active?: boolean,
  ) {
    this.id = id;
    this.gender = gender;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.rg = rg;
    this.cpf = cpf;
    this.uf = uf;
    this.birthDate = birthDate;
    this.landline = landline;
    this.mobile = mobile;
    this.insurance = insurance;
    this.cardNumber = cardNumber;
    this.validity = validity;
    this.active = active;
  }
}