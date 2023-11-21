import { TestBed } from '@angular/core/testing';
import { RobotService } from './robot.service';

describe('RobotService', () => {
  let service: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xdescribe('place', () => {
    it('should throw an error when placing robot off grid', () => {
      // arrange
      const isOffGridSpy = jest
        .spyOn(service as any, 'isOffGrid')
        .mockReturnValue(true);
      // act
      service.place(5, 5, 'NORTH');
      // assert
      expect(isOffGridSpy).toThrow('Robot is off grid');
    });

    it('should place robot on grid', () => {
      // arrange
      const isOffGridSpy = jest
        .spyOn(service as any, 'isOffGrid')
        .mockReturnValue(true);
      // act
      service.place(0, 0, 'NORTH');
      // assert
      expect(service.robot).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });
  });

  describe('report', () => {
    it('should return robot position', () => {
      // arrange
      service.robot = { x: 0, y: 0, direction: 'NORTH' };
      // assert
      expect(() => service.report()).not.toThrow(
        'Robot has not been placed yet'
      );
    });

    it('should throw an error if robot not placed yet', () => {
      expect(() => service.report()).toThrow('Robot has not been placed yet');
    });
  });

  xdescribe('isMoveForbidden', () => {
    it('should throw an error when moving robot off grid', () => {
      // arrange

      // act
      const result = service.isMoveForbidden(0, 0);
      // assert
      expect(result).toThrow('Forbidden move');
    });

    it('should not throw an error when moving robot on grid', () => {
      // arrange
      // act
      const result = service.isMoveForbidden(0, 0);
      // assert
      console.log(result);
      expect(result).not.toThrow('Forbidden move');
    });
  });

  xdescribe('isOffGrid', () => {
    it('should return true when x is less than 0', () => {
      expect(service['isOffGrid'](-1, 0)).toBe(true);
    });

    it('should return true when x is greater than 4', () => {
      expect(service['isOffGrid'](5, 0)).toBe(true);
    });

    it('should return true when y is less than 0', () => {
      expect(service['isOffGrid'](0, -1)).toBe(true);
    });

    it('should return true when y is greater than 4', () => {
      expect(service['isOffGrid'](0, 5)).toBe(true);
    });

    it('should return false when x and y are between 0 and 4', () => {
      expect(service['isOffGrid'](0, 0)).toBe(false);
    });
  });
});
