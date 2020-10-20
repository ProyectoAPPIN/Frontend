import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/roles';
import { Datos } from '../models/datosRegistro';
import { usuarioExistente } from '../models/usuarioExistente';
import { Usuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

  constructor(private http:HttpClient) { }

  public obtenerRoles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(environment.urlAPI + '/api/Comunes/GetRoles');
  }
  //se esta creando el verbo post para mandar los datos corregir
  public Guardar(usuario: any): Observable<any> {   
    return this.http.post<any>(environment.urlAPI + '/api/Usuario/Guardar', usuario, {});
  }
  public validarUsuario(tipoDocumento:string, documento:string): Observable<usuarioExistente[]> {
    return this.http.get<usuarioExistente[]>(environment.urlAPI + '/api/Usuario/GetPrecargueUsuario?'+`tipoDocumento=${tipoDocumento}`+`&documento=${documento}`);
  }
}
