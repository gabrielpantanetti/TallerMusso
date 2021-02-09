import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { EmailService } from './services/email.service'

declare var $: any
declare function init ($)

import Swal from 'sweetalert2'
declare var bootbox: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Taller Musso'

  forma: FormGroup
  submitted = false

  get f () {
    return this.forma.controls
  }

  email: Object = {
    nombre: '',
    email: '',
    message: ''
  }

  constructor (public _EmailService: EmailService) {}

  ngOnInit (): void {
    // SLIDER
    init($);

    this.initFormContact();
  }

  initFormContact () {
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required)
    })

    this.forma.setValue(this.email)
  }

  SubmitContactForm () {
    //console.log(this.forma);
    //console.log(this.forma.value);

    this.submitted = true

    // stop here if form is invalid
    if (this.forma.invalid) {
      return
    }

    var dialog = bootbox.dialog({
      message:
        '<p class="text-center mb-0"><i class="fa fa-spin fa-cog"></i> Enviando email...</p>',
      className: 'rubberBand animated',
      closeButton: false
    })

    this._EmailService.sendMessage(this.forma.value).subscribe(() => {
      // do something in the background
      dialog.modal('hide')

      //Swal("Formulario de contacto, Mensaje enviado correctamente");
      Swal.fire({
        //position: 'top-end',
        type: 'success',
        title: 'Mensaje enviado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })

    this.forma.controls['nombre'].reset()
    this.forma.controls['email'].reset()
    this.forma.controls['message'].reset()

    this.forma.markAsPristine()
    this.forma.markAsUntouched()
    this.forma.updateValueAndValidity()

    this.submitted = false
  }
}
