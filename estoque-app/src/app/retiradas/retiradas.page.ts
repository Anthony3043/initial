import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueService } from '../services/estoque.service';
import { Retirada } from '../models/retirada.model';

@Component({
  selector: 'app-retiradas',
  templateUrl: './retiradas.page.html',
  styleUrls: ['./retiradas.page.scss'],
  standalone: false,
})
export class RetiradasPage implements OnInit {
  retiradas: Retirada[] = [];
  retiradasFiltradas: Retirada[] = [];
  totalRetiradas = 0;
  valorTotalRetiradas = 0;
  filtroSelecionado = 'todos';
  termoBusca = '';

  constructor(
    private estoqueService: EstoqueService,
    private router: Router
  ) {}

  ngOnInit() {
    this.estoqueService.retiradas$.subscribe(retiradas => {
      this.retiradas = retiradas.sort((a, b) => new Date(b.dataRetirada).getTime() - new Date(a.dataRetirada).getTime());
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    let retiradasTemp = [...this.retiradas];
    
    // Filtro por período
    if (this.filtroSelecionado !== 'todos') {
      const agora = new Date();
      let dataLimite: Date;

      switch (this.filtroSelecionado) {
        case 'semana':
          dataLimite = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'mes':
          dataLimite = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'tres-meses':
          dataLimite = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
      }
      
      if (dataLimite!) {
        retiradasTemp = retiradasTemp.filter(retirada => 
          new Date(retirada.dataRetirada) >= dataLimite
        );
      }
    }
    
    // Filtro por busca
    if (this.termoBusca.trim()) {
      retiradasTemp = retiradasTemp.filter(retirada =>
        retirada.nomeProduto.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
    
    this.retiradasFiltradas = retiradasTemp;
    this.calcularTotais();
  }

  calcularTotais() {
    this.totalRetiradas = this.retiradasFiltradas.reduce((total, retirada) => total + retirada.quantidade, 0);
    this.valorTotalRetiradas = this.retiradasFiltradas.reduce((total, retirada) => total + (retirada.preco * retirada.quantidade), 0);
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  onBuscaChange() {
    this.aplicarFiltros();
  }

  voltar() {
    this.router.navigate(['/tabs/relatorios']);
  }
}