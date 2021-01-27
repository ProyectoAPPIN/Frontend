import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Constantes } from 'src/app/utils/constantes.util';
import { AlertController, LoadingController,ToastController } from '@ionic/angular';
import { RegistroLavadoManosService } from 'src/app/services/registro-lavado-manos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-lavado',
  templateUrl: './registrar-lavado.page.html',
  styleUrls: ['./registrar-lavado.page.scss'],
})
export class RegistrarLavadoPage implements OnInit {
  data: any;
  nombreUsuario;
  codUsuario;
  barcode: any = [];

  respuesta: any = {
    codUsuario: "",
    fecha: "",
    hora: "",
    codLavamanos:"",
    institucion: "",
  };

  datosLavado: any = {
    codRegistro: "",
    codUsuario: "",
    codLavamanos: "",
    codInstitucion: "",
  };
  codRegistro;

  objeto = {
    codLavamanos: "2",
    codInstitucion: "1"    
  };

  constructor(    
    private rutaActiva: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    private registroLavadoManosService: RegistroLavadoManosService,
    public alertController: AlertController,
    private route: Router,

  ) {
    this.barcode = '';
  }

  ngOnInit() {
    this.codRegistro = this.rutaActiva.snapshot.params.codRegistro;
    //alert(this.codRegistro);
    this.ingresarRegistro();
  }

  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario = this.data.codUsuario;
    // console.log(this.data);
    // console.log('nombre', this.nombreUsuario);
    // console.log('Codigo-Usuario', this.codUsuario);
  }

  async presentAlertQRInvalido() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '!Error¡',
      message: 'No se puede registrar el lavado de manos, código QR invalido',
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

  LeerCode() {    
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        //this.barcode = JSON.stringify(barcodeData['text']);   
        this.barcode = JSON.parse(barcodeData['text']);
        //this.barcode = this.barcode.replace(/\\"/g, '"'); 
        var lavamanos = this.barcode[0]['codLavamanos'];     
        var institucion = this.barcode[0]['codInstitucion'];
        var fechaQR = this.barcode[0]['fecha']; 
        var fechaDia = "";
        var mesConcatenado = ""; 

        var fechaactual = new Date();
        var dia = fechaactual.getDate();
        var mes = fechaactual.getMonth();
        var ahno = fechaactual.getFullYear();  
        
        mes =  mes + 1;    
        mesConcatenado = "0" + mes;   
        fechaDia =  dia + "/" + mesConcatenado + "/" + ahno ; 
           
         if( fechaDia != fechaQR ){
           this.presentAlertQRInvalido();  
           return;        
        }else
        {
         //agrego las variables al objeto                 
          this.datosLavado.codRegistro = this.codRegistro;
          this.datosLavado.codUsuario = this.codUsuario;
          this.datosLavado.codLavamanos = lavamanos;
          this.datosLavado.codInstitucion = institucion;         
          this.registroLavadoManos();         
        }     
      })
      .catch(err => {
        this.barcode = JSON.stringify(err);
      });
  }

  //se crea función para envío de datos de lavado de manos 
  registroLavadoManos(){ 
    //console.log(this.datosLavado);   
    this.registroLavadoManosService.Lavado(this.datosLavado).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
      })).subscribe(resp => {
        this.respuesta = resp
        if(this.respuesta[0].fecha != null)
        {
          this.presentAlertaRegistroLavado();
          //console.log(this.respuesta);
        }        
      });
  }
  
  async presentAlertaRegistroLavado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',   
      header: 'Tu lavado de manos se registró exitosamente',   
      message: '¡Las manos limpias salvan Vidas!',      
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

  ingresarPaginaSintomas() {    
    this.route.navigate(['/registrar-sintomas']);
  }
  ingresarPaginaInicio(){
    this.route.navigate(['/pagina-inicio']);
  }
  ingresarPaginaCuidados(){
    this.route.navigate(['/cuidados']);
  }



}//se realiza cambios el 18-01-2021
