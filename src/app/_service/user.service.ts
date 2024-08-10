import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { loginresp, menu, registerconfirm, resetpassword, usercred, userregister } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  });
  _username=signal('');

  _menulist = signal<menu[]>([]);
  
  Userregistration(_data: userregister) {
    return this.http.post(this.baseUrl + 'User/userregisteration', _data);
  }

  Confirmregisteration(_data: registerconfirm) {
    let params = new HttpParams()
      .set('userid', _data.userid.toString())
      .set('username', _data.username)
      .set('otptext', _data.otptext);

    return this.http.post(this.baseUrl + 'User/confirmregisteration', null, { params: params });
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(this.baseUrl + 'Authorize/GenerateToken', _data);
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(this.baseUrl + 'UserRole/GetAllMenusbyrole?userrole=' + role);
  }

  Resetpassword(_data: resetpassword) {
    let params = new HttpParams()
      .set('newpassword', _data.newpassword.toString())
      .set('username', _data.username)
      .set('oldpassword', _data.oldpassword);
    return this.http.post(this.baseUrl + 'User/resetpassword', null, { params: params });
  }

  Forgetpassword(username: string) {
    return this.http.get(this.baseUrl + 'User/forgetpassword?username=' + username)
  }
}
