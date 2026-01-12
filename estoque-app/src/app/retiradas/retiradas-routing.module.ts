import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetiradasPage } from './retiradas.page';

const routes: Routes = [
  {
    path: '',
    component: RetiradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetiradasPageRoutingModule {}