import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { datosLavado } from '../models/notificacionesLavado';

@Injectable({
  providedIn: 'root'
})
export class LavadonotificacionesService {

  constructor(
    private http:HttpClient
    ) { }
  
    public notificacionesUsuario(usuarioCod:string): Observable<datosLavado[]> {
      return this.http.get<datosLavado[]>(environment.urlAPI +'/api/Comunes/GetRecordatorioLavadoManos?'+`codUsuario=${usuarioCod}`);
    }
}
