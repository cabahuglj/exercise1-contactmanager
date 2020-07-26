import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommDetailComponent } from './comm-detail.component';

describe('CommDetailComponent', () => {
  let component: CommDetailComponent;
  let fixture: ComponentFixture<CommDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
