import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'produto-detalhes/:id',
    loadChildren: () => import('./produto-detalhes/produto-detalhes.module').then(m => m.ProdutoDetalhesPageModule)
  },
  {
    path: 'retiradas',
    loadChildren: () => import('./retiradas/retiradas.module').then(m => m.RetiradasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
