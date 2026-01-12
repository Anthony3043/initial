import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RelatoriosPage } from './relatorios.page';

describe('RelatoriosPage', () => {
  let component: RelatoriosPage;
  let fixture: ComponentFixture<RelatoriosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatoriosPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
