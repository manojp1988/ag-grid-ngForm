import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/* Material Modules*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
/* Flex */
import { FlexLayoutModule } from '@angular/flex-layout';
/* ag-Grid Module*/
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { HorizontalGridComponent } from './grid/horizontal-grid/horizontal-grid.component';
import { FormCellComponent } from './grid/horizontal-grid/form-cell.component';
import { BranchService } from './branch.service';
import { EmployeeService } from './employee.service';
import { VerticalGridComponent } from './grid/vertical-grid/vertical-grid.component';
import { FormTextInputComponent } from './grid/vertical-grid/form-text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalGridComponent,
    FormCellComponent,
    VerticalGridComponent,
    FormTextInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    FlexLayoutModule,
    AgGridModule.withComponents([FormCellComponent, FormTextInputComponent])
  ],
  providers: [BranchService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
