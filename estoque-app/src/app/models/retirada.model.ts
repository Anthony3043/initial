export interface Retirada {
  id: string;
  produtoId: string;
  nomeProduto: string;
  quantidade: number;
  preco: number;
  dataRetirada: Date;
}