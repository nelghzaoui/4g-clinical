import { Command } from '../../src/app/models/command.type';

export const select = (name: string) => cy.get(`[data-cy=${name}]`);

export const goToHomePage = () => cy.visit('localhost:4200');
export const onSubmitBtn = () => select('btn-confirm').click();
export const onResetBtn = () => select('btn-reset').click();
export const haveText = (textLabel: string) =>
  cy
    .get('div.mat-mdc-snack-bar-label.mdc-snackbar__label')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal(textLabel.trim());
    });

export function onCommand(command: Command, ...args: any[]) {
  onSelectCommand();
  onChooseCommand(command);

  switch (command) {
    case Command.PLACE:
      const [x, y, direction] = args;
      clearInput('place-x');
      typeInput('place-x', x.toString());
      clearInput('place-y');
      typeInput('place-y', y.toString());
      select('place-d').click();
      select(direction).click();
      break;
    case Command.TURN:
      const [turn] = args;
      select('turn').click();
      select(turn).click();
      break;
    case Command.REPORT:
      break;
    default:
      break;
  }

  onSubmitBtn();
}

const onSelectCommand = () => select('command').click();
const onChooseCommand = (command: Command) => select(command).click();
const clearInput = (selector: string) => select(selector).clear();
const typeInput = (selector: string, value: string) => select(selector).type(value);
