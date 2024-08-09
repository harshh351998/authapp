import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { loginresp, registerconfirm, usercred, userregister } from '../model/user.model';

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
}
