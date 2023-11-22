import { TestBed } from '@angular/core/testing';
import { RobotService } from './robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('RobotService', () => {
  let service: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }, RobotService],
    });
    service = TestBed.inject(RobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place robot', () => {
    service.place(0, 0, 'NORTH');

    expect(service['robot']).toBeDefined();
  });

  describe('calculateNewLocation', () => {
    it('should throw an error if robot has not been placed', () => {
      expect(() => service.calculateNewLocation()).toThrow('Robot has not been placed yet');
    });

    it('should calculate new location correctly', () => {
      service.place(0, 0, 'NORTH');
      const spy = jest.spyOn(service['robot']!, 'calculateNewLocation');

      service.calculateNewLocation();

      expect(service['robot']).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('move', () => {
    it('should throw an error if robot has not been placed', () => {
      expect(() => service.move({ x: 0, y: 1 })).toThrow('Robot has not been placed yet');
    });

    it('should move robot correctly', () => {
      service.place(0, 0, 'NORTH');
      const spy = jest.spyOn(service['robot']!, 'moveTo');

      service.move({ x: 0, y: 0 });

      expect(service['robot']).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('turn', () => {
    it('should throw an error if robot has not been placed', () => {
      expect(() => service.turn('LEFT')).toThrow('Robot has not been placed yet');
    });

    it('should turn robot correctly', () => {
      service.place(0, 0, 'NORTH');
      const spy = jest.spyOn(service['robot']!, 'turn');

      service.turn('LEFT');

      expect(service['robot']).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('report', () => {
    it('should throw an error if robot has not been placed', () => {
      expect(() => service.report()).toThrow('Robot has not been placed yet');
    });

    it('should report robot correctly', () => {
      service.place(0, 0, 'NORTH');
      const spy = jest.spyOn(service['matSnackBar'], 'open');

      service.report();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getCurrentLocation', () => {
    it('should throw an error if robot has not been placed', () => {
      expect(() => service.getCurrentLocation()).toThrow('Robot has not been placed yet');
    });

    it('should get current location correctly', () => {
      service.place(0, 0, 'NORTH');

      const location = service.getCurrentLocation();

      expect(location).toEqual({ x: 0, y: 0 });
    });
  });

  it('should reset robot', () => {
    service.place(0, 0, 'NORTH');

    service.reset();

    expect(service['robot']).toBeUndefined();
  });
});
