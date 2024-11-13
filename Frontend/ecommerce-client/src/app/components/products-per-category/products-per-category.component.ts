import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from "../card-product/card-product.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/Category.service';


@Component({
  selector: 'app-products-per-category',
  standalone: true,
  imports: [CommonModule, CardProductComponent],
  templateUrl: './products-per-category.component.html',
  styleUrls: ['./products-per-category.component.scss']
})
export class ProductsPerCategoryComponent implements OnInit {



  displayedSlides = 10;
  currentIndex = 0;
  loading = false;


  productsPerCategory: Product[] = [];
  category:string | undefined; 
  categoryId!: string ;


  displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);

  constructor(private route: ActivatedRoute, private productService:ProductService, private  categoryService: CategoryService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';

      this.productService.getProductsByCategory(this.categoryId).subscribe(products => {
        this.productsPerCategory = products;

        this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
      });

      this.categoryService.getCategory(this.categoryId).subscribe(category => {
        this.category = category.name;
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.loading) {
      this.loadMoreSlides();
    }
  }

  loadMoreSlides() {
    if (this.displayedSlides < this.productsPerCategory.length) {
      this.loading = true;

      // Simulate loading time
      setTimeout(() => {
        this.displayedSlides += 10;
        this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
        this.loading = false;
      }, 1000); // Tiempo de espera simulado
    }
  }
}
