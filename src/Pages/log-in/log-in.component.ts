import {Component} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})

export class LogInComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';
  hide = true;
  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
}
