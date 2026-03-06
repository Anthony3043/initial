import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../services/estoque.service';
import { Produto } from '../models/produto.model';

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

  constructor(private estoqueService: EstoqueService) {}

  ngOnInit() {
    this.estoqueService.produtos$.subscribe(produtos => {
      this.calcularEstatisticas(produtos);
    });
  }

  calcularEstatisticas(produtos: Produto[]) {
    this.totalProdutos = produtos.length;
    this.totalItens = produtos.reduce((total, produto) => total + produto.quantidade, 0);
    this.valorTotal = produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    
    this.produtosBaixoEstoqueList = produtos.filter(produto => produto.quantidade <= 5);
    this.produtosBaixoEstoque = this.produtosBaixoEstoqueList.length;
  }
}
