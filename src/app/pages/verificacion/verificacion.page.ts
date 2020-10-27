import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/internal/operators/finalize';
import { VerificacionService } from 'src/app/services/verificacion.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})
export class VerificacionPage implements OnInit {

  respuesta: any = {
    codRespuesta: "",
    codUsuario: "",
    codigoActivacion: "",
    activo: false
  };

  codigoVerificacion: any = {
    codUsuario: "",
    codigoActivacion: "",
    activo: false
  };
  codigoVerificacionre: any = {
    codUsuario: "",
    codigoActivacion: "",
    activo: false
  };
  activo;
  codigoActivacion;
  codUsuario;


  constructor(
    private route: Router,
    private rutaActiva: ActivatedRoute,
    public alertController: AlertController,
    private verificacioncodService: VerificacionService) { }

  ngOnInit() {
    this.codUsuario = this.rutaActiva.snapshot.params.codUsuario;
    console.log(this.codUsuario);
  }

  enviarCodigo() {
    if (this.codigoActivacion == "" || this.codigoActivacion == undefined) {
      this.presentAlert('Debe ingresar un codigo de activación');
    }
    var cadena = [];
    var codigo = "";
    cadena = this.codigoActivacion;
    for (var i = 0; i <= cadena.length - 1; i++) {
      if (cadena[i] != '-') {
        codigo = codigo + cadena[i];
      }
    }
    //armo el objeto para enviar al servicio    
    this.codigoVerificacion.codUsuario = this.codUsuario;
    this.codigoVerificacion.codigoActivacion = codigo;

    //console.log(this.codigoVerificacion);
    
    this.verificacioncodService.validarCod(this.codigoVerificacion).pipe(
      finalize(() => {
        console.log('Servicio validar codigo completado correctamente');
      })).subscribe(resp => {
        this.respuesta = resp
        if (this.respuesta[0].codRespuesta != "1") {
          this.presentAlert(this.respuesta[0].codUsuario);
        } else {
          this.presentAlertConfirmacion('El usuario se activo correctamente, !debe iniciar session para usar la aplicación');
        }

      });
  }
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      subHeader: 'Subtitle',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
//alerta de confirmacion
  async presentAlertConfirmacion(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      subHeader: 'Usuario Activo',
      message: mensaje,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.route.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

//alerta de reenvio de codigo de verificación
async presentAlertConfirmacionreenviocod(mensaje: string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirmación',
    subHeader: 'Usuario Activo',
    message: mensaje,
    buttons: [
      {
        text: 'Ok',
        handler: () => {          
        }
      }
    ]
  });

  await alert.present();
}

  reenviarCod(){
    // //armo el objeto para enviar al servicio    
    this.codigoVerificacionre.codUsuario = this.codUsuario;
    //console.log(this.codigoVerificacionre);
    
    this.verificacioncodService.reenviarCod(this.codigoVerificacionre).pipe(
      finalize(() => {
        console.log('Servicio validar codigo completado correctamente');
      })).subscribe(resp => {
        this.respuesta = resp
        console.log(this.respuesta);
        if (this.respuesta[0].codigoActivacion != "-1") {
          this.presentAlertConfirmacionreenviocod('Se reenvio el codigo de verificación a tu correo electrónico, debe ingresarlo nuevamente para continuar el proceso');
        }           
      });
  }
}

