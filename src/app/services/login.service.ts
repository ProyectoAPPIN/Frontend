import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../models/tipoDocumento';
import { Universidad } from '../models/universidades';
import { environment } from 'src/environments/environment';
//import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
    ) { }
    
  public obtenerTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(environment.urlAPI +'/api/comunes/GetTipoDocumentos');
  }

  public obtenerInstituciones(): Observable<Universidad[]> {
    return this.http.get<Universidad[]>(environment.urlAPI + '/api/Institucion/GetInstituciones');
  }

  public validarAcceso(tipoDocumento:string, documento:string, universidad:string): Observable<Universidad[]> {
    return this.http.get<Universidad[]>(environment.urlAPI + '/api/Usuario/validaUsuario?'+`tipoDocumento=${tipoDocumento}`+`&documento=${documento}`+`&universidad=${universidad}`);
  } 

  public Guardar(usuario: any): Observable<any> {
    return this.http.post<any>(environment.urlAPI + '/api/Usuario/Guardar', usuario, {});
  }

  public estadisticas(codUniversidad:number): Observable<any[]> {
    return this.http.get<any[]>(environment.urlAPI + '/api/Comunes/GetEstadisticas?'+`idInstitucion=${codUniversidad}`);
  }
}
