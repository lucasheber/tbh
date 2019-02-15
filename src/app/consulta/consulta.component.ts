import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  public message: string = "";
  public codigo: number;
  public codigoAluno = '';
  public estado = ''
  public proba = ''
  public raca = ''
  public cidade = ''
  public bairro = ''
  public sexo = ''
  public hidden: boolean = true;

  private servidor: string = 'http://192.168.1.36:5000';

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }


  public buscaAlunoByCodigo() {

    this.hidden = true;

    if (isNaN(this.codigo)) {
      this.message = "O valor digitado não é um valor válido!";
      return;
    }

    this.http.get(this.servidor + '/aluno/index/' + this.codigo)
      .subscribe((data) => {

        if (data == null || data == '') {
          alert("Não foi encontrado nenhum resultado!")
        } else {
          console.log(data);
         
          this.codigoAluno = data['CD_ALUNO'];
          this.estado = data['SIGLA_END_UF'];
          this.proba = data['PROBABILIDADE'];
          this.cidade = data['CIDADE'];
          this.bairro = data['BAIRRO'];
          this.raca = data['CORRACA'];
          this.sexo = data['SEXO'] == 0 ? 'Masculino' : 'Feminino';
          // this.cidade = data['']
          // this.cidade = data['']

          this.hidden = false;
          this.message = ""
        }

      }, (error) => {
        console.log(error);

      })
  }
}
