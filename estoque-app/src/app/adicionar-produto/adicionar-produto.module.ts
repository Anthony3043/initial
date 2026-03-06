import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdicionarProdutoPage } from './adicionar-produto.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdicionarProdutoPageRoutingModule } from './adicionar-produto-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AdicionarProdutoPageRoutingModule
  ],
  declarations: [AdicionarProdutoPage]
})
export class AdicionarProdutoPageModule {}
