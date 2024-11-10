import { Component } from '@angular/core';
import { Curso } from '../models/curso/curso.module';
import { Alumno } from '../models/alumno/alumno.module';
import { Nota } from '../models/nota/nota.module';
import { CursoService } from '../services/curso.service';
import { AlumnoService } from '../services/alumno.service';
import { MessageService } from 'primeng/api';
import { NotaService } from '../services/nota.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';





@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule
  ],
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css'],
  providers: [MessageService]
})
export class NotaComponent {
  cursos: Curso[] = [];
  alumnos: Alumno[] = [];
  notas: Nota[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  nota: Nota = new Nota();
  titulo: string = '';
  opc: string = '';
  op = 0;
  selectedCurso: Curso | undefined;
  selectedAlumno: Alumno | undefined;

  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private notaService: NotaService,
    private messageService: MessageService
  ) {}
  
  
  ngOnInit() {
    this.listarNotas();
    this.listarCursos();
    this.listarAlumnos();
  }

  listarNotas() {
    this.notaService.getNotas().subscribe((data) => {
      this.notas = data;
    });
  }

  listarCursos() {
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  listarAlumnos() {
    this.alumnoService.getAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  showDialogCreate() {
    this.titulo = "Crear Registro";
    this.opc = "Guardar";
    this.op = 0;
    this.nota = new Nota(); 
    this.visible = true;
  }

  showDialogEdit(id: number) {
    this.titulo = "Editar Registro";
    this.opc = "Editar";
    this.notaService.getNotaById(id).subscribe((data) => {
      this.nota = data;
      this.selectedAlumno = data.alumnos;
      this.selectedCurso = data.cursos;
      this.op = 1;
    });
    this.visible = true;
  }

  deleteNota(id: number) {
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Correcto', detail: 'Registro eliminado'});
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el registro'});
      }
    });
  }

  opcion() {
    if (!this.selectedAlumno || !this.selectedCurso) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Debe seleccionar un alumno y un curso'});
      return;
    }

    this.nota.alumnos = this.selectedAlumno;
    this.nota.cursos = this.selectedCurso;

    if (this.op === 0) {
      this.addNota();
    } else if (this.op === 1) {
      this.editNota();
    }
    this.limpiar();
  }

  addNota() {
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Correcto', detail: 'Registro creado'});
        this.listarNotas();
        this.visible = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo crear el registro'});
      }
    });
  }

  editNota() {
    this.notaService.updateNota(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Correcto', detail: 'Registro editado'});
        this.listarNotas();
        this.visible = false;
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se pudo editar el registro'});
      }
    });
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nota = new Nota();
    this.selectedAlumno = undefined;
    this.selectedCurso = undefined;
  }
  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.notas.map(nota => ({
      ID: nota.id,
      Alumno: nota.alumnos?.nombre || 'Sin asignar',
      Curso: nota.cursos?.nombre || 'Sin asignar',
      'Nota 1': nota.nota1,
      'Nota 2': nota.nota2,
      'Nota 3': nota.nota3,
      Promedio: nota.promedio
    })));
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Notas');
  
    XLSX.writeFile(workbook, 'Registro_Notas.xlsx');
  }
  exportToTXT() {
    const data = this.notas.map(nota => 
      `ID: ${nota.id}, Alumno: ${nota.alumnos?.nombre || 'Sin asignar'}, Curso: ${nota.cursos?.nombre || 'Sin asignar'}, Nota 1: ${nota.nota1}, Nota 2: ${nota.nota2}, Nota 3: ${nota.nota3}, Promedio: ${nota.promedio}`
    ).join('\n');
  
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Registro_Notas.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  exportToPDF() {
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text('Registro de Notas', 10, 10);
  
    const data = this.notas.map(nota => [
      nota.id,
      nota.alumnos?.nombre || 'Sin asignar',
      nota.cursos?.nombre || 'Sin asignar',
      nota.nota1,
      nota.nota2,
      nota.nota3,
      nota.promedio
    ]);
  
    (doc as any).autoTable({
      head: [['ID', 'Alumno', 'Curso', 'Nota 1', 'Nota 2', 'Nota 3', 'Promedio']],
      body: data,
      startY: 20
    });
  
    doc.save('Registro_Notas.pdf');
  }
  
}
