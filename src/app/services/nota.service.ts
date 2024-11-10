import { Injectable } from '@angular/core';
import { Nota } from '../models/nota/nota.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private ApiUrl='http://localhost:8080/api/notas'
    constructor( private http:HttpClient) { }
    getNotas():Observable<Nota[]>{
      return this.http.get<Nota[]>(this.ApiUrl);
    }
    getNotaById(id:number):Observable<Nota>{
      return this.http.get<Nota>(`${this.ApiUrl}/${id}`);
    }
  
    crearNota(Nota:Nota):Observable<Nota>{
      return this.http.post<Nota>(this.ApiUrl, Nota);
    }
    
    deleteNota(id: number): Observable<void> {
      return this.http.delete<void>(`${this.ApiUrl}/${id}`);
    }
  
    updateNota(Nota:Nota, id:number):Observable<Nota>{
      return this.http.put<Nota>(`${this.ApiUrl}/${id}`, Nota);
    }
  }
