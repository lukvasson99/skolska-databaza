import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginData: ILoginData[] = [
    {
      username: 'Frederik',
      password: 'heslo123',
    },
    {
      username: 'Lukas',
      password: 'druheHeslo',
    },
    {
      username: 'ucitel',
      password: 'angularProjekt',
    },
  ];
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}
  onSubmit(): void {
    for (let data of this.loginData) {
      if (
        data.username == this.loginForm.value.username &&
        data.password == this.loginForm.value.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['database']);
      }
    }
    this.loginForm.reset();
  }
}
interface ILoginData {
  username: string;
  password: string;
}
