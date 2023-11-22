import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { RobotService } from '../robot/robot.service';
import { MockRobotService } from '../robot/robot.service.mock';
import { TableService } from '../table/table.service';
import { MockTableService } from '../table/table.service.mock';
import { Direction } from '../../models/direction.type';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: RobotService, useClass: MockRobotService },
        { provide: TableService, useClass: MockTableService },
      ],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('placeRobot', () => {
    it('should throw an error when the robot is placed off the table', () => {
      // arrange
      const x = 5;
      const y = 5;
      const direction = Direction.NORTH;
      jest.spyOn(service['tableService'], 'isOffTable').mockReturnValue(true);
      // act & assert
      expect(() => service.placeRobot(x, y, direction)).toThrow('Cannot place robot off table');
    });

    it('should place the robot at the specified position and direction', () => {
      // arrange
      const x = 1;
      const y = 2;
      const direction = Direction.NORTH;
      jest.spyOn(service['robotService'], 'place');
      jest.spyOn(service['tableService'], 'updateTableItem');
      // act
      service.placeRobot(x, y, direction);
      // assert
      expect(service['robotService'].place).toHaveBeenCalledWith(x, y, direction);
      expect(service['tableService'].updateTableItem).toHaveBeenCalledWith(x, y, true);
    });
  });

  describe('moveRobot', () => {
    it('should throw an error when the robot will fall off the table', () => {
      // arrange
      jest.spyOn(service['robotService'], 'getCurrentLocation');
      jest.spyOn(service['robotService'], 'calculateNewLocation');
      jest.spyOn(service['tableService'], 'isOffTable').mockReturnValue(true);
      // act & assert
      expect(() => service.moveRobot()).toThrow('Move is forbidden as robot will fall off table');
    });

    it('should move the robot to the next location', () => {
      // arrange
      jest.spyOn(service['robotService'], 'getCurrentLocation');
      jest.spyOn(service['robotService'], 'calculateNewLocation');
      jest.spyOn(service['robotService'], 'move');
      jest.spyOn(service['tableService'], 'simulateMovement');
      // act
      service.moveRobot();
      // assert
      expect(service['robotService'].move).toHaveBeenCalledWith({ x: 0, y: 1 });
      expect(service['tableService'].simulateMovement).toHaveBeenCalledWith(
        { x: 0, y: 0 },
        { x: 0, y: 1 }
      );
    });
  });

  it('should turn the robot to the specified orientation', () => {
    // arrange
    const orientation = 'LEFT';
    jest.spyOn(service['robotService'], 'turn');
    // act
    service.turnRobot(orientation);
    // assert
    expect(service['robotService'].turn).toHaveBeenCalledWith(orientation);
  });

  it("should report the robot's current location and direction", () => {
    // arrange
    jest.spyOn(service['robotService'], 'report');
    // act
    service.report();
    // assert
    expect(service['robotService'].report).toHaveBeenCalled();
  });

  it('should reset the robot and table', () => {
    // arrange
    jest.spyOn(service['robotService'], 'reset');
    jest.spyOn(service['tableService'], 'reset');
    // act
    service.reset();
    // assert
    expect(service['robotService'].reset).toHaveBeenCalled();
    expect(service['tableService'].reset).toHaveBeenCalled();
  });
});
