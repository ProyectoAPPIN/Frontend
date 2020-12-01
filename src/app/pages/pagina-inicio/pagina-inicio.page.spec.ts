import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaginaInicioPage } from './pagina-inicio.page';

describe('PaginaInicioPage', () => {
  let component: PaginaInicioPage;
  let fixture: ComponentFixture<PaginaInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
