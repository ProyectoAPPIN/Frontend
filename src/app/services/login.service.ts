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
    /*private http:HTTP*/) { }

    // async obtenerTiposDocumentos() {
    //   try {
    //     const url = '/api/Institucion/GetInstituciones';
    //     const params = {};
    //     const headers = {};
  
    //     const response = await this.http.get(url, params, headers);
  
    //     //console.log(response.status);
    //     //console.log(JSON.parse(response.data)); // JSON data returned by server
    //     //console.log(response.headers);
  
    //   } catch (error) {
    //     //console.error(error.status);
    //     //console.error(error.error); // Error message as string
    //     //console.error(error.headers);
    //   }
    // }

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


}
