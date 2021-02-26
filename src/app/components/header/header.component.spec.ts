import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logo', () => {
    const logoElement = fixture.nativeElement.querySelector('[data-test="logo"]');
    expect(logoElement).toBeTruthy();
  });

  it('should show search', () => {
    const searchElement = fixture.nativeElement.querySelector('[data-test="search"]');
    expect(searchElement).toBeTruthy();
  });

  it('should show menu', () => {
    const menuElement = fixture.nativeElement.querySelector('[data-test="menu"]');
    expect(menuElement).toBeTruthy();
  });
});
