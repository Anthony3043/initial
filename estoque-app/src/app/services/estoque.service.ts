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
      this.produtos = JSON.parse(produtosSalvos);
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

  reduzirQuantidade(id: string, quantidade: number) {
    const produto = this.obterProduto(id);
    if (produto) {
      produto.quantidade -= quantidade;
      if (produto.quantidade <= 0) {
        this.removerProduto(id);
      } else {
        this.salvarProdutos();
      }
    }
  }

  buscarProdutos(termo: string): Produto[] {
    return this.produtos.filter(p => 
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.categoria.toLowerCase().includes(termo.toLowerCase())
    );
  }
}