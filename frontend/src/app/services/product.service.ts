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

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrlProduct}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(page: number,
                         pageSize: number,
                         keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrlProduct}/search/findByNameContaining?name=${keyword}`
                      + `&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(response => response._embedded.category)
    );

  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrlProduct}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(page: number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProducts> {
    const url = `${this.baseUrlProduct}/search/findByCategoryId`
        + `?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }
}

interface GetResponseCategory {
  _embedded: {
    category: ProductCategory[];
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
