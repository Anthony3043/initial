import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: 'adicionar.page.html',
  styleUrls: ['adicionar.page.scss'],
  standalone: false,
})
export class AdicionarPage {
  produto = {
    nome: '',
    preco: 0,
    quantidade: 0,
    descricao: ''
  };

  constructor(
    private estoqueService: EstoqueService,
    private toastController: ToastController
  ) {}

  async adicionarProduto() {
    if (this.produto.nome && this.produto.preco > 0 && this.produto.quantidade >= 0) {
      this.estoqueService.adicionarProduto(this.produto);
      
      const toast = await this.toastController.create({
        message: 'Produto adicionado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      
      this.limparFormulario();
    }
  }

  limparFormulario() {
    this.produto = {
      nome: '',
      preco: 0,
      quantidade: 0,
      descricao: ''
    };
  }
}
