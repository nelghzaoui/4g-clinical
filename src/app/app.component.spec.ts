import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameService } from './services/game/game.service';
import { MockGameService } from './services/game/game.service.mock';
import { TableComponent } from './components/table/table.component';
import { CommandComponent } from './components/command/command.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent, TableComponent, CommandComponent],
      providers: [{ provide: GameService, useClass: MockGameService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    gameService = TestBed.inject(GameService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call gameService.reset() when reset() is called', () => {
    // arrange
    const mockReset = jest.spyOn(gameService, 'reset');
    // act
    component.reset();
    // assert
    expect(mockReset).toHaveBeenCalled();
  });
});
