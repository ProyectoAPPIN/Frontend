import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

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
  constructor(private route: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.obtenerEstadisticas();
  }
  /*Metodo para cargar las instituciones*/
  obtenerEstadisticas() {
    this.loginService.estadisticas().pipe(
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
