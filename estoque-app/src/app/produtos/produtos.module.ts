import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosPage } from './produtos.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProdutosPageRoutingModule } from './produtos-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProdutosPageRoutingModule
  ],
  declarations: [ProdutosPage]
})
export class ProdutosPageModule {}
