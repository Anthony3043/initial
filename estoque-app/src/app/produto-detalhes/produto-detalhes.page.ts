import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { EstoqueService } from '../services/estoque.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.page.html',
  styleUrls: ['./produto-detalhes.page.scss'],
  standalone: false,
})
export class ProdutoDetalhesPage implements OnInit {
  produto: Produto | null = null;
  quantidadeRetirar = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private estoqueService: EstoqueService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produto = this.estoqueService.obterProduto(id) || null;
      if (!this.produto) {
        this.router.navigate(['/tabs/produtos']);
      }
    }
  }

  async retirarEstoque() {
    if (!this.produto || this.quantidadeRetirar <= 0) return;

    if (this.quantidadeRetirar > this.produto.quantidade) {
      const toast = await this.toastController.create({
        message: 'Quantidade insuficiente no estoque!',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar Retirada',
      message: `Retirar ${this.quantidadeRetirar} unidade(s) do estoque?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            if (this.produto) {
              const novaQuantidade = this.produto.quantidade - this.quantidadeRetirar;
              this.estoqueService.atualizarProduto(this.produto.id, {
                quantidade: novaQuantidade
              });
              this.estoqueService.registrarRetirada(this.produto.id, this.quantidadeRetirar);
              this.produto.quantidade = novaQuantidade;
              this.quantidadeRetirar = 1;
              this.mostrarToast('Estoque atualizado com sucesso!', 'success');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(['/tabs/produtos']);
  }
}