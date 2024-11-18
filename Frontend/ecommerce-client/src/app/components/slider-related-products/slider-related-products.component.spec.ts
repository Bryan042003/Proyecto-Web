import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderRelatedProductsComponent } from './slider-related-products.component';

describe('SliderRelatedProductsComponent', () => {
  let component: SliderRelatedProductsComponent;
  let fixture: ComponentFixture<SliderRelatedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderRelatedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderRelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
