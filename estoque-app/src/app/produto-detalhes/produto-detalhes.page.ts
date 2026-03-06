import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private estoqueService: EstoqueService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produto = this.estoqueService.obterProduto(id) || null;
    }
  }

  async excluirQuantidade() {
    if (!this.produto) return;

    const alert = await this.alertController.create({
      header: 'Excluir Quantidade',
      message: `Quantidade atual: ${this.produto.quantidade}. Digite a quantidade a excluir:`,
      inputs: [
        {
          name: 'quantidade',
          type: 'number',
          placeholder: '0',
          min: 1,
          max: this.produto.quantidade
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: (data) => {
            const qtd = parseInt(data.quantidade);
            if (qtd > 0 && qtd <= this.produto!.quantidade) {
              this.estoqueService.reduzirQuantidade(this.produto!.id, qtd);
              if (this.produto!.quantidade <= 0) {
                this.router.navigate(['/tabs/produtos']);
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }
}