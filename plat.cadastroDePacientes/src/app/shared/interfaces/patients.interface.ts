export interface IPaciente {
  id?: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  genero: string;
  cpf?: string;
  rg: string;
  uf_RG: string;
  email: string;
  celular?: string;
  telefoneFixo?: string;
  convenioId?: number;
  numeroCarteirinha?: string;
  validadeCarteirinha?: string;
  isActive?: boolean;
}

