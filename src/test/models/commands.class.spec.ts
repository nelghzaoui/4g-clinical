import { GameService } from '../../app/services/game/game.service';
import { MockGameService } from '../../app/services/game/game.service.mock';
import {
  PlaceCommand,
  MoveCommand,
  TurnCommand,
  ReportCommand,
} from '../../app/models/commands.class';
import { Direction, Orientation } from '../../app/models/direction.type';

let gameService: GameService;

beforeEach(() => {
  gameService = new MockGameService();
});

describe('PlaceCommand', () => {
  let placeCommand: PlaceCommand;

  it('should execute the place command', () => {
    // arrange
    placeCommand = new PlaceCommand(gameService, 1, 2, Direction.NORTH);
    jest.spyOn(gameService, 'placeRobot');
    // act
    placeCommand.execute();
    // assert
    expect(gameService.placeRobot).toHaveBeenCalledWith(1, 2, Direction.NORTH);
  });

  it('should fail to validate the place command with invalid parameters', () => {
    // arrange
    placeCommand = new PlaceCommand(gameService, null as any, null as any, 'NORTH');
    expect(() => placeCommand.validate()).toThrow('Invalid place command');
  });

  it('should fail to validate the place command with invalid direction', () => {
    // arrange
    placeCommand = new PlaceCommand(gameService, 1, 2, undefined as any);
    expect(() => placeCommand.validate()).toThrow('Invalid place command');
  });

  it('should succeed to validate the place command', () => {
    // arrange
    placeCommand = new PlaceCommand(gameService, 1, 2, 'NORTH' as any);
    placeCommand.validate();
    // assert
    expect(placeCommand['x']).toBe(1);
    expect(placeCommand['y']).toBe(2);
    expect(placeCommand['direction']).toBe('NORTH');
  });
});

describe('MoveCommand', () => {
  let moveCommand: MoveCommand;

  it('should execute the move command', () => {
    // arrange
    moveCommand = new MoveCommand(gameService);
    jest.spyOn(gameService, 'moveRobot');
    // act
    moveCommand.execute();
    // assert
    expect(gameService.moveRobot).toHaveBeenCalled();
  });

  it('should validate the move command', () => {
    moveCommand.validate();
  });
});

describe('TurnCommand', () => {
  let turnCommand: TurnCommand;

  it('should execute the turn command', () => {
    // arrange
    turnCommand = new TurnCommand(gameService, Orientation.LEFT);
    jest.spyOn(gameService, 'turnRobot');
    // act
    turnCommand.execute();
    // assert
    expect(gameService.turnRobot).toHaveBeenCalledWith(Orientation.LEFT);
  });

  it('should validate the turn command', () => {
    // arrange
    turnCommand = new TurnCommand(gameService, undefined as any);
    // assert
    expect(() => turnCommand.validate()).toThrow('Invalid turn command');
  });
});

describe('ReportCommand', () => {
  let reportCommand: ReportCommand;

  it('should execute the report command', () => {
    // arrange
    reportCommand = new ReportCommand(gameService);
    jest.spyOn(gameService, 'report');
    // act
    reportCommand.execute();
    // assert
    expect(gameService.report).toHaveBeenCalled();
  });

  it('should validate the move command', () => {
    reportCommand.validate();
  });
});
