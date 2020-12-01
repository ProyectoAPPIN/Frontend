import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuidadosPage } from './cuidados.page';

describe('CuidadosPage', () => {
  let component: CuidadosPage;
  let fixture: ComponentFixture<CuidadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuidadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuidadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
