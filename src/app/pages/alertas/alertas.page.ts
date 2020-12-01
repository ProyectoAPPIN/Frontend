import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { LavadonotificacionesService } from 'src/app/services/lavadonotificaciones.service';
import { Constantes } from 'src/app/utils/constantes.util';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
})
export class AlertasPage implements OnInit {

  data: any;
  nombreUsuario;
  codUsuario;
  LavadoNotificacionesService: any;
  notificaciones:any=[];  
  

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    private loginService: LavadonotificacionesService,
    private route: Router,
    
  ) { }

  ngOnInit() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario;
    this.data.codUsuario;
    this.presentLoadingAlertas();
    this.obtenerNotificacionAlertas(this.data.codUsuario);
    this.presentLoadingInicio;
  }
  
  async presentLoadingInicio() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  /*Metodo para cargar las notificaciones*/
  obtenerNotificacionAlertas(usuarioCod:string) {
    this.loginService.notificacionesUsuario(usuarioCod).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.notificaciones = resp;
        console.log(this.notificaciones);
      });
  }

  //loading de cargue de aplicacion
  async presentLoadingAlertas() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  
  IngresarLavado(codigoNoti: string){
    alert(codigoNoti);
    //this.route.navigate(['registro-entrada', codigoNoti]);
  }


    //alerta usuaio activo
    // async presentAlertUsuarioActivo(router:string) {
    //   const alert = await this.alertController.create({
    //     cssClass: 'my-custom-class',
    //     header: 'Bienvenido a nuestra aplicación APPIN',
    //     message: '"Tu aporte es muy importante para nosotros, nos ayudas a combatir el COVID"',
    //     buttons: [
    //       {
    //         text: 'Ok',
    //         handler: () => {
    //           if(router == '1'){
    //             this.route.navigate(['registro-entrada']);
    //           }else{
    //             this.route.navigate(['inicio']);
    //           }
              
    //         }
    //       }
    //     ]
    //   });
    //   await alert.present();
    // }

}
