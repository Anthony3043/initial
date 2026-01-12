import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';
import { Produto } from '../models/produto.model';
import { Retirada } from '../models/retirada.model';

@Component({
  selector: 'app-relatorios',
  templateUrl: 'relatorios.page.html',
  styleUrls: ['relatorios.page.scss'],
  standalone: false,
})
export class RelatoriosPage implements OnInit {
  totalProdutos = 0;
  totalItens = 0;
  valorTotal = 0;
  produtosBaixoEstoque = 0;
  produtosBaixoEstoqueList: Produto[] = [];
  
  totalRetiradas = 0;
  valorTotalRetiradas = 0;
  retiradas: Retirada[] = [];

  constructor(
    private estoqueService: EstoqueService,
    private router: Router
  ) {}

  ngOnInit() {
    this.estoqueService.produtos$.subscribe(produtos => {
      this.calcularEstatisticas(produtos);
    });
    
    this.estoqueService.retiradas$.subscribe(retiradas => {
      this.calcularEstatisticasRetiradas(retiradas);
    });
  }

  calcularEstatisticas(produtos: Produto[]) {
    this.totalProdutos = produtos.length;
    this.totalItens = produtos.reduce((total, produto) => total + produto.quantidade, 0);
    this.valorTotal = produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    
    this.produtosBaixoEstoqueList = produtos.filter(produto => produto.quantidade <= 5);
    this.produtosBaixoEstoque = this.produtosBaixoEstoqueList.length;
  }
  
  calcularEstatisticasRetiradas(retiradas: Retirada[]) {
    this.retiradas = retiradas.sort((a, b) => new Date(b.dataRetirada).getTime() - new Date(a.dataRetirada).getTime());
    this.totalRetiradas = retiradas.reduce((total, retirada) => total + retirada.quantidade, 0);
    this.valorTotalRetiradas = retiradas.reduce((total, retirada) => total + (retirada.preco * retirada.quantidade), 0);
  }

  verRetiradas() {
    this.router.navigate(['/retiradas']);
  }
}
