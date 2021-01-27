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
  //barcode: string;
  barcode: any = [];
 
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
        // this.barcode = barcodeData['text'];
        // this.datosEntrada.codInstitucion = this.barcode;
        this.barcode = JSON.parse(barcodeData['text']);
        var institucion = this.barcode[0]['codInstitucion']; 
        var fechaQR = this.barcode[0]['fecha']; 
        var fechaDia = ""; 
        
        var fechaactual = new Date();
        var dia = fechaactual.getDate();
        var mes = fechaactual.getMonth();
        var ahno = fechaactual.getFullYear();        
        if(mes == 0){         
          var mesd = '01';
          fechaDia =  dia + "/" + mesd + "/" + ahno ;
         }else{
           fechaDia =  dia + "/" + mes + "/" + ahno ;
         } 
         if( fechaDia != fechaQR ){
           this.presentAlertQRInvalido();  
           return;        
        }else
        {
          this.datosEntrada.codInstitucion = institucion;
          this.registroEntrada();          
        }      
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

  async presentAlertQRInvalido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '!Error¡',
      message: 'No se puede registrar el ingreso, código QR invalido',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
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
      message: 'Su registro fue exitoso, Bienvenido a la universidad del valle',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.route.navigate(['pagina-inicio']);
          }
        }
      ]
    });
    await alert.present();
  }

}