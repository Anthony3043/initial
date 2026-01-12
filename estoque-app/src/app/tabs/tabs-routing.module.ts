import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'produtos',
        loadChildren: () => import('../produtos/produtos.module').then(m => m.ProdutosPageModule)
      },
      {
        path: 'adicionar',
        loadChildren: () => import('../adicionar/adicionar.module').then(m => m.AdicionarPageModule)
      },
      {
        path: 'relatorios',
        loadChildren: () => import('../relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/produtos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/produtos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
