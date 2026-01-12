import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController
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

  async verRetiradas() {
    if (this.retiradas.length === 0) {
      const alert = await this.alertController.create({
        header: 'Nenhuma Retirada',
        message: 'Ainda não há produtos retirados do estoque.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const retiradasTexto = this.retiradas.slice(0, 10).map(r => 
      `${r.nomeProduto}: ${r.quantidade} un. - R$ ${(r.preco * r.quantidade).toFixed(2)} (${new Date(r.dataRetirada).toLocaleDateString('pt-BR')})`
    ).join('\n');

    const alert = await this.alertController.create({
      header: 'Últimas Retiradas',
      message: retiradasTexto,
      buttons: ['Fechar']
    });
    await alert.present();
  }
}
