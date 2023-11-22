import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommandComponent } from './command.component';
import { GameService } from '../../services/game/game.service';
import { MockGameService } from '../../services/game/game.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommandComponent', () => {
  let component: CommandComponent;
  let fixture: ComponentFixture<CommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
      ],
      declarations: [CommandComponent],
      providers: [{ provide: GameService, useClass: MockGameService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.spyOn(component as any, 'resetForm');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should execute the place command', () => {
      // arrange
      component.command = 'PLACE';
      component.x = 1;
      component.y = 2;
      component.direction = 'NORTH';
      // act
      component.onSubmit();
      // assert
      expect(component['resetForm']).not.toHaveBeenCalled();
    });

    it('should execute the move command', () => {
      // arrange
      component.command = 'MOVE';
      // act
      component.onSubmit();
      // assert
      expect(component['resetForm']).not.toHaveBeenCalled();
    });

    it('should execute the turn command', () => {
      // arrange
      component.command = 'TURN';
      component.orientation = 'RIGHT';
      // act
      component.onSubmit();
      // assert
      expect(component['resetForm']).not.toHaveBeenCalled();
    });

    it('should execute the turn command', () => {
      // arrange
      component.command = 'TURN';
      component.orientation = 'LEFT';
      // act
      component.onSubmit();
      // assert
      expect(component['resetForm']).not.toHaveBeenCalled();
    });

    it('should execute the report command', () => {
      // arrange
      component.command = 'REPORT';
      // act
      component.onSubmit();
      // assert
      expect(component['resetForm']).not.toHaveBeenCalled();
    });

    it('should throw an error with invalid command', () => {
      // arrange
      component.command = 'INVALID' as any;
      // assert
      expect(() => component.onSubmit()).toThrow('Invalid command');
    });
  });

  describe('restForm', () => {
    it('should reset the form', () => {
      component.command = 'PLACE';
      component.x = 1;
      component.y = 2;
      component.direction = 'NORTH';
      component.orientation = 'RIGHT';

      component['resetForm']();

      expect(component.command).toEqual('PLACE');
      expect(component.x).toEqual(0);
      expect(component.y).toEqual(0);
      expect(component.direction).toEqual('SOUTH');
      expect(component.orientation).toEqual('LEFT');
    });
  });
});
