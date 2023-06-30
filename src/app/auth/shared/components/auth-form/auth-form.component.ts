import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements AfterViewInit {
  @Output() submitted = new EventEmitter<FormGroup>();
  @ViewChild('emailInput') emailInput!: ElementRef;

  form = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  get passwordInvalid(): boolean {
    const control = this.form.get('password')!;
    return control.hasError('required') && control.touched;
  }

  get emailFormat(): boolean {
    const control = this.form.get('email')!;
    return control.hasError('email') && control.touched;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }
}
