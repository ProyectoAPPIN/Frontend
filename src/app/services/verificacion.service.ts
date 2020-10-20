import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  constructor(private http:HttpClient) { }

  public validarCod(codUsuario: any): Observable<any> {
    return this.http.post<any>(environment.urlAPI + '/api/Usuario/ActivacionUsuario', codUsuario, {});
  }
}

