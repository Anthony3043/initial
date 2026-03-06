import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoDetalhesPage } from './produto-detalhes.page';
import { ProdutoDetalhesPageRoutingModule } from './produto-detalhes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProdutoDetalhesPageRoutingModule
  ],
  declarations: [ProdutoDetalhesPage]
})
export class ProdutoDetalhesPageModule {}