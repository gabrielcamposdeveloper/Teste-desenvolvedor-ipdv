export interface Credencial {
  id: number;
  usuario_id: number;
  senha: string; 
  token?: string;
  atualizado_em?: Date;
}