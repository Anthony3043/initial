export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao?: string;
  dataAtualizacao: Date;
}