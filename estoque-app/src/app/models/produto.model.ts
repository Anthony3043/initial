export interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  categoria: string;
  descricao?: string;
  dataAtualizacao: Date;
}