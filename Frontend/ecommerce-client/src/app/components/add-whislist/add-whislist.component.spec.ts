import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWhislistComponent } from './add-whislist.component';

describe('AddWhislistComponent', () => {
  let component: AddWhislistComponent;
  let fixture: ComponentFixture<AddWhislistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWhislistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWhislistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
