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
      message: '¡Si deseas realizarla acércate al lavamanos más cercano!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {            
              this.route.navigate(['/cuidados']);          
          }
        }
      ]
    });

    await alert.present();

  }

  async presentAlertas(nombre:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '' + `${nombre}`+ ' tiene las siguientes notificaciones de lavado !',
      message: 'Acércate, al lavamanos más cercano según la fecha y hora establecida',
      buttons: [
        {
          text: 'Ok'     
        }
      ]
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

  async presentAlertRegistroLavado(codigoNoti:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Las manos limpias salvan vidas, Tu aporte es muy importante para nosotros, nos ayudas a combatir el COVID-19',
      message: '"Por favor acércate al lavamanos más cercano y realiza el registro leyendo el codigo QR."',
      buttons: [
        {
          text: 'Ok',
          handler: () => {            
              this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);          
          }
        }
      ]
    });
    await alert.present();
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
        //console.log( this.notificaciones);      
        if (this.notificaciones.length > 1) {          
            this.mostrar = true;
            this.presentAlertas(this.nombreUsuario);        
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
    this.presentAlertRegistroLavado(codigoNoti);
    //alert("ingreso");
    //this.route.navigate(['registro-entrada', codigoNoti]);
    //this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);
  }

  ingresarPaginaCuidados() {  
     
    this.route.navigate(['/cuidados']);
  }
  ingresarPaginaRegistroSintomas(){
    this.route.navigate(['/registrar-sintomas']);
  }
  ingresarPaginaInicio(){
    this.route.navigate(['/pagina-inicio']);
  }
}
