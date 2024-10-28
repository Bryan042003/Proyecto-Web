import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardProductComponent } from './offer-card-product.component';

describe('OfferCardProductComponent', () => {
  let component: OfferCardProductComponent;
  let fixture: ComponentFixture<OfferCardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferCardProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferCardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
