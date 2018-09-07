// ANGULAR IMPORTS
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// RXJS
import { Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
// OTROS SERVICIOS DE AUTENTICACIÓN
import { TokenStorage } from './token-storage.service';
import { UtilsService } from '../services/utils.service';
// MODELOS DE AUTENTICACIÓN
import { AccessData } from './access-data';
import { Credential } from './credential';
// NGX-AUTH: LIBRERÍA EXTERNA
import { AuthService } from 'ngx-auth';


/**
 * Los módulos de autenticación proporcionan la capacidad de adjuntar token de autenticación automáticamente a los
 * encabezados (a través de interceptores http), actualizar la funcionalidad de token, proteger las páginas protegidas
 * o públicas y más.
 */
@Injectable()
export class AuthenticationService implements AuthService {
	API_URL = 'api';
	API_ENDPOINT_LOGIN = '/login';
	API_ENDPOINT_REFRESH = '/refresh';
	API_ENDPOINT_REGISTER = '/register';

	public onCredentialUpdated$: Subject<AccessData>;

	constructor(
		private http: HttpClient,
		private tokenStorage: TokenStorage,
		private util: UtilsService
	) {
		this.onCredentialUpdated$ = new Subject();
	}

	/**
	 * Verifica, si el usuario ya está autorizado.
	 * @description Debería regresar Observable con valores verdaderos o falsos.
	 * @returns Observable<boolean>
	 * @memberOf AuthService
	 */
	public isAuthorized(): Observable<boolean> {
		return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
	}


	/**
	 * Obtiene acceso al token
	 * @description Debería devolver el token de acceso en Observable de, por ejemplo, el localstorage.
	 * @returns Observable<string>
	 */
	public getAccessToken(): Observable<string> {
		return this.tokenStorage.getAccessToken();
	}

	/**
	 * Obtener roles de usuario
	 * @returns Observable<any>
	 */
	public getUserRoles(): Observable<any> {
		return this.tokenStorage.getUserRoles();
	}

	/**
	 * Actualiza el token verifyTokenRequest
	 * @description Debe completarse con éxito para que el interceptor pueda ejecutar solicitudes pendientes o reintentar el original.
	 * @returns Observable<AccessData>
	 */
	public refreshToken(): Observable<AccessData> {
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) => {
				return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_REFRESH + '?' + this.util.urlParam(refreshToken));
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(err => {
				this.logout();
				return throwError(err);
			})
		);
	}

	/**
	 * Verifica la respuesta de la solicitud fallida para determinar si el token se actualiza o no.
	 * @description Verifica el estado.
	 * @param Response response
	 * @returns boolean
	 */
	public refreshShouldHappen(response: HttpErrorResponse): boolean {
		return response.status === 401;
	}

	/**
	 * Verifica que la solicitud saliente sea refresh-token, por lo que el interceptor no interceptará esta solicitud.
	 * @param string url
	 * @returns boolean
	 */
	public verifyTokenRequest(url: string): boolean {
		return url.endsWith(this.API_ENDPOINT_REFRESH);
	}

	/**
	 * Envia solicitud de inicio de sesión.
	 * @param Credential credential
	 * @returns Observable<any>
	 */
	public login(credential: Credential): Observable<any> {
		// Esperando respuesta de la API
		// {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"access-token-0.022563452858263444","refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/images/users/user4.jpg","fullname":"Mark Andre"}
		return this.http.get<AccessData>(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential)).pipe(
			map((result: any) => {
				if (result instanceof Array) {
					return result.pop();
				}
				return result;
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(this.handleError('login', []))
		);
	}

	/**
	 * Manejar la operación Http que falló y deja que la aplicación continúe.
	 * @param operation - nombre de la operación que falló.
	 * @param result - valor opcional para devolver como observable.
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// DEJE QUE LA APP SIGA FUNCIONANDO RETORNANDO RESULT VACÍO.
			return from(result);
		};
	}

	/**
	 * Logout
	 */
	public logout(refresh?: boolean): void {
		this.tokenStorage.clear();
		if (refresh) {
			location.reload(true);
		}
	}

	/**
	 * Guardar los datos de acceso en el almacenamiento.
	 * @private
	 * @param AccessData data
	 */
	private saveAccessData(accessData: AccessData) {
		if (typeof accessData !== 'undefined') {
			this.tokenStorage
				.setAccessToken(accessData.accessToken)
				.setRefreshToken(accessData.refreshToken)
				.setUserRoles(accessData.roles);
			this.onCredentialUpdated$.next(accessData);
		}
	}

	/**
	 * Enviar solicitud de registro
	 * @param Credential credential
	 * @returns Observable<any>
	 */
	public register(credential: Credential): Observable<any> {
		//CREACION DE TOKEN FICTICIO
		credential = Object.assign({}, credential, {
			accessToken: 'access-token-' + Math.random(),
			refreshToken: 'access-token-' + Math.random(),
			roles: ['USER'],
		});
		return this.http.post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
			.pipe(catchError(this.handleError('register', []))
			);
	}

	/**
	 * Solicitar contraseña olvidada.
	 * @param Credential credential
	 * @returns Observable<any>
	 */
	public requestPassword(credential: Credential): Observable<any> {
		return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
			.pipe(catchError(this.handleError('forgot-password', []))
			);
	}

}
