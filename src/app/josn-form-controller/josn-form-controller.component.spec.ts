import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JosnFormControllerComponent } from './josn-form-controller.component';

describe('JosnFormControllerComponent', () => {
  let component: JosnFormControllerComponent;
  let fixture: ComponentFixture<JosnFormControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JosnFormControllerComponent]
    });
    fixture = TestBed.createComponent(JosnFormControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
