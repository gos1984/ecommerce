import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import { map } from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrlProduct = "http://localhost:8080/api/products";
  private baseUrlCategory = "http://localhost:8080/api/product-categories";

  constructor(private HttpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${categoryId}`;

    return this.HttpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.HttpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.category)
    );

  }
}

interface GetResponseCategory {
  _embedded: {
    category: ProductCategory[];
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  }
}
