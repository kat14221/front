import { Alumno } from "../alumno/alumno.module";
import { Curso } from "../curso/curso.module";

export class Nota {
  id:number;
  cursos:Curso;
  alumnos:Alumno;
  nota1: number;
  nota2:number;
  nota3:number;
  promedio:number;
  constructor(id:number=0,cursos:Curso=new Curso(),alumnos:Alumno=new Alumno, nota1:number=0,nota2:number=0,nota3:number=0,promedio:number=0,){
    this.id=id;
    this.cursos=cursos;
    this.alumnos=alumnos;
    this.nota1=nota1;
    this.nota2=nota2;
    this.nota3=nota3;
    this.promedio=promedio;
  }
 }
