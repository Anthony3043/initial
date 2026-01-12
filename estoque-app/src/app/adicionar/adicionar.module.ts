import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdicionarPage } from './adicionar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdicionarPageRoutingModule } from './adicionar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AdicionarPageRoutingModule
  ],
  declarations: [AdicionarPage]
})
export class AdicionarPageModule {}
