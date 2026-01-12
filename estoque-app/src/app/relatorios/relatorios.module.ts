import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelatoriosPage } from './relatorios.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RelatoriosPageRoutingModule } from './relatorios-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RelatoriosPageRoutingModule
  ],
  declarations: [RelatoriosPage]
})
export class RelatoriosPageModule {}
