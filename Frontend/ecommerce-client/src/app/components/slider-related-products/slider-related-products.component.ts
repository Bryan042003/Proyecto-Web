import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { CardProductComponent } from "../card-product/card-product.component";
import { CategoryService } from '../../services/Category.service';

@Component({
  selector: 'app-slider-related-products',
  standalone: true,
  imports: [CardProductComponent, CommonModule],
  templateUrl: './slider-related-products.component.html',
  styleUrl: './slider-related-products.component.scss'
})
export class SliderRelatedProductsComponent {

  @Input()
  product!: Product;

  public products: Product[] = [];
  public productsToShow: Product[] = [];


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  displayedSlides = 4;
  displayedProducts = 10;
  currentIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.categoryService.getCategoryByProduct(this.product?.id.toString()).subscribe((category: any) => {
        this.categoryService.getParentCategory(category.id_category).subscribe((parentCategory: any) => {
            this.productService.getProductsByCategory(parentCategory.id).subscribe((products: any) => {
                this.products = products.filter((p: any) => p.id !== this.product?.id);
                this.productsToShow = this.getRandomProducts(this.products, 10);
            });
        });
    });
}

private getRandomProducts(products: any[], count: number): any[] {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.products.length - this.displayedSlides;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.products.length - this.displayedSlides) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

}
