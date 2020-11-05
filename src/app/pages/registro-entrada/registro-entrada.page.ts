import { Component, OnInit } from '@angular/core';
import { Constantes } from 'src/app/utils/constantes.util';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { RegistroEntradaService } from 'src/app/services/registro-entrada.service';
import { finalize } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { VerificacionService } from 'src/app/services/verificacion.service';


@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.page.html',
  styleUrls: ['./registro-entrada.page.scss'],
})
export class RegistroEntradaPage implements OnInit {

  data: any;
  nombreUsuario;
  codUsuario;
  barcode: string;

 
  respuesta: any = {
    codUsuario: "",
    fecha: "",
    hora: "",
    sede: "",
  };

  datosEntrada: any = {
    codUsuario: "",
    codInstitucion: "",
    temperatura: "",
    oxigenacion: "",
  };


  constructor(
    private barcodeScanner: BarcodeScanner,
    private registroEntradaService: RegistroEntradaService,
    public alertController: AlertController,
    private route: Router,
    private verificacioncodService: VerificacionService
  ) {
    this.barcode = '';
  }

  ngOnInit() {
    this.ingresarRegistro();

  }
  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario = this.data.codUsuario;
    console.log(this.data);
    console.log('nombre', this.nombreUsuario);
    console.log('Codigo-Usuario', this.codUsuario);

  }
  LeerCode() {
    // alert("entro");
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.barcode = barcodeData['text'];
        this.datosEntrada.codInstitucion = this.barcode;
        this.registroEntrada();
      })
      .catch(err => {
        this.barcode = JSON.stringify(err);
      });
  }
  //se crea función para envío de datos de ingreso.
  registroEntrada() {
    this.datosEntrada.codUsuario = this.codUsuario;
    //console.log(this.datosEntrada);
    if (this.datosEntrada.temperatura == "" || this.datosEntrada.oxigenacion == "") {
      this.presentAlertDatosEntrada();
    }   

    this.registroEntradaService.Entrada(this.datosEntrada).pipe(
      finalize(() => {
        console.log('Servicio validar codigo completado correctamente');
      })).subscribe(resp => {
        this.respuesta = resp
        this.presentAlertRegistroEntrada();        
        //console.log(this.respuesta);
      });
  }
  async presentAlertDatosEntrada() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Falta de datos',
      message: '"Por favor ingresar el valor de la temperatura y oxigenación"',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.route.navigate(['registro-entrada']);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertRegistroEntrada() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: '"Bienvenido a la sede cartago su registro fue exitoso "',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.route.navigate(['inicio']);
          }
        }
      ]
    });
    await alert.present();
  }

}