import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppErrorsComponent } from '../app-errors/app-errors.component';
import { routes } from '../app.routes';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css',
  imports: [
    NavbarComponent,
    DashboardComponent,
    AppErrorsComponent,
    RouterOutlet,
    RouterModule,
  ],
})
export class AdminTemplateComponent {}
