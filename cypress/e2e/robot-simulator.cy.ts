import { goToHomePage, haveText, onCommand } from './app.selector';
import { Direction, Orientation } from '../../src/app/models/direction.type';
import { RobotTest } from './robot.test';
import { Command } from '../../src/app/models/command.type';

describe('Robot simulator', () => {
  beforeEach(() => {
    goToHomePage();
  });

  describe('should not place the robot off the table', () => {
    it('should not place the robot off the table with a PLACE 0,6,N command', () => {
      const robot = new RobotTest(0, 6, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE 6,0,N command', () => {
      const robot = new RobotTest(6, 0, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE 6,6,N command', () => {
      const robot = new RobotTest(6, 6, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE -1,0,N command', () => {
      const robot = new RobotTest(-1, 0, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE 0,-1,N command', () => {
      const robot = new RobotTest(0, -1, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE -1,-1,N command', () => {
      const robot = new RobotTest(-1, -1, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE -1,6,N command', () => {
      const robot = new RobotTest(-1, 6, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });

    it('should not place the robot off the table with a PLACE 6,-1,N command', () => {
      const robot = new RobotTest(6, -1, 'NORTH');
      robot.place();
      haveText('Cannot place robot off table');
    });
  });

  describe('should ignore move,turn, report if the robot is off the table', () => {
    const errorMessage: string = 'Robot has not been placed yet';

    it('should report to the user that the report cannot be moved if it is not placed', () => {
      onCommand(Command.MOVE);
      haveText(errorMessage);
    });

    it('should report to the user that the report cannot be turned if it is not placed', () => {
      onCommand(Command.TURN, Orientation.LEFT);
      haveText(errorMessage);
    });

    it('should report to the user that the report cannot be turned if it is not placed', () => {
      onCommand(Command.TURN, Orientation.RIGHT);
      haveText(errorMessage);
    });

    it('should report to the user that the report cannot be reported if it is not placed', () => {
      onCommand(Command.REPORT);
      haveText(errorMessage);
    });
  });

  describe('should place the robot on the table', () => {
    it('should start the game at the origin 0 0 SOUTH', () => {
      const robot = new RobotTest(0, 0, 'SOUTH');
      robot.place();
      robot.report();
    });

    it('should place the robot at 1 2 EAST', () => {
      const robot = new RobotTest(1, 2, 'EAST');
      robot.place();
      robot.report();
    });

    it('should place the robot at 3 4 WEST', () => {
      const robot = new RobotTest(3, 4, 'WEST');
      robot.place();
      robot.report();
    });

    it('should place the robot at 4 3 NORTH', () => {
      const robot = new RobotTest(4, 3, 'NORTH');
      robot.place();
      robot.report();
    });

    it('should place the robot at 2 1 SOUTH', () => {
      const robot = new RobotTest(2, 1, 'SOUTH');
      robot.place();
      robot.report();
    });
  });

  describe('should move the robot on the table', () => {
    it('should move the robot without falling off the table', () => {
      let robotTest = new RobotTest(0, 0, Direction.NORTH);
      robotTest.place();

      // Move the robot
      robotTest = robotTest.move();
      robotTest.turn(Orientation.RIGHT);
      robotTest = robotTest.move();
      robotTest = robotTest.move();

      robotTest.report();
    });

    it('should move the robot without falling off the table', () => {
      let robotTest = new RobotTest(4, 4, Direction.SOUTH);
      robotTest.place();

      // Move the robot
      robotTest = robotTest.move();
      robotTest.turn(Orientation.RIGHT);
      robotTest = robotTest.move();
      robotTest = robotTest.move();
      robotTest.turn(Orientation.RIGHT);
      robotTest = robotTest.move();
      robotTest.turn(Orientation.RIGHT);
      robotTest.turn(Orientation.RIGHT);
      robotTest = robotTest.move();

      robotTest.report();
    });
  });

  describe('should not let the robot fall from the table', () => {
    it('should not move the robot if it would fall off the table', () => {
      let robotTest = new RobotTest(0, 0, Direction.SOUTH);
      robotTest.place();

      // Move the robot
      robotTest = robotTest.move();

      haveText('Move is forbidden as robot will fall off table');
    });

    it('should not move the robot if it would fall off the table', () => {
      let robotTest = new RobotTest(0, 0, Direction.WEST);
      robotTest.place();

      // Move the robot
      robotTest = robotTest.move();

      haveText('Move is forbidden as robot will fall off table');
    });
  });
});
