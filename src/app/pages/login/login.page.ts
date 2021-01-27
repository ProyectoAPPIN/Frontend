import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
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
 
  datosUniversidad: any = [{    
    codInstitucion: ""    
  }];

  tipoDocumento;
  universidad;
  numeroDocumento;
  mensajeError;
  ingresoActivo;

  constructor(
    private loginService: LoginService,
    private route: Router,
    public alertController: AlertController,
    private firestore: AngularFirestore,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoadingInicio();
    this.obtenerTipoDocumento();
    this.obternerInstituciones();
  }

  //alerta usuaio activo
  async presentAlertUsuarioActivo(router:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido a nuestra aplicación APPIN',
      message: '"Tu aporte es muy importante para nosotros, nos ayudas a combatir el COVID"',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if(router == '1'){
              this.route.navigate(['registro-entrada']);
            }else{
              this.route.navigate(['pagina-inicio']);
            }
            
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

  //alerta de campos requeridos
  async presentAlertCamposRequeridos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Debe completar la información',
      buttons: ['OK']
    });

    await alert.present();
  }

  //loading de cargue de aplicacion
  async presentLoadingInicio() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  //loading de ingreso
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere....',
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  //metodo de obtener tipo documento
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
        //this.presentToast(error.message)
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
  validarIngreso() {
    if (this.tipoDocumento === undefined || this.numeroDocumento === undefined || this.universidad === undefined) {
      this.presentAlertCamposRequeridos();
    } else {
      this.presentLoading();
      this.loginService.validarAcceso(this.tipoDocumento, this.numeroDocumento, this.universidad).pipe(
        finalize(() => {
          console.log('Servicio completado correctamente');
          setTimeout(() => {
            //this.loadingCtrl.dismiss();
          }, 500);
        }
        )).subscribe(resp => {
          this.usuario = resp;
          //console.log(this.usuario)
          /* Si el usuario esta activo pero no tiene ingreso a la sede */
          if (this.usuario[0].activo === true && this.usuario[0].ingresoActivo === "0") {
            sessionStorage.setItem(Constantes.DATOS_SESION_USUARIO, JSON.stringify(this.usuario[0]));
            
            this.datosUniversidad[0].codInstitucion = this.universidad;            
            sessionStorage.setItem(Constantes.DATOS_SESION_UNIVERSIDAD, JSON.stringify(this.datosUniversidad[0]));
            let opcionRouter = "1";            
            this.presentAlertUsuarioActivo(opcionRouter);
          } 
          /* Si el usuario esta activo pero si tiene ingreso a la sede */
          if (this.usuario[0].activo === true && this.usuario[0].ingresoActivo === "1") {
            sessionStorage.setItem(Constantes.DATOS_SESION_USUARIO, JSON.stringify(this.usuario[0]));
            this.datosUniversidad[0].codInstitucion = this.universidad;            
            sessionStorage.setItem(Constantes.DATOS_SESION_UNIVERSIDAD, JSON.stringify(this.datosUniversidad[0]));
            
            let opcionRouter = "2";
            this.presentAlertUsuarioActivo(opcionRouter);
          }  
          /* el usuario no esta activo lo dirreciono a la opcion de registro*/
          if(this.usuario[0].activo === false){
            this.presentAlertUsuarioInActivo();
          }         
          
        });
    }
  }
}
