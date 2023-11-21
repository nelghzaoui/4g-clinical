import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { CommandComponent } from './components/command/command.component';
import { ErrorHandlerService } from './services/errors/error-handler.service';

@NgModule({
  declarations: [AppComponent, TableComponent, CommandComponent],
  imports: [BrowserModule, FormsModule],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
