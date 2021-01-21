import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.page.html',
  styleUrls: ['./cuidados.page.scss'],
})
export class CuidadosPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
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
