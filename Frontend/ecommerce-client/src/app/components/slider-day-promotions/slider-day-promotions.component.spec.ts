import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDayPromotionsComponent } from './slider-day-promotions.component';

describe('SliderDayPromotionsComponent', () => {
  let component: SliderDayPromotionsComponent;
  let fixture: ComponentFixture<SliderDayPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderDayPromotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderDayPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
