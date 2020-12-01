import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UltimoLavadoService {

  constructor(private http:HttpClient) { }

  public ultimoLavado(codUsuario:string): Observable<any[]> {
    return this.http.get<any[]>(environment.urlAPI + '/api/Comunes/GetUltimoLavadoManos?'+`codUsuario=${codUsuario}`);
  }
  public notificacionesUsuario(usuarioCod:string): Observable<any[]> {
    return this.http.get<any[]>(environment.urlAPI +'/api/Comunes/GetRecordatorioLavadoManos?'+`codUsuario=${usuarioCod}`);
  }

}
