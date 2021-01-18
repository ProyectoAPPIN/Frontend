import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { RegistroEntradaService } from 'src/app/services/registro-entrada.service';
import { UltimoLavadoService } from 'src/app/services/ultimo-lavado.service';
import { VerificacionService } from 'src/app/services/verificacion.service';
import { Constantes } from 'src/app/utils/constantes.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.page.html',
  styleUrls: ['./pagina-inicio.page.scss'],
})

export class PaginaInicioPage implements OnInit {

  data: any;
  nombreUsuario;
  codUsuario;
  barcode: string;
  ultimoLavadoManos: any = [];
  fechaUltimoLavado;
  notificaciones:any=[];
  hora;
  cantNotificaciones;

  constructor(
    private registroEntradaService: RegistroEntradaService,
    private verificacioncodService: VerificacionService,
    private ultimoLavadoService: UltimoLavadoService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.ingresarRegistro();
    this.ultimoLavado();
    this.recordatorios();
  }
  recordatorios() {
    this.ultimoLavadoService.notificacionesUsuario(this.codUsuario).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.notificaciones = resp;
        console.log(this.notificaciones);
        this.cantNotificaciones = this.notificaciones.length;
         //console.log(this.cantNotificaciones);
        
      }
      );
  }
  ingresarRegistro() {
    this.data = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_USUARIO));
    this.nombreUsuario = this.data.nombres;
    this.codUsuario = this.data.codUsuario;
    //console.log(this.data);
    //console.log('nombre', this.nombreUsuario);
    //console.log('Codigo-Usuario', this.codUsuario);
  }
  ultimoLavado() {
    this.ultimoLavadoService.ultimoLavado(this.codUsuario).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.ultimoLavadoManos = resp;
        //console.log(this.ultimoLavadoManos[0].fecha);
        this.fechaUltimoLavado = this.ultimoLavadoManos[0].fecha;
        this.hora = this.ultimoLavadoManos[0].hora;
      }
      );
  }

  ingresarLavadoManos() {
    alert("ingreso");
    var codigoNoti = "-1";    
    this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);
  }
}

//se realiza cambios el 18-01-2021