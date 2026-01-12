import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdicionarPage } from './adicionar.page';

describe('AdicionarPage', () => {
  let component: AdicionarPage;
  let fixture: ComponentFixture<AdicionarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
