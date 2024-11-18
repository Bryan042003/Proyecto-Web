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


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  displayedSlides = 4;
  currentIndex = 0;
  ngOnChanges(changes: SimpleChanges): void {
    console.log("producto",this.product);
    console.log("id del producto que envio",this.product.id);
    this.categoryService.getCategory(this.product?.id.toString()).subscribe((category: any) => {
      console.log("categoria de ese producto",category);
    });

    //TERMINAR AQUI CUANDO EL GETCATEGORY ESTE BIEN ---------------

    
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
