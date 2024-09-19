import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


interface LoginForm{
  username: FormControl,
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup<LoginForm>

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Login realizado com sucesso!"); 
        this.router.navigate(['/user']); 
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastService.error("Usuário ou senha incorretos.");
        }else if (err.status === 401) {
          this.toastService.error("Credenciais invalida");
        } 
        else if (err.status === 500) {
          this.toastService.error("Erro no servidor. Tente novamente mais tarde.");

        } else {
          this.toastService.error("Erro inesperado! Tente novamente.");
        }
      }
    });
    this.loginForm.reset();
  }
}