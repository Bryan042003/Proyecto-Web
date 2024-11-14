import { Component } from '@angular/core';
import { AddCartComponent } from "../add-cart/add-cart.component";
import { AddWhislistComponent } from "../add-whislist/add-whislist.component";
import { StockStatusComponent } from "../stock-status/stock-status.component";
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { ProductService } from '../../services/Product.service';
import { Product } from '../../models/product.model';
import { OffersService } from '../../services/Offers.service';
import { Offer } from '../../models/offer.model';
import { ReviewService } from '../../services/Review.service';
import { Review } from '../../models/review.model';
import { UsersService } from '../../services/Users.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsComponent } from '../alerts/alerts.component';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ReactiveFormsModule, AddCartComponent, AddWhislistComponent, StockStatusComponent, CommonModule, StarRatingComponent, AlertsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId!: string;
  product: Product | undefined;
  stockStatus!: boolean;
  offer: Offer | undefined;
  reviews: Review[] = [];
  user: User | undefined;
  rating = 0;
  userData: { [key: number]: any } = {};
  stars = [1, 2, 3, 4, 5];
  showAlert = false;
  public reviewForm: FormGroup;



  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService, private route: ActivatedRoute, private productService: ProductService, private offersService: OffersService, private reviewService: ReviewService) {
    this.reviewForm = new FormGroup({
      score: new FormControl<number>(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]),
      description: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('^[A-Za-z\\s]+$'),
        Validators.maxLength(200)
      ]),

      id_product: new FormControl<number>(0, [Validators.required]),
      id_user: new FormControl<number>(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';

      this.productService.getProduct(this.productId).subscribe(product => {
        this.product = product;
        // Una vez que el producto esté disponible, actualiza el id_product en el formulario
        if (this.product) {
          this.reviewForm.get('id_product')?.setValue(this.product.id);

          if (this.product.id_offer !== null) {
            this.offersService.getOffer(this.product.id_offer.toString()).subscribe(offer => {
              this.offer = offer;
            });
          }
        }

        this.reviewService.getReviewByProduct(this.product.id.toString()).subscribe(reviews => {
          this.reviews = reviews;
          this.reviews.forEach(review => {
            if (review.id_user && !this.userData[review.id_user]) { // Evita duplicar llamadas si el usuario ya está cargado
              this.usersService.getUser(review.id_user.toString()).subscribe(user => {
                this.userData[review.id_user] = user; // Almacena el usuario en userData
              });
            }
          });
        });

        this.getStock();
      });

    });
  }

  getStock() {
    if (this.product && this.product.stock > 0) {
      return this.stockStatus = true;
    } else {
      return this.stockStatus = false;
    }
  }

  rate(star: number): void {
    this.rating = this.rating;
  }


  sendReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: (result: any) => {
          console.log('review creado con éxito:', result);
          this.showAlert = true;
          this.reviewForm.reset();
          setTimeout(() => {
            this.showAlert = false;
            console.log('Redirigiendo a la página de detalles del producto');
            console.log('ID del producto:', this.product?.id);
            window.location.reload(); // Recarga la página actual
          }, 3000);
        },
        error: (error: any) => {
          console.error('Error al crear el review:', error);
          console.table(this.reviewForm.value);
        },
        complete: () => {
          console.log('Solicitud aceptada');
        }
      });
    }
    else {
      console.log('Formulario inválido');
      this.reviewForm.markAllAsTouched(); // Marca todos los controles como "tocados" para mostrar errores
    }
  }

  onRatingChange(rating: number): void {
    this.rating = rating;
    this.reviewForm.get('rate')?.setValue(rating);
  }


}
