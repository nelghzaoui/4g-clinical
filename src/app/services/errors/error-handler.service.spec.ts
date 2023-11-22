import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should handle error and show snackbar', () => {
    // arrange
    const message: string = 'Test error';
    const error = new Error(message);
    // act
    service.handleError(error);
    // assert
    expect(service['matSnackBar'].open).toHaveBeenCalledWith('Test error', 'Close', {
      duration: 5000,
    });
  });
});
