import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RetiradasPageRoutingModule } from './retiradas-routing.module';
import { RetiradasPage } from './retiradas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetiradasPageRoutingModule
  ],
  declarations: [RetiradasPage]
})
export class RetiradasPageModule {}