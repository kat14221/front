import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso/curso.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private ApiUrl='http://localhost:8080/api/cursos'
    constructor( private http:HttpClient) { }
    getCursos():Observable<Curso[]>{
      return this.http.get<Curso[]>(this.ApiUrl);
    }
    getCursoById(id:number):Observable<Curso>{
      return this.http.get<Curso>(`${this.ApiUrl}/${id}`);
    }
  
    crearCurso(Curso:Curso):Observable<Curso>{
      return this.http.post<Curso>(this.ApiUrl, Curso);
    }
    
    deleteCurso(id:number){
      return this.http.delete(`${this.ApiUrl}/${id}`);
    }
  
    updateCurso(Curso:Curso, id:number):Observable<Curso>{
      return this.http.put<Curso>(`${this.ApiUrl}/${id}`, Curso);
    }
  }