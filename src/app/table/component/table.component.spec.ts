import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TableComponent] });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initialize', () => {
      // arrange
      const initializeSpy = jest.spyOn(component['tableService'], 'initialize');
      // act
      component.ngOnInit();
      // assert
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
});
