import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/utils/constantes.util';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.page.html',
  styleUrls: ['./registro-entrada.page.scss'],
})
export class RegistroEntradaPage implements OnInit {

  public data: any;
  nombreUsuario;


  constructor() { }

  ngOnInit() {
    this.ingresarRegistro();
    
  }
  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    console.log(this.data);
    console.log('nombre', this.nombreUsuario);
  }

}
