import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentdeskComponent } from './studentdesk.component';

describe('StudentdeskComponent', () => {
  let component: StudentdeskComponent;
  let fixture: ComponentFixture<StudentdeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentdeskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
