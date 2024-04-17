import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public keyword: string = '';
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;
  key: string = '';

  handleDelete(product: Product) {
    if (confirm('Etes vous sure?'))
      this.productService.deleteProduct(product).subscribe({
        next: (value: void) => {
          this.products.filter((p) => p.id != product.id);
        },
      });
  }

  constructor(private productService: ProductService, private router: Router) {}

  searchProducts() {
    if (this.keyword != '' && this.key != this.keyword) this.currentPage = 1;
    this.key = this.keyword;
    this.productService
      .searchProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(
            resp.headers.get('x-total-count')!
          );
          this.totalPages = Math.ceil(totalProducts / this.pageSize);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  handleCheckProduct(product: any) {
    this.productService.checkProduct(product).subscribe({
      next: (updatedProduct) => {
        product.checked = !product.checked;
      },
    });
  }

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }

  products: Array<Product> = [];
}
