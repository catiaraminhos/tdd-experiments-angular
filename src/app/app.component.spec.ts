import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderStubComponent {
}

@Component({
  selector: 'app-homes',
  template: ''
})
class HomesStubComponent {
}

describe('AppComponent', () => {
  let appFixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderStubComponent,
        HomesStubComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should have a header and homes', () => {
    appFixture.detectChanges();
    const headerComponent = appFixture.debugElement.query(By.directive(HeaderStubComponent));
    const homesComponent = appFixture.debugElement.query(By.directive(HomesStubComponent));
    expect(headerComponent).toBeTruthy();
    expect(homesComponent).toBeTruthy();
  });
});
