import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdutoDetalhesPage } from './produto-detalhes.page';

describe('ProdutoDetalhesPage', () => {
  let component: ProdutoDetalhesPage;
  let fixture: ComponentFixture<ProdutoDetalhesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoDetalhesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});