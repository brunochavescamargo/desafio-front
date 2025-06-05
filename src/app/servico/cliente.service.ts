import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';
import { Page } from '../modelo/Page';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Url da API
  private url:string = 'http://localhost:8080/api/events?page=0&size=10';
  private urlPost:string = 'http://localhost:8080/api/events';
  private urlPut:string = 'http://localhost:8080/api/events/';
  private urlDelete:string = 'http://localhost:8080/api/events';

  // Construtor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos os clientes
  selecionar(): Observable<Page<Cliente>> {
    return this.http.get<Page<Cliente>>(this.url);
  }

  // Método para cadastrar clientes
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlPost, obj);
  }

  // Método para editar clientes
  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlPut+obj.id, obj);
  }

  // Método para remover clientes
  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.urlDelete + '/' + codigo);
  }

}
