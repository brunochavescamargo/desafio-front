import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../modelo/Evento';
import { Page } from '../modelo/Page';
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // Url da API
  private url:string = 'http://localhost:8080/api/events?page=0&size=10';
  private urlPost:string = 'http://localhost:8080/api/events';
  private urlPut:string = 'http://localhost:8080/api/events/';
  private urlDelete:string = 'http://localhost:8080/api/events';

  // Construtor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos os Evento
  selecionar(): Observable<Page<Evento>> {
    return this.http.get<Page<Evento>>(this.url);
  }

  // Método para cadastrar Evento
  cadastrar(obj:Evento):Observable<Evento>{
    return this.http.post<Evento>(this.urlPost, obj);
  }

  // Método para editar Evento
  editar(obj:Evento):Observable<Evento>{
    return this.http.put<Evento>(this.urlPut+obj.id, obj);
  }

  // Método para remover Evento
  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.urlDelete + '/' + codigo);
  }

}
