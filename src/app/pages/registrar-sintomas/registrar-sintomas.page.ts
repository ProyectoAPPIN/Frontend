import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { registroSinto } from 'src/app/models/sintomasRegistro';
import { ObtenerSintomasService } from 'src/app/services/obtener-sintomas.service';
import { Constantes } from 'src/app/utils/constantes.util';
import { RegistrarSintomasPageModule } from './registrar-sintomas.module';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-sintomas',
  templateUrl: './registrar-sintomas.page.html',
  styleUrls: ['./registrar-sintomas.page.scss'],
})
export class RegistrarSintomasPage implements OnInit {
  data: any;
  nombreUsuario;
  codUsuario;
  sintomas:any=[];
  sintomasFiltrados:any=[];
  sintomasRegistrar:any=[];
  public sintomaUsuario:registroSinto;
  respuestaLavado:any=[];
  objeto:any;
  checkSeleccionado = false;

  constructor(
    private obtenerSintomasService: ObtenerSintomasService,
    private route: Router,
    public alertController: AlertController,) { }

  ngOnInit() {
    this.limpiarSintomas();
    this.obtenerSintomas();
    this.ingresarRegistro();        
    // this.datosAutogianostico();
    
  }

  async presentAlertaSintomas() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: '!Debe seleccionar un sintoma para continuar¡',
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

  async presentAlertaGuardadoSintomas() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',      
      message: '!Los síntomas que reportaste se han guardado correctamente¡',
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

  limpiarSintomas()  
  {   
    for (let sintoma in this.sintomasFiltrados )
      {
        this.sintomasFiltrados[sintoma].estado = false;          
      }        
  }

  obtenerSintomas() {
    
    this.obtenerSintomasService.obtenerSintomas().pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.sintomas = resp;
        this.sintomasFiltrados = this.sintomas.filter(x => x.opcion == "0");
        console.log(this.sintomasFiltrados);
      });
  }

  //Pinta el usuario que esta realizando el proceso de ingreso a la entidad
  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario = this.data.codUsuario;
    // console.log(this.data);
    // console.log('nombre', this.nombreUsuario);
    // console.log('Codigo-Usuario', this.codUsuario);
  }


  agregarSintoma(codSintoma:string)
  {        
    if(codSintoma != "9"){
      //limpiar el item ninguno de los anteriores
      for (let sintoma in this.sintomasFiltrados )
      {
        if(this.sintomasFiltrados[sintoma].codSintoma == 9)
        {         
            this.sintomasFiltrados[sintoma].estado = false;      
        }            
      }        

      var existe = this.sintomasRegistrar.filter(x => x.codigo == codSintoma);
      var item = this.sintomasFiltrados.filter(x => x.codSintoma == codSintoma);
      
      for (let i in item ){            
            //alert(this.sintomasFiltrados[sintoma].codSintoma);
            item[i].estado = true;                   
      }         

      //alert(existe);
      if(existe == ""){
        this.sintomaUsuario = {
          "codigoUsuario":this.codUsuario,
          "codigo":codSintoma,
          "estado":true
          }
            //Agrego el elemento al arreglo 
          this.sintomasRegistrar.push(this.sintomaUsuario);  
      }else{
        var i = existe.indexOf;
        //alert(i);
        this.sintomasRegistrar.splice(i, 1 );        
      }

    }
    else
    {
      
        //this.sintomasFiltrados[sintoma].estado = false;
        this.sintomasRegistrar = [];
        this.sintomaUsuario = {
          "codigoUsuario":this.codUsuario,
          "codigo":codSintoma,
          "estado":true
          }
            //Agrego el elemento al arreglo 
          this.sintomasRegistrar.push(this.sintomaUsuario);          
          //this.checkSeleccionado = false;
          for (let sintoma in this.sintomasFiltrados ){
            if(this.sintomasFiltrados[sintoma].codSintoma != 9){
              if(this.sintomasFiltrados[sintoma].estado == true){
                //alert(this.sintomasFiltrados[sintoma].codSintoma);
                this.sintomasFiltrados[sintoma].estado = false;
              }           
            }            
        }         
    }     
  }

  registrarLavado(){    
    if(this.sintomasRegistrar.length == 0){
      this.presentAlertaSintomas();
    }else{
      //llamar el servicio de registro de lavado
      //console.log(this.sintomasRegistrar);
      this.obtenerSintomasService.registroSintomas(this.sintomasRegistrar).pipe(
        finalize(() => {
          console.log('Servicio completado correctamente');
          setTimeout(() => {
            // this.spinner.hide();
          }, 500);
        }
        )).subscribe(resp => {
          this.respuestaLavado = resp;
          this.limpiarSintomas();
          this.presentAlertaGuardadoSintomas();
          //alert(this.respuestaLavado[0].mensaje);      
        });
    }
  
  }

  ingresarPaginaLavadoManos() {    
    var codigoNoti = "-1";    
    this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);
  }
  ingresarPaginaInicio(){
    this.route.navigate(['/pagina-inicio']);
  }
  ingresarPaginaCuidados(){
    this.route.navigate(['/cuidados']);
  }

}
//Ultimo avance 13-01-2021
