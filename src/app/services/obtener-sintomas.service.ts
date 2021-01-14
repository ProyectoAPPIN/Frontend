import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObtenerSintomasService {

  constructor(private http:HttpClient) { }
  
  public obtenerSintomas(): Observable<any[]> {
    return this.http.get<any[]>(environment.urlAPI +'/api/Sintomas/GetSintomas');
  }

  public registroSintomas(sintomas: any[]): Observable<any> {   
    return this.http.post<any[]>(environment.urlAPI + '/api/Sintomas/loadUsuarioSintomas', sintomas, {});
  }

}
