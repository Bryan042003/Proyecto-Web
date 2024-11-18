import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHighlightProductComponent } from './slider-highlight-product.component';

describe('SliderHighlightProductComponent', () => {
  let component: SliderHighlightProductComponent;
  let fixture: ComponentFixture<SliderHighlightProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderHighlightProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderHighlightProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
