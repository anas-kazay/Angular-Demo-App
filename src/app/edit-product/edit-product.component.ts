import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  updateProduct() {
    let product: Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      },
    });
  }
  productId!: number;
  productFormGroup!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productFormGroup = this.formBuilder.group({
          id: this.formBuilder.control(product.id),
          name: this.formBuilder.control(product.name, [Validators.required]),
          price: this.formBuilder.control(product.price, [Validators.min(1)]),
          checked: this.formBuilder.control(product.checked),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
