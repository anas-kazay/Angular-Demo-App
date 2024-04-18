import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private appState: AppStateService) {}

  get _appState() {
    return this.appState;
  }

  totalCheckedProducts() {
    return this.appState.productState.products.filter(
      (p: any) => p.checked == true
    ).length;
  }
}
