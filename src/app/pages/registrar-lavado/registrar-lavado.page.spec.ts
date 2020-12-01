import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrarLavadoPage } from './registrar-lavado.page';

describe('RegistrarLavadoPage', () => {
  let component: RegistrarLavadoPage;
  let fixture: ComponentFixture<RegistrarLavadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarLavadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarLavadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
