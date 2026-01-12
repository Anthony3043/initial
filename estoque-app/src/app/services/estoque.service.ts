import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private produtos: Produto[] = [];
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  
  produtos$ = this.produtosSubject.asObservable();

  constructor() {
    this.carregarProdutos();
  }

  private carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      const produtos = JSON.parse(produtosSalvos);
      // Converter strings de data de volta para objetos Date
      this.produtos = produtos.map((p: any) => ({
        ...p,
        dataAtualizacao: new Date(p.dataAtualizacao)
      }));
      this.produtosSubject.next(this.produtos);
    }
  }

  private salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
    this.produtosSubject.next(this.produtos);
  }

  adicionarProduto(produto: Omit<Produto, 'id' | 'dataAtualizacao'>) {
    const novoProduto: Produto = {
      ...produto,
      id: Date.now().toString(),
      dataAtualizacao: new Date()
    };
    this.produtos.push(novoProduto);
    this.salvarProdutos();
  }

  atualizarProduto(id: string, produto: Partial<Produto>) {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.produtos[index] = { ...this.produtos[index], ...produto, dataAtualizacao: new Date() };
      this.salvarProdutos();
    }
  }

  removerProduto(id: string) {
    this.produtos = this.produtos.filter(p => p.id !== id);
    this.salvarProdutos();
  }

  obterProduto(id: string): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  buscarProdutos(termo: string): Produto[] {
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.categoria.toLowerCase().includes(termo.toLowerCase())
    );
  }
}