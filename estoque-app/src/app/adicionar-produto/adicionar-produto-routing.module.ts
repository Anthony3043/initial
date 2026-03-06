import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarProdutoPage } from './adicionar-produto.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarProdutoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdicionarProdutoPageRoutingModule {}
