import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { CursoComponent } from './curso/curso.component';
import { NotaComponent } from './nota/nota.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent,
        title:'Home'
    },
    {
        path:'alumno',
        component:AlumnoComponent,
        title:'Alumno'
    },
    {
        path:'curso',
        component:CursoComponent,
        title:'Curso'
    },
    {
        path:'nota',
        component:NotaComponent,
        title:'Nota'
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
