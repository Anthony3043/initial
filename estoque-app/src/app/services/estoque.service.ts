import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../models/produto.model';
import { Retirada } from '../models/retirada.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService implements OnDestroy {
  private apiUrl = 'https://back-end-estoque-basico.onrender.com/api';
  private produtosSubject = new BehaviorSubject<Produto[]>([]);
  private retiradasSubject = new BehaviorSubject<Retirada[]>([]);
  private intervalo: any;
  
  produtos$ = this.produtosSubject.asObservable();
  retiradas$ = this.retiradasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarProdutos();
    this.carregarRetiradas();
    this.intervalo = setInterval(() => {
      this.carregarProdutos();
      this.carregarRetiradas();
    }, 10000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  private carregarProdutos() {
    this.http.get<Produto[]>(`${this.apiUrl}/produtos`).subscribe({
      next: (produtos) => this.produtosSubject.next(produtos),
      error: (err) => console.error('Erro ao carregar produtos:', err)
    });
  }

  private carregarRetiradas() {
    this.http.get<Retirada[]>(`${this.apiUrl}/retiradas`).subscribe({
      next: (retiradas) => this.retiradasSubject.next(retiradas),
      error: (err) => console.error('Erro ao carregar retiradas:', err)
    });
  }

  adicionarProduto(produto: Omit<Produto, 'id' | 'dataAtualizacao'>) {
    this.http.post<Produto>(`${this.apiUrl}/produtos`, produto).subscribe({
      next: () => this.carregarProdutos(),
      error: (err) => console.error('Erro ao adicionar produto:', err)
    });
  }

  atualizarProduto(id: string, produto: Partial<Produto>) {
    this.http.put(`${this.apiUrl}/produtos/${id}`, produto).subscribe({
      next: () => this.carregarProdutos(),
      error: (err) => console.error('Erro ao atualizar produto:', err)
    });
  }

  removerProduto(id: string) {
    this.http.delete(`${this.apiUrl}/produtos/${id}`).subscribe({
      next: () => this.carregarProdutos(),
      error: (err) => console.error('Erro ao remover produto:', err)
    });
  }

  obterProduto(id: string): Produto | undefined {
    return this.produtosSubject.value.find(p => p.id === id);
  }

  buscarProdutos(termo: string): Produto[] {
    return this.produtosSubject.value.filter(p => 
      p.nome.toLowerCase().includes(termo.toLowerCase())
    );
  }

  registrarRetirada(produtoId: string, quantidade: number) {
    const produto = this.obterProduto(produtoId);
    if (produto) {
      const retirada = {
        produtoId,
        nomeProduto: produto.nome,
        quantidade,
        preco: produto.preco
      };
      
      this.http.post<Retirada>(`${this.apiUrl}/retiradas`, retirada).subscribe({
        next: () => {
          this.carregarRetiradas();
          this.carregarProdutos();
        },
        error: (err) => console.error('Erro ao registrar retirada:', err)
      });
    }
  }
}