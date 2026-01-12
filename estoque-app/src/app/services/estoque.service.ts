import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';
import { Retirada } from '../models/retirada.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private produtos: Produto[] = [];
  private retiradas: Retirada[] = [];
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  private retiradasSubject = new BehaviorSubject<Retirada[]>([]);
  
  produtos$ = this.produtosSubject.asObservable();
  retiradas$ = this.retiradasSubject.asObservable();

  constructor() {
    this.carregarProdutos();
    this.carregarRetiradas();
  }

  private carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      const produtos = JSON.parse(produtosSalvos);
      this.produtos = produtos.map((p: any) => ({
        ...p,
        dataAtualizacao: new Date(p.dataAtualizacao)
      }));
      this.produtosSubject.next(this.produtos);
    }
  }

  private carregarRetiradas() {
    const retiradasSalvas = localStorage.getItem('retiradas');
    if (retiradasSalvas) {
      const retiradas = JSON.parse(retiradasSalvas);
      this.retiradas = retiradas.map((r: any) => ({
        ...r,
        dataRetirada: new Date(r.dataRetirada)
      }));
      this.retiradasSubject.next(this.retiradas);
    }
  }

  private salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
    this.produtosSubject.next(this.produtos);
  }

  private salvarRetiradas() {
    localStorage.setItem('retiradas', JSON.stringify(this.retiradas));
    this.retiradasSubject.next(this.retiradas);
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
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }

  registrarRetirada(produtoId: string, quantidade: number) {
    const produto = this.obterProduto(produtoId);
    if (produto) {
      const retirada: Retirada = {
        id: Date.now().toString(),
        produtoId,
        nomeProduto: produto.nome,
        quantidade,
        preco: produto.preco,
        dataRetirada: new Date()
      };
      this.retiradas.push(retirada);
      this.salvarRetiradas();
    }
  }
}