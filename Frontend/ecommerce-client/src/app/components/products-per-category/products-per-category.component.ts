import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from "../card-product/card-product.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/Category.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products-per-category',
  standalone: true,
  imports: [CommonModule, CardProductComponent, FormsModule],
  templateUrl: './products-per-category.component.html',
  styleUrls: ['./products-per-category.component.scss']
})
export class ProductsPerCategoryComponent implements OnInit {


  selectedcheckbox: string | null = null; // Al principio, no hay marca seleccionada.

  displayedSlides = 10;
  currentIndex = 0;
  loading = false;
  containSubcategories = true;

  filterActive = false;
  selectedCategory: string | null = null;
  selectedBrand: string | null = null;

  selectedPopulate: string | null = null;
  selectedPrice: string | null = null;

  from: number | null = null;  // Para almacenar el valor del input "From"
  to: number | null = null;    // Para almacenar el valor del input "To"


  productsPerCategory: Product[] = [];
  category: string | undefined;
  categoryId!: string;
  brandsList: string[] = []; // Lista para almacenar las marcas
  categoriesList: Array<{ id: string; name: string }> = []; // Lista para almacenar las categorías

  displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';

      this.productService.getProductsByCategory(this.categoryId).subscribe(products => {
        this.productsPerCategory = products;

        this.brandsList = Array.from(new Set(this.productsPerCategory.map(product => product.brand)));

        this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
      });

      this.categoryService.getCategory(this.categoryId).subscribe(category => {
        this.category = category.name;

        if (category && category.subcategories && category.subcategories.length > 0) {
          this.containSubcategories = true;
          this.categoriesList = category.subcategories.map((subcategory: { id: any; name: any }) => ({
            id: subcategory.id,
            name: subcategory.name,
          }));
        } else {
          this.containSubcategories = false;
          this.categoriesList = []; // Limpia la lista si no hay subcategorías.
        }
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


  activateFilterBrand(brand: string) {
    // Si la marca ya está seleccionada, desmarcarla
    if (this.selectedBrand === brand) {
      this.selectedBrand = null;
    } else {
      this.selectedBrand = brand;
      // Si se selecciona una marca, desmarcar la categoría (y viceversa)
      this.selectedCategory = null;
      this.selectedPopulate = null;
      this.selectedPrice = null;
    }

    // Llamada a la función que aplica los filtros
    this.applyFilters();
  }

  activateFilterCategory(category: string) {
    // Si la categoría ya está seleccionada, desmarcarla
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
      // Si se selecciona una categoría, desmarcar la marca
      this.selectedBrand = null;
      this.selectedPopulate = null;
      this.selectedPrice = null;
    }

    // Llamada a la función que aplica los filtros
    this.applyFilters();
  }

  activateFilterPopular(topPopulation: string) {

    if (this.selectedPopulate === topPopulation) {
      this.selectedPopulate = null;
    } else {
      this.selectedPopulate = topPopulation;
      // Si se selecciona una categoría, desmarcar la marca
      this.selectedBrand = null;
      this.selectedCategory = null;
      this.selectedPrice = null;
    }

    // Llamada a la función que aplica los filtros
    this.applyFilters();



  }
  activateFilterPrice() {
    console.log("ESTOY EN EL FILTRO DE PRECIO1");
    if (this.selectedPrice === "price") {
      this.selectedPrice = null;
    } else {
      this.selectedPrice = "price";
      // Si se selecciona una categoría, desmarcar la marca
      this.selectedBrand = null;
      this.selectedCategory = null;
      this.selectedPopulate = null;
    }

    // Llamada a la función que aplica los filtros
    this.applyFilters();
  }

  applyFilters(): void {
    // Si hay un filtro de categoría o marca, activamos el filtro
    if (this.selectedCategory || this.selectedBrand || this.selectedPopulate || this.selectedPrice) {
      this.filterActive = true;


      // Si solo hay un filtro de categoría activo
      if (this.selectedCategory) {
        this.productService.getProductsByCategory(this.selectedCategory)
          .subscribe(products => {
            this.productsPerCategory = products;
            this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
          });
      }
      // Si solo hay un filtro de marca activo
      else if (this.selectedBrand) {
        this.productService.getProductsByBrandAndCategory(this.selectedBrand, this.categoryId)
          .subscribe(products => {
            this.productsPerCategory = products;
            this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
          });
      }
      else if (this.selectedPopulate) {
        this.productService.getTopProductsbySalesAndCategory(this.categoryId, parseInt(this.selectedPopulate))
          .subscribe(products => {
            this.productsPerCategory = products;
            this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
          });
      }
      else if (this.selectedPrice) {
        if (this.from !== null && this.to !== null) {
          this.productService.getProductsByPricesAndCategory(this.from, this.to, this.categoryId)
            .subscribe(products => {
              this.productsPerCategory = products;
              this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
            });
        }
      }
    } else {
      // Si no hay filtros activos, mostrar todos los productos por categoría
      this.filterActive = false;
      this.productService.getProductsByCategory(this.categoryId)
        .subscribe(products => {
          this.productsPerCategory = products;
          this.displayedItems = this.productsPerCategory.slice(0, this.displayedSlides);
        });
    }
  }



}
