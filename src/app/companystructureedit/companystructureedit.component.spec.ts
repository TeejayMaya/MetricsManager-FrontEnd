import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanystructureeditComponent } from './companystructureedit.component';

describe('CompanystructureeditComponent', () => {
  let component: CompanystructureeditComponent;
  let fixture: ComponentFixture<CompanystructureeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanystructureeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanystructureeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
