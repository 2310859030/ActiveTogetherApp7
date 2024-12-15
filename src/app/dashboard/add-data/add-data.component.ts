import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../shared/store.service';
import {BackendService} from '../../shared/backend.service';
import {SharedModule} from "../../shared/shared.module";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
  standalone: true,
  imports: [
    SharedModule,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatInputModule,
    MatError,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddDataComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletter: [false], // Standardmäßig nicht abonniert
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      // Überprüfen, ob der Benutzer den Newsletter abonniert hat
      if (registrationData.newsletter) {
        console.log('Benutzer hat den Newsletter abonniert.');
      }

      // Sende die Daten an den Backend-Service
      this.backendService.addRegistration(
        registrationData,
        this.storeService.currentPage
      );
    }
  }
}
