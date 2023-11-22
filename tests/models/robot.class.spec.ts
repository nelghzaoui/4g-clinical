import { Robot } from '../../src/app/models/robot.class';
import { Location } from '../../src/app/models/location.class';
import { Direction, Orientation } from '../../src/app/models/direction.type';

describe('Robot', () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot(0, 0, Direction.NORTH);
  });

  it('should create a new Robot instance', () => {
    expect(robot).toBeInstanceOf(Robot);
    expect(robot).toBeInstanceOf(Location);
  });

  describe('moveTo', () => {
    it('should move to new location correctly', () => {
      const newLocation = robot.moveTo({ x: 1, y: 1 });
      // assert
      expect(newLocation.x).toBe(1);
      expect(newLocation.y).toBe(1);
    });
  });

  describe('calculateNewLocation', () => {
    it('should calculate new location correctly', () => {
      const newLocation = robot.calculateNewLocation();
      // assert
      expect(newLocation.x).toBe(0);
      expect(newLocation.y).toBe(1);
    });

    it('should calculate new location correctly', () => {
      robot.direction = Direction.EAST;
      const newLocation = robot.calculateNewLocation();
      // assert
      expect(newLocation.x).toBe(1);
      expect(newLocation.y).toBe(0);
    });

    it('should calculate new location correctly', () => {
      robot.direction = Direction.SOUTH;
      const newLocation = robot.calculateNewLocation();
      // assert
      expect(newLocation.x).toBe(0);
      expect(newLocation.y).toBe(-1);
    });

    it('should calculate new location correctly', () => {
      robot.direction = Direction.WEST;
      const newLocation = robot.calculateNewLocation();
      // assert
      expect(newLocation.x).toBe(-1);
      expect(newLocation.y).toBe(0);
    });

    it('should throw an error if direction is invalid', () => {
      robot.direction = 'random' as Direction;
      expect(() => robot.calculateNewLocation()).toThrowError('Invalid direction');
    });
  });

  describe('turn', () => {
    it('should turn left correctly if direction is NORTH', () => {
      robot.direction = Direction.NORTH;
      robot.turn(Orientation.LEFT);
      expect(robot.direction).toBe(Direction.WEST);
    });

    it('should turn right correctly if direction is NORTH', () => {
      robot.direction = Direction.NORTH;
      robot.turn(Orientation.RIGHT);
      expect(robot.direction).toBe(Direction.EAST);
    });

    it('should turn left correctly if direction is EAST', () => {
      robot.direction = Direction.EAST;
      robot.turn(Orientation.LEFT);
      expect(robot.direction).toBe(Direction.NORTH);
    });

    it('should turn right correctly if direction is EAST', () => {
      robot.direction = Direction.EAST;
      robot.turn(Orientation.RIGHT);
      expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should turn left correctly if direction is SOUTH', () => {
      robot.direction = Direction.SOUTH;
      robot.turn(Orientation.LEFT);
      expect(robot.direction).toBe(Direction.EAST);
    });

    it('should turn right correctly if direction is SOUTH', () => {
      robot.direction = Direction.SOUTH;
      robot.turn(Orientation.RIGHT);
      expect(robot.direction).toBe(Direction.WEST);
    });

    it('should turn left correctly if direction is WEST', () => {
      robot.direction = Direction.WEST;
      robot.turn(Orientation.LEFT);
      expect(robot.direction).toBe(Direction.SOUTH);
    });

    it('should turn right correctly if direction is WEST', () => {
      robot.direction = Direction.WEST;
      robot.turn(Orientation.RIGHT);
      expect(robot.direction).toBe(Direction.NORTH);
    });
  });

  describe('toString', () => {
    it('should return a string', () => {
      expect(robot.toString()).toBe('The robot is at 0,0 facing NORTH');
    });
  });
});
