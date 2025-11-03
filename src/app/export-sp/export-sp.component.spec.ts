import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSpComponent } from './export-sp.component';

describe('ExportSpComponent', () => {
  let component: ExportSpComponent;
  let fixture: ComponentFixture<ExportSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
