import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno/alumno.module';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
private ApiUrl='http://localhost:8080/api/alumnos'
  constructor( private http:HttpClient) { }
  getAlumnos():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.ApiUrl);
  }
  getAlumnoById(id:number):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.ApiUrl}/${id}`);
  }

  crearAlumno(Alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.ApiUrl, Alumno);
  }
  
  deleteAlumno(id:number){
    return this.http.delete(`${this.ApiUrl}/${id}`);
  }

  updateAlumno(Alumno:Alumno, id:number):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.ApiUrl}/${id}`, Alumno);
  }
}
