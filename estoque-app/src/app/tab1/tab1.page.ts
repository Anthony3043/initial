import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  mostrarBusca = false;
  termoBusca = '';

  constructor(
    private estoqueService: EstoqueService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.estoqueService.produtos$.subscribe(produtos => {
      this.produtos = produtos;
      this.produtosFiltrados = produtos;
    });
  }

  abrirBusca() {
    this.mostrarBusca = !this.mostrarBusca;
    if (!this.mostrarBusca) {
      this.termoBusca = '';
      this.produtosFiltrados = this.produtos;
    }
  }

  buscarProdutos() {
    if (this.termoBusca.trim() === '') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtosFiltrados = this.estoqueService.buscarProdutos(this.termoBusca);
    }
  }

  async editarProduto(produto: Produto) {
    const alert = await this.alertController.create({
      header: 'Editar Produto',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome',
          value: produto.nome
        },
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preço',
          value: produto.preco
        },
        {
          name: 'quantidade',
          type: 'number',
          placeholder: 'Quantidade',
          value: produto.quantidade
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            this.estoqueService.atualizarProduto(produto.id, {
              nome: data.nome,
              preco: parseFloat(data.preco),
              quantidade: parseInt(data.quantidade)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async removerProduto(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deseja realmente remover este produto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          handler: () => {
            this.estoqueService.removerProduto(id);
          }
        }
      ]
    });
    await alert.present();
  }
}
