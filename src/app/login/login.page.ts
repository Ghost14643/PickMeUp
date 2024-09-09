import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations'; // Importa las animaciones

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('1s ease-in')
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Código para forzar el redibujado del elemento después de la inicialización
    setTimeout(() => {
      const container = document.querySelector('.login-container');
      if (container) {
        container.classList.add('animated');
      }
    }, 0);
  }

  onLogin() {
    console.log('onLogin called'); // Depura aquí
    this.error = '';

    this.authService.login(this.email, this.password).subscribe(success => {
      console.log('Login response:', success); // Depura aquí
      if (success) {
        this.router.navigate(['/inicio']); // Redirige a la página 'inicio'
      } else {
        this.error = 'Credenciales inválidas';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
