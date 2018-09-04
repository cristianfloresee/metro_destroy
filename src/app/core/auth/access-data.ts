// Samplce access data
// {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"access-token-0.022563452858263444","refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/images/users/user4.jpg","fullname":"Mark Andre"}
export interface AccessData {
	accessToken: string;
	refreshToken: string;
	roles: any;
}
