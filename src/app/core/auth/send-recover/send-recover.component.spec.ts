import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRecoverComponent } from './send-recover.component';

describe('SendRecoverComponent', () => {
  let component: SendRecoverComponent;
  let fixture: ComponentFixture<SendRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRecoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
