import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/utils/constantes.util';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';



@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.page.html',
  styleUrls: ['./registro-entrada.page.scss'],
})
export class RegistroEntradaPage implements OnInit {

  data: any;
  nombreUsuario;
  barcodeData: any;

  constructor( private barcodeScanner: BarcodeScanner ) { }

  ngOnInit() {
    this.ingresarRegistro();
    
  }
  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    console.log(this.data);
    console.log('nombre', this.nombreUsuario);
  }
  qrParaIngresar(){
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
