import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],

  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  key: string = '';

  handleDelete(product: Product) {
    if (confirm('Etes vous sure?'))
      this.productService.deleteProduct(product).subscribe({
        next: (value: void) => {
          // this.appState.productState.products.filter(
          //   (p: any) => p.id != product.id
          // );
          this.searchProducts();
        },
      });
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private appState: AppStateService
  ) {}

  get _appState() {
    return this.appState;
  }

  searchProducts() {
    //this.appState.setProductState({ status: 'LOADING' });
    if (
      this.appState.productState.keyword != '' &&
      this.key != this.appState.productState.keyword
    )
      this.appState.productState.currentPage = 1;
    this.key = this.appState.productState.keyword;
    this.productService
      .searchProducts(
        this.appState.productState.keyword,
        this.appState.productState.currentPage,
        this.appState.productState.pageSize
      )
      .subscribe({
        next: (resp) => {
          let products = resp.body as Product[];
          let totalProducts: number = parseInt(
            resp.headers.get('x-total-count')!
          );

          let totalPages = Math.ceil(
            totalProducts / this.appState.productState.pageSize
          );
          this.appState.setProductState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status: 'LOADED',
          });
        },
        error: (err) => {
          this.appState.setProductState({ status: 'ERROR', errorMessage: err });
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
    this.appState.productState.currentPage = page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }
}
