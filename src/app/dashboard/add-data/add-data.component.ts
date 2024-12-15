import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../shared/store.service';
import {BackendService} from '../../shared/backend.service';
import {SharedModule} from "../../shared/shared.module";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";

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
    MatDatepickerModule,
    MatOption,
    MatSelect,
    MatCheckbox
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddDataComponent implements OnInit {
  public registrationForm!: FormGroup;
  public showModal = false;

  constructor(
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    private backendService: BackendService
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      courseId: ['', Validators.required],
      newsletter: [false],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      this.backendService.addRegistration(registrationData, this.storeService.currentPage);

      if (registrationData.newsletter) {
        console.log('Benutzer hat den Newsletter abonniert.');
      }

      this.registrationForm.reset({
        name: '',
        birthdate: '',
        courseID: '',
        newsletter: false
      });

      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
