import { Component } from '@angular/core';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import { NotaComponent } from '../nota/nota.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CardModule, ButtonModule, PanelModule, RouterModule,NotaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isCollapsed = true;
}
