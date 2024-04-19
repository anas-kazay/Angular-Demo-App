import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public productState: any = {
    keyword: '',
    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    products: [],
    totalProducts: 0,
    status: '',
    errorMessage: '',
  };

  public authState: any = {
    username: undefined,
    roles: undefined,
    token: undefined,
    isAuthenticated: false,
  };

  constructor() {}

  public setProductState(state: any): void {
    this.productState = { ...this.productState, ...state };
  }
  public setAuthState(state: any): void {
    this.authState = { ...this.authState, ...state };
  }
}
