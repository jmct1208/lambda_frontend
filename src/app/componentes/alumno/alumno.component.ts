import { Component, OnInit } from '@angular/core';
import { Alumno} from '../../modelos/alumno';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServicioAlumno } from '../../servicios/alumno.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  
  alumnos: Alumno[] | any;
  alumno: Alumno | any;
  alumnoForm: FormGroup;
  submitted = false;
  modalTitle: String;
  tipoFile: any;
  foto: File;

  constructor(private servicioAlumno: ServicioAlumno, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alumnoForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      fotografia: ['', Validators.required],
      actividad_marcial: ['', Validators.required],
      grado_actividad_marcial: ['', Validators.required],
      seguro_medico: ['', Validators.required],
      certificado_medico: ['', Validators.required],
      carta_responsiva: ['', Validators.required],

    });

    // Consulte lista alumnos
    this.getAlumnos(); 
  }
  
  // Consultar lista de alumnos
  getAlumnos(){
    this.alumnos = [];
    this.servicioAlumno.getAlumnos().subscribe(
      res => {
        this.alumnos = res;
        console.log(this.alumnos)
      },
      err => console.error(err)
    )
    this.alumnos=[new Alumno(11,"Ivan","Saavedra","1992-01-01T00:00:00.000+00:00","https://www.eluniversal.com.mx/sites/default/files/2020/09/24/los-mejores-memes-de-chuck-norris.jpg","","","https://drive.google.com/file/d/14J-kbwHU0qrBEmp1I4pZaM82Dd5kcLJb/view","https://drive.google.com/file/d/14J-kbwHU0qrBEmp1I4pZaM82Dd5kcLJb/view","http://cms.dm.uba.ar/material/paenza/libro7/matematica_para_todos.pdf")]
  }

  // Consultar una alumno
  getAlumno(id){
    this.alumno = null;
    this.servicioAlumno.getAlumno(id).subscribe(
      res => {
        this.alumno = res;
      },
      err => console.error(err)
    )
  }
  
  cerrarModal(){
    this.submitted=false;
  }

  imagenSelected(event){
    this.foto = <File> event.target.files[0];
  }
  
  convertFileImg(event){
    this.tipoFile='fotografia';
    this.convertFile(event,this);
  }
  
  convertFileCertificado(event){
    this.tipoFile='certificado_medico';
    this.convertFile(event,this);
  }
  
  convertFileCarta(event){
    this.tipoFile='carta_responsiva';
    this.convertFile(event,this);
  }

  convertFileSeguro(event){
    this.tipoFile='seguro_medico';
    this.convertFile(event,this);
  }

  // Eliminar una alumno
  deleteAlumno(id){
    Swal.fire({
      title: 'Eliminar Alumno!',
      text: 'Estás seguro que deseas eliminar a la alumno?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `No eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioAlumno.deleteAlumno(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'La alumno ha sido eliminada',
              'success'
            )
            this.getAlumnos();
          },
          err => console.error(err)
        )
      }
    });
  }

  convertFile(event,thiss){
    var pdftobase64 = function(file,form){
      Swal.fire({
        title: 'Espera un momento!',
        html: 'el archivo PDF se está cargando',// add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
      });

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        form.controls[thiss.dato].setValue(reader.result);
        Swal.close();
      };
      reader.onerror = function (error){
        console.log('Error: ',error);
      };
    }
    pdftobase64(<File> event.target.files[0],this.alumnoForm);
  }

  showPDF(pdf_base64){
    const linkSource = pdf_base64;
    const downloadLink = document.createElement("a");
    const fileName = "sample.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

    return downloadLink;
  }

  convertImage(thiss): any{
    let reader = new FileReader();
    reader.readAsDataURL(thiss.foto);
    reader.onload = function (){
      thiss.tweetForm.controls['fotografia'].setValue(reader.result);
      if(thiss.modalTitle == "Registrar"){
        thiss.servicioAlumno.createAlumno(thiss.alumnoForm.value).subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La alumno ha sido registrada',
              showConfirmButton: false,
              timer: 1500
            })
            $("#alumnoModal").modal("hide");
            thiss.getAlumnos();
            thiss.submitted = false;
          },
          err => console.error(err)
        )
      }else{
        console.log(thiss.alumnoForm.value);
        thiss.servicioAlumno.updateAlumno(thiss.alumnoForm.value).subscribe(
          res => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'La alumno ha sido actualizada',
              showConfirmButton: false,
              timer: 1500
            })
            $("#alumnoModal").modal("hide");
            thiss.getAlumnos();
            thiss.submitted = false;
          },
          err => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al conectar con el servidor'
            })
          }
        )
      }
    }
  }

  // Crear una alumno
  onSubmit(){
    this.submitted = true;

    if(this.alumnoForm.invalid){
      console.log('Formulario inválido');
      return;
    }
    //this.convertImage(this);
    if(this.modalTitle == "Registrar"){
      this.servicioAlumno.createAlumno(this.alumnoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La alumno ha sido registrada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.alumnoForm.value);
      this.servicioAlumno.updateAlumno(this.alumnoForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La alumno ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#alumnoModal").modal("hide");
          this.getAlumnos();
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el servidor'
          })
        }
      )
    }
  }

  // Actualizar una alumno
  updateAlumno(alumno: Alumno){
    this.submitted = true;

    this.alumnoForm.controls['id'].setValue(alumno.id);
    this.alumnoForm.controls['nombre'].setValue(alumno.nombre);
    this.alumnoForm.controls['apellidos'].setValue(alumno.apellidos);
    this.alumnoForm.controls['fecha_nacimiento'].setValue(alumno.fecha_nacimiento);
    this.alumnoForm.controls['fotografia'].setValue(alumno.fotografia);
    this.alumnoForm.controls['actividad_marcial'].setValue(alumno.actividad_marcial);
    this.alumnoForm.controls['grado_actividad_marcial'].setValue(alumno.grado_actividad_marcial);
    this.alumnoForm.controls['seguro_medico'].setValue(alumno.seguro_medico);
    this.alumnoForm.controls['certificado_medico'].setValue(alumno.certificado_medico);
    this.alumnoForm.controls['carta_responsiva'].setValue(alumno.carta_responsiva);



    this.modalTitle = "Actualizar";
    $("#alumnoModal").modal("show");

    
  }

  get f() { return this.alumnoForm.controls;}

  openModalAlumno(){
    this.alumnoForm.reset();
    this.modalTitle = "Registrar";
    $("#alumnoModal").modal("show");
  }
}
