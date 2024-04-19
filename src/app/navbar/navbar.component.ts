import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgFor, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currentAction: any;
  //public isLoading: boolean = false;
  constructor(
    private appState: AppStateService,
    public loadingService: LoadingService,
    private router: Router
  ) {
    // this.loadingService.isLoading$.subscribe({
    //   next: (value) => {
    //     this.isLoading = value;
    //   },
    // });
  }

  get _appState() {
    return this.appState;
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
  actions: Array<any> = [
    { title: 'Home', route: '/admin/home', icon: 'house' },
    { title: 'Products', route: '/admin/products', icon: 'search' },
    { title: 'New Product', route: '/admin/newProduct', icon: 'safe' },
  ];

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.appState.authState = {};
    this.router.navigateByUrl('/login');
  }
}
