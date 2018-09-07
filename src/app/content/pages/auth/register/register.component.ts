import {
	Component,
	OnInit,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';

@Component({
	selector: 'm-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public model: any = { email: '' };
	@Input() action: string;
	@Output() actionChange = new Subject<string>();
	public loading = false;

	@ViewChild('f') f: NgForm;
	errors: any = [];

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};

	constructor(
		private authService: AuthenticationService,
		public authNoticeService: AuthNoticeService,
	) {}

	ngOnInit() {}

	loginPage(event: Event) {
		event.preventDefault();
		this.action = 'login';
		this.actionChange.next(this.action);
	}

	submit() {
		this.spinner.active = true;
		if (this.validate(this.f)) {
			this.authService.register(this.model).subscribe(response => {
				this.action = 'login';
				this.actionChange.next(this.action);
				this.spinner.active = false;
				this.authNoticeService.setNotice('Your account has been successfuly registered. Please use your registered account to login. success');
			});
		}
	}

	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}

		this.errors = [];
		if (objectPath.get(f, 'form.controls.fullname.errors.required')) {
			this.errors.push('Fullname is required');
		}

		if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push('Email is not valid');
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push('Email is required');
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push('Password is required');
		}
		if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
			this.errors.push('Password minimum length is 4');
		}

		if (objectPath.get(f, 'form.controls.rpassword.errors.required')) {
			this.errors.push('Confirm Password is required');
		}

		if (objectPath.get(f, 'form.controls.agree.errors.required')) {
			this.errors.push('Accepting terms & conditions are required');
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}
}
