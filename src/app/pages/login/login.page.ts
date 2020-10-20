import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

import { 
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed 
  } from '@capacitor/core';
  const { PushNotifications, Modals } = Plugins;
  
import { FCM } from '@capacitor-community/fcm';
import { AngularFirestore } from '@angular/fire/firestore';
import { Constantes } from 'src/app/utils/constantes.util';

  const fcm = new FCM();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tipoDocumentos: any = [];
  instituciones: any = [];
  usuario: any = [];

  tipoDocumento;
  universidad;
  numeroDocumento;
  mensajeError;

  constructor(
    private loginService: LoginService,
    private route: Router,
    public alertController: AlertController,
    private firestore: AngularFirestore,
    public toastController: ToastController) { }

    ngOnInit() {
    this.obtenerTipoDocumento();
    this.obternerInstituciones();
  }

  //alerta usuaio activo
  async presentAlertUsuarioActivo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido a nuestra aplicación APPIN',     
      message: '"Tu aporte es muy importante para nosotros, nos ayudas a combatir el COVID"',
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
  //alerta usuario no activo
  async presentAlertUsuarioInActivo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario No identificado',     
      message: '!Desea realizar el registro de su usuario¡',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.route.navigate(['registro']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 8000
    });
    toast.present();
  }

  /*Metodo para cargar los tipos de documento*/
  // obtenerTipoDocumento() {
  //   this.loginService.obtenerTiposDocumentos().finally(() =>{
  //     console.log('Servicio completado correctamente');
  //   }).then(resp =>{
  //     this.tipoDocumentos = resp;
  //     console.log(this.tipoDocumentos);
  //   })
  // }

  obtenerTipoDocumento() {
    this.loginService.obtenerTiposDocumentos().pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.tipoDocumentos = resp;
        //alert('1');
        //console.log(this.tipoDocumentos);
      }, (error) => {
        this.mensajeError = error.message;
        this.presentToast(error.message)
      }
      );
  }

  /*Metodo para cargar las instituciones*/
  obternerInstituciones() {
    this.loginService.obtenerInstituciones().pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.instituciones = resp;
        console.log(this.instituciones);
      });
  }

  /*Metodo para validar si el usuario esta activo en la base de datos*/
  async validarIngreso() {

    this.loginService.validarAcceso(this.tipoDocumento, this.numeroDocumento, this.universidad).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.usuario = resp;
        console.log(this.usuario)
        if (this.usuario[0].activo === true) {
          sessionStorage.setItem(Constantes.DATOS_SESION_USUARIO, JSON.stringify(this.usuario[0])); 
          /* Si el usuario esta activo lo direcciono a la ruta donde debe navegar la aplicacion */
          this.presentAlertUsuarioActivo();
        } else {
          this.presentAlertUsuarioInActivo();
        }
      });
  }
}
