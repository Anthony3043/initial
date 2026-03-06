import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdicionarProdutoPage } from './adicionar-produto.page';

describe('AdicionarProdutoPage', () => {
  let component: AdicionarProdutoPage;
  let fixture: ComponentFixture<AdicionarProdutoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarProdutoPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
