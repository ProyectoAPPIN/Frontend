import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-politica-tratamiento-datos',
  templateUrl: './politica-tratamiento-datos.page.html',
  styleUrls: ['./politica-tratamiento-datos.page.scss'],
})
export class PoliticaTratamientoDatosPage implements OnInit{
  //Se crea politica de datos como archivo imagenes 
  slides = [
    {
      img : 'assets/Politicas/Politicas_tratamiento_1.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_2.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_3.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_4.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_5.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_6.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_7.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_8.jpg',
      titulo : ''
    },
    {
      img : 'assets/Politicas/Politicas_tratamiento_9.jpg',
      titulo : ''
    },

  ]
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    ) {}
  ngOnInit() {
    this.presentAlertPoliticaDatos();
    this.presentLoadingPolitica();
  }
  //se construye loading para cargue de politica de datos
  async presentLoadingPolitica() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  //se crea alerta para politica de datos

    async presentAlertPoliticaDatos() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Tus datos son muy importantes, lee el uso que se le daran',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
}
