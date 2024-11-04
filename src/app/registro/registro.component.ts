import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface RegistroResponse {
  success: boolean;
  name?: string;
  message?: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  // Definimos el FormGroup para el formulario de registro
  registroForm: FormGroup;
  errorMessage: string | null = null; // Mensaje de error

  // Inicializamos las propiedades
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  rol: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]], // Validación del nombre
      correo: ['', [Validators.required, Validators.email]], // Validación del correo
      contrasena: ['', [Validators.required, Validators.minLength(4)]], // Validación de la contraseña
      rol: ['', [Validators.required]] // Validación del rol
    });
  }

  ngOnInit(): void {}

  // Método para manejar el registro
  registrarse(): void {
    if (this.registroForm.invalid) {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
      return;
    }

    const { nombre, correo, contrasena, rol } = this.registroForm.value;

    this.authService.registrar(nombre, correo, contrasena, rol).subscribe((registroResponse: RegistroResponse) => {
      if (registroResponse && registroResponse.success) {
        console.log('Usuario registrado:', registroResponse.name);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Error al registrar, por favor intenta de nuevo.';
        console.error('Error en el registro:', registroResponse.message);
      }
    });
  }
}
