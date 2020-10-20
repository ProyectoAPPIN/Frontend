import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoliticaTratamientoDatosPage } from './politica-tratamiento-datos.page';

describe('PoliticaTratamientoDatosPage', () => {
  let component: PoliticaTratamientoDatosPage;
  let fixture: ComponentFixture<PoliticaTratamientoDatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticaTratamientoDatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticaTratamientoDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
