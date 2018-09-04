import {
	Component,
	OnInit,
	Output,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { NgForm } from '@angular/forms';
import * as objectPath from 'object-path';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';

@Component({
	selector: 'm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
	public model: any = { email: 'admin@demo.com', password: 'demo' };
	@Output() actionChange = new Subject<string>();
	public loading = false;

	@Input() action: string;

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
		private router: Router,
		public authNoticeService: AuthNoticeService,
		private cdr: ChangeDetectorRef
	) {}

	submit() {
		this.spinner.active = true;
		if (this.validate(this.f)) {
			this.authService.login(this.model).subscribe(response => {
				if (typeof response !== 'undefined') {
					this.router.navigate(['/']);
				} else {
					this.authNoticeService.setNotice('The login detail is incorrect error');
				}
				this.spinner.active = false;
				this.cdr.detectChanges();
			});
		}
	}

	ngOnInit(): void {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>admin@demo.com</strong> and password
			<strong>demo</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'success');
		}
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
	}

	validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
		}



		this.errors = [];
		if (objectPath.get(f, 'form.controls.email.errors.email')) {

			this.errors.push('Email is not valid');
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push('Email is required');
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push('Password is not valid');
		}
		if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
			this.errors.push('Password minimum length is 7');
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		}

		return false;
	}

	forgotPasswordPage(event: Event) {
		this.action = 'forgot-password';
		this.actionChange.next(this.action);
	}

	register(event: Event) {
		this.action = 'register';
		this.actionChange.next(this.action);
	}
}
