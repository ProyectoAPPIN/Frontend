import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroLavadoManosService {

  constructor(private http:HttpClient) { }
  public Lavado(usuario: any): Observable<any> {   
    return this.http.post<any>(environment.urlAPI + '/api/Eventos/registrarIngresoLavado', usuario, {});
  }
}