import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidersShopComponent } from './sliders-shop.component';

describe('SlidersShopComponent', () => {
  let component: SlidersShopComponent;
  let fixture: ComponentFixture<SlidersShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidersShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidersShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
