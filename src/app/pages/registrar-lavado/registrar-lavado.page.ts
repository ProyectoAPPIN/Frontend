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
  barcode: any ={};


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

  LeerCode() {
    // alert("entro");
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.barcode = JSON.stringify(barcodeData['text']);        
        alert(this.barcode.codLavamanos);
        alert(this.barcode.codInstitucion);

        //alert(this.barcode[0].codInstitucion);
          
        // for (var clave in  barcode){
        //   // Controlando que json realmente tenga esa propiedad
        //   if (json.hasOwnProperty(clave)) {
        //     // Mostrando en pantalla la clave junto a su valor
        //     alert("La clave es " + clave+ " y el valor es " + json[clave]);
        //   }
        // }
        this.datosLavado.codRegistro = this.codRegistro;
        this.datosLavado.codUsuario = this.codUsuario;
        this.datosLavado.codLavamanos = this.barcode.codLavamanos;
        this.datosLavado.codInstitucion = this.barcode.codInstitucion;
        
        this.registroLavadoManos();

      })
      .catch(err => {
        this.barcode = JSON.stringify(err);
      });
  }

  //se crea función para envío de datos de lavado de manos 
  registroLavadoManos(){ 
    console.log(this.datosLavado);   
    this.registroLavadoManosService.Lavado(this.datosLavado).pipe(
      finalize(() => {
        console.log('Servicio validar codigo completado correctamente');
      })).subscribe(resp => {
        this.respuesta = resp
        this.presentAlertaRegistroLavado();
        //console.log(this.respuesta);
      });

  }
  
  async presentAlertaRegistroLavado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: '"Su lavado de manos ha sido exitoso"',
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
}//se realiza cambios el 18-01-2021
