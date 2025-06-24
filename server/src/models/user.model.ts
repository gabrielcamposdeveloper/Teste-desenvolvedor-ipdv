export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  ativo: boolean;
  cargo_id?: number;
  cargo_nome?: string; 
}
