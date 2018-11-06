import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceIdContiniousComponent } from './face-id-continious.component';

describe('FaceIdContiniousComponent', () => {
  let component: FaceIdContiniousComponent;
  let fixture: ComponentFixture<FaceIdContiniousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceIdContiniousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceIdContiniousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
