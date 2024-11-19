import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertErrorUpdateUserComponent } from './alert-error-update-user.component';

describe('AlertErrorUpdateUserComponent', () => {
  let component: AlertErrorUpdateUserComponent;
  let fixture: ComponentFixture<AlertErrorUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertErrorUpdateUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertErrorUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
