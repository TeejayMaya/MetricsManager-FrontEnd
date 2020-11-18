import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanystructureComponent } from './companystructure.component';

describe('CompanystructureComponent', () => {
  let component: CompanystructureComponent;
  let fixture: ComponentFixture<CompanystructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanystructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanystructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
