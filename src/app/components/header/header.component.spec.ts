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

  it('should show logo', () => {
    expectTestElementIsDefined('logo');
  });

  it('should show search', () => {
    expectTestElementIsDefined('search');
  });

  it('should show menu', () => {
    expectTestElementIsDefined('menu');
  });

  it('should show filters', () => {
    expectTestElementIsDefined('home-type');
    expectTestElementIsDefined('dates');
    expectTestElementIsDefined('guests');
    expectTestElementIsDefined('price');
    expectTestElementIsDefined('rooms');
    expectTestElementIsDefined('amenities');
  });

  function expectTestElementIsDefined(name: string): void {
    const testElement = fixture.nativeElement.querySelector('[data-test="' + name + '"]');
    expect(testElement).toBeTruthy();
  }
});
