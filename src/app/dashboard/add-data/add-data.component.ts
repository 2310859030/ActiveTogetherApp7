import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { SharedModule } from "../../shared/shared.module";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatError, MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatLabel,
    MatError,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatDatepickerInput,
    MatInput,
    MatSuffix,
    MatButton,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDataComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: [null, Validators.required],
      courseId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Email mit Validierung
      newsletter: [false],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      this.backendService.addRegistration(registrationData, this.storeService.currentPage);

      this.registrationForm.reset({
        name: '',
        birthdate: null,
        courseId: '',
        email: '',
        newsletter: false,
      });

      // Steuerelemente in den "untouched" und "pristine"-Status versetzen
      Object.keys(this.registrationForm.controls).forEach((key) => {
        const control = this.registrationForm.get(key);
        if (control) {
          control.setErrors(null); // Entfernt Validierungsfehler
          control.markAsPristine(); // Entfernt "dirty"-Status
          control.markAsUntouched(); // Entfernt "touched"-Status
        }
      });

      // Snackbar anzeigen
      this.snackBar.open('Sie haben sich erfolgreich angemeldet!', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000, // Snackbar verschwindet nach 5 Sekunden
      });
    }
  }
}
