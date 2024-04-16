import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next: (value) => (this.products = value),
    });
  }
  public keyword: string = '';
  handleDelete(product: Product) {
    if (confirm('Etes vous sure?'))
      this.productService.deleteProduct(product).subscribe({
        next: (value: void) => {
          //this.products$ = this.productService.getProducts();
          this.products.filter((p) => p.id != product.id);
        },
      });
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts(1, 2).subscribe({
      next: (data) => (this.products = data),
      error: (err) => {
        console.log(err);
      },
    });
    //this.products = this.productService.getProducts();
  }

  handleCheckProduct(product: any) {
    this.productService.checkProduct(product).subscribe({
      next: (updatedProduct) => {
        product.checked = !product.checked;
      },
    });
  }
  products: Array<Product> = [];
}
