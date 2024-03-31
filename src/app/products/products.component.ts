import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Array<any>>('http://localhost:8089/products')
      .subscribe({ next: (data) => (this.products = data) });
  }

  handleCheckProduct(product: any) {
    product.checked = !product.checked;
  }
  products: Array<any> = [];
}
