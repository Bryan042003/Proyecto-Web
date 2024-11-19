import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAcceptDeteleComponent } from './alert-accept-detele.component';

describe('AlertAcceptDeteleComponent', () => {
  let component: AlertAcceptDeteleComponent;
  let fixture: ComponentFixture<AlertAcceptDeteleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertAcceptDeteleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertAcceptDeteleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
