import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrarSintomasPage } from './registrar-sintomas.page';

describe('RegistrarSintomasPage', () => {
  let component: RegistrarSintomasPage;
  let fixture: ComponentFixture<RegistrarSintomasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarSintomasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarSintomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
