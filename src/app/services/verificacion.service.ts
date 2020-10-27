import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  constructor(private http:HttpClient) { }
  //se crea servicio para activar usuario
  public validarCod(codUsuario: any): Observable<any> {
    return this.http.post<any>(environment.urlAPI + '/api/Usuario/ActivacionUsuario', codUsuario, {});
  }
  //se crea servicio para reenviar el codigo
  public reenviarCod(codVerificacion: any): Observable<any>{
    return this.http.post<any>(environment.urlAPI + '/api/Usuario/ReenviarCodigoActivacion', codVerificacion, {});
  }
}

