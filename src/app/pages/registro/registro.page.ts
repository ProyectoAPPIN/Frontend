import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';//importacion de validacion 
import { finalize } from 'rxjs/operators';


import { AlertController, LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';
import { Datos } from 'src/app/models/datosRegistro';
import { AngularFirestore } from '@angular/fire/firestore';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
const { PushNotifications, Modals } = Plugins;



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  tipoDocumentos: any = [];
  listaPerfiles: any = [];
  listaUniversidades: any = [];
  usuarioExistente: any;
  usuarioRegistrado: any = [];
  token: any = "";

  usuario: any = {
    codUsuario: "",
    nombres: "",
    apellidos: "",
    TipoDocumento: "",
    numeroDocumento: "",
    celular: "",
    roles: -1,
    codInstitucion: -1,
    correo: "",
    sexo: false,
    activo: false
  }

  usuarioForm1 = {
    codUsuario: '1',
    nombres: 'pibe',
    apellidos: 'valderrama',
    TipoDocumento: 'CC',
    numeroDocumento: '555',
    celular: '323',
    codPerfil: 1,
    codInstitucion: 1,
    correo: 'AA@gmail.com',
    sexo: true,
    activo: false,
    token: 'xx'
  };

  constructor(
    private loginService: LoginService,
    private registroService: RegistroUsuarioService,
    private formBuilder: FormBuilder,
    private route: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    private firestore: AngularFirestore,
    public loadingController: LoadingController

  ) { }

  async presentAlert(mensaje: string, codUsuario: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: mensaje,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.route.navigate(['verificacion/' + `${codUsuario}`]);
          }
        }
      ]
    });
    await alert.present();
  }

  get email() { return this.usuarioForm.get('correo'); }
  get documento() { return this.usuarioForm.get('numeroDocumento'); }
  
  //prueba se define objetos
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public usuarioForm = new FormGroup({

    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl(''),
    TipoDocumento: new FormControl('', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    celular: new FormControl(''),
    roles: new FormControl('', Validators.required),
    codInstitucion: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    sexo: new FormControl('', Validators.required),
    activo: new FormControl('')

  });


  ngOnInit() {
    this.presentLoadingInicioregistro();
    this.obtenerTokenDispositivo();
    this.obtenerTipoDocumento();
    this.obtenerUniversidades();
    this.obtenerPerfiles();
  }
   //loading de cargue de aplicacion
  async presentLoadingInicioregistro() {
    const loading = await this.loadingController.create({
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  enviarDatos(form: Datos) {
    alert(this.usuarioForm1.token);
    if (this.usuarioForm1.token == "") {
      this.obtenerTokenDispositivo();
    } else {
      //alert('Entro')
      this.presentLoadingInicioregistro();
      this.usuarioForm1.codUsuario = "-1";
      this.usuarioForm1.nombres = form.nombres;
      this.usuarioForm1.apellidos = form.apellidos;
      this.usuarioForm1.TipoDocumento = form.TipoDocumento;
      this.usuarioForm1.numeroDocumento = form.numeroDocumento;
      this.usuarioForm1.celular = form.celular;
      this.usuarioForm1.codPerfil = form.roles;
      this.usuarioForm1.codInstitucion = form.codInstitucion;
      this.usuarioForm1.correo = form.correo;
      this.usuarioForm1.sexo = true;
      this.usuarioForm1.activo = false;
      this.usuarioForm1.token = this.token;
      
      //alert(this.usuarioForm1.token);      
      
      this.registroService.Guardar(this.usuarioForm1).pipe(
        finalize(() => {
          console.log('Servicio guardar completado correctamente');
        })).subscribe(resp => {
          this.usuarioRegistrado = resp
          if (this.usuarioRegistrado[0].codUsuario != "-1") {
            //realizo el registro en firebase
            this.storeUser(this.token, this.usuarioRegistrado[0].codUsuario);
            this.presentAlert("Usuario registrado correctamente, a su correo electronico <br> le fue enviado un codigo de activación", this.usuarioRegistrado[0].codUsuario);
            this.limpiarFormulario();
          }
        });
    }
  }

  obtenerTokenDispositivo() {
    //Obtener el token del dispositivo 
    if (Capacitor.platform !== 'web') {
      //alert('entro');
      PushNotifications.register();
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          //alert('Push registration success, token: ' + token.value);
          //console.log('Push registration success, token: ' + token.value)   
          this.token = token.value;
          this.usuarioForm1.token = token.value;
          //console.log(this.token);
        }
      );
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Push registration success, token: ' + JSON.stringify(error));
        }
      );
    }
  }

  limpiarFormulario() {
    this.usuarioForm.patchValue({
      nombres: '',
      apellidos: '',
      TipoDocumento: '',
      numeroDocumento: '',
      celular: '',
      roles: '',
      codInstitucion: '',
      correo: ''
    });
  }

  limpiarFormularioConsulta() {
    this.usuarioForm.patchValue({
      nombres: '',
      apellidos: '',
      celular: '',
      roles: '',
      codInstitucion: '',
      correo: ''
    });
  }

  obtenerPerfiles() {
    this.registroService.obtenerRoles().pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.listaPerfiles = resp;
        console.log(this.listaPerfiles);
      });
  }

  obtenerUniversidades() {
    this.loginService.obtenerInstituciones().pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.listaUniversidades = resp;
        console.log(this.listaUniversidades);
      });
  }

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
        //console.log(this.tipoDocumentos);
      });
  }

  //convertir a minusculas
  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.toLowerCase();


    this.usuarioForm.patchValue({
      nombres: filterValue
    });
  }

  applyFilter1(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.toLowerCase();
    this.usuarioForm.patchValue({
      apellidos: filterValue
    });
  }

  //Metodo para verificar si existe un usuario registrado en la BD para cargar la informacion en el 
  //formularioi
  obtenerUsuario() {

    let tipoDocumento = this.usuarioForm.controls['TipoDocumento'].value;
    let numeroDocumento = this.usuarioForm.controls['numeroDocumento'].value;

    if (tipoDocumento == undefined && numeroDocumento == undefined) {
      return;
    }

    this.registroService.validarUsuario(tipoDocumento, numeroDocumento).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
      }
      )).subscribe(resp => {
        this.usuarioExistente = resp;
        //Valido si el usuario existe para cargar la informacion en el formulario      
        if (this.usuarioExistente[0].codUsuario != -1) {
          this.usuarioForm.controls['nombres'].setValue(this.usuarioExistente[0].nombres);
          this.usuarioForm.controls['apellidos'].setValue(this.usuarioExistente[0].apellidos);
          this.usuarioForm.controls['celular'].setValue(this.usuarioExistente[0].celular);
          this.usuarioForm.controls['codInstitucion'].setValue(this.usuarioExistente[0].codInstitucion);
          this.usuarioForm.controls['correo'].setValue(this.usuarioExistente[0].correo);
        } else {
          this.limpiarFormularioConsulta();
        }
        //console.log(this.usuarioExistente)
      });
  }

  storeUser(token, codUsuario) {
    return this.firestore.collection('users').add({
      codUsuario: codUsuario,
      token: token
    })
  }

}
