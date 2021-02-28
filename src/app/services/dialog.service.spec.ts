import { TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';
import { MatDialog } from '@angular/material/dialog';

import { DialogService } from './dialog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  template: `Dialog content`
})
class DialogContentComponent {
}

describe('DialogService', () => {
  let dialogService: DialogService;
  let matDialogService: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useFactory: () => spyOnClass(MatDialog) }
      ]
    });
    dialogService = TestBed.inject(DialogService);
    matDialogService = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should open a dialog', () => {
    dialogService.open(DialogContentComponent, {});
    expect(matDialogService.open).toHaveBeenCalledWith(DialogContentComponent, {});
  });
});
