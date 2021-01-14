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
  notificaciones: any = [];
  mostrar:boolean;


  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    private loginService: LavadonotificacionesService,
    private route: Router,

  ) { }

  ngOnInit() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario = this.data.codUsuario;
    // this.presentLoadingAlertas();
    // this.presentLoadingAlertasVacio();
    this.obtenerNotificacionAlertas();
    // this.presentLoadingInicio();
  }

  async presentLoadingAlertasVacio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '!No existen notificaciones de lavado, pero tu registro es muy importante para nosotros,',
      message: 'Si deseas realizarla acercate al lavamanos mas cercano!',
      buttons: ['OK']
    });

    await alert.present();

  }

  async presentLoadingInicio() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  /*Metodo para cargar las notificaciones*/
  obtenerNotificacionAlertas() {
    //alert(this.codUsuario);
    this.loginService.notificacionesUsuario(this.codUsuario).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.notificaciones = resp;       
        if (this.notificaciones.length > 1) {
          this.mostrar = true;
        // this.presentLoadingAlertasVacio()
        }else{
          // alert("d");
          this.mostrar = false;
          this.presentLoadingAlertasVacio()
        }
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

  IngresarLavado(codigoNoti: string) {
    alert("ingreso");
    //this.route.navigate(['registro-entrada', codigoNoti]);
    this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);
  }
}
