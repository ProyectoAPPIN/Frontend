import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroEntradaService {

  constructor(private http:HttpClient) { }

  public Entrada(usuario: any): Observable<any> {   
    return this.http.post<any>(environment.urlAPI + '/api/Eventos/registrarIngreso', usuario, {});
  }
}
