export interface IPaciente {
  Id?: number;
  Nome: string;
  Sobrenome: string;
  DataNascimento: string;
  Genero: string;
  CPF?: string;
  Rg: string;
  UF_RG: string;
  Email: string;
  Celular?: string;
  TelefoneFixo?: string;
  ConvenioId?: number;
  NumeroCarteirinha?: string;
  ConvenioNome?: string;
  validadeCarteirinha?: string;
  IsActive?: boolean;
}

