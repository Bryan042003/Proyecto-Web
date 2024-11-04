import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePurchaseComponent } from './complete-purchase.component';

describe('CompletePurchaseComponent', () => {
  let component: CompletePurchaseComponent;
  let fixture: ComponentFixture<CompletePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletePurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
