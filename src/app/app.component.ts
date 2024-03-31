import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgFor, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
  actions: Array<any> = [
    { title: 'Home', route: '/home', icon: 'house' },
    { title: 'Products', route: '/products', icon: 'search' },
    { title: 'New Product', route: '/newProduct', icon: 'safe' },
  ];
  currentAction: any;
}
