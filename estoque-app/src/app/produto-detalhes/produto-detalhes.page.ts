import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: 'produto-detalhes.page.html',
  styleUrls: ['produto-detalhes.page.scss'],
  standalone: false,
})
export class ProdutoDetalhesPage implements OnInit {
  produto: Produto | null = null;

  constructor(
    private route: ActivatedRoute,
    private estoqueService: EstoqueService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produto = this.estoqueService.obterProduto(id) || null;
    }
  }
}