import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { Constantes } from 'src/app/utils/constantes.util';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  estadisticas: any = [];
  totalAforo;
  totalOcupacion;
  porcentaje;
  porAforo;
  dataUniversidad: any;
  universidad:number;
  constructor(private route: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    
    this.dataUniversidad = JSON.parse(sessionStorage.getItem(Constantes.DATOS_SESION_UNIVERSIDAD));
    this.universidad = this.dataUniversidad.codInstitucion;
    //alert(this.universidad);
    this.obtenerEstadisticas();
  }
  /*Metodo para cargar las instituciones*/
  obtenerEstadisticas() {
    this.loginService.estadisticas(this.universidad).pipe(
      finalize(() => {
        console.log('Servicio completado correctamente');
        setTimeout(() => {
          // this.spinner.hide();
        }, 500);
      }
      )).subscribe(resp => {
        this.estadisticas = resp;
        this.totalAforo = this.estadisticas[0].totalAforoSede;
        this.totalOcupacion = this.estadisticas[0].totUsuariosRegistrados;
        this.porcentaje = (this.totalOcupacion * 100 ) / this.totalAforo;   
        this.porAforo = parseFloat(this.porcentaje).toFixed(1);
        
        console.log(this.estadisticas);
      });
  }
  ingresarPaginaLavadoManos() {    
    var codigoNoti = "-1";    
    this.route.navigate(['registrar-lavado/' + `${codigoNoti}`]);
  }
  ingresarPaginaRegistroSintomas(){
    this.route.navigate(['/registrar-sintomas']);
  }
  ingresarPaginaInicio(){
    this.route.navigate(['/pagina-inicio']);
  }
}
