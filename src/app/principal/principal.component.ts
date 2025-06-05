import { Component } from '@angular/core';
import { ClienteService } from '../servico/cliente.service';
import { Cliente } from '../modelo/Cliente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

    // Objeto do tipo Cliente
    cliente = new Cliente();

    // Variável para visibilidade dos botões
    btnCadastro:boolean = true;

    // Variável para visibilidade da tabela
    tabela:boolean = true;

    // JSON de clientes
    clientes:Cliente[] = [];

    // Construtor
    constructor(private servico:ClienteService, private snackBar: MatSnackBar){}

    // Método de seleção
    selecionar(): void {
      this.servico.selecionar()
        .subscribe(retorno => {
          this.clientes = retorno.content;
        });
    }

    // Método de cadastro
    cadastrar():void{
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => { 

        // Cadastrar o cliente no vetor
        this.clientes.push(retorno); 

        // Limpar formulário
        this.cliente = new Cliente();

        // Mensagem
        this.snackBar.open('Evento cadastrado com sucesso!', 'Fechar', { duration: 5000 });
      });
    }

    // Método para selecionar um cliente específico
    selecionarCliente(posicao:number):void{

      // Selecionar cliente no vetor
      this.cliente = this.clientes[posicao];

      // Visibilidade dos botões
      this.btnCadastro = false;

      // Visibilidade da tabela
      this.tabela = false;

    }

    // Método para editar clientes
    editar():void{
      console.log(this.cliente);
      this.servico.editar(this.cliente)
      .subscribe(retorno => {

        // Obter posiçao do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.id == retorno.id;
        });

        // Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        // Limpar formulário
        this.cliente = new Cliente();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        this.snackBar.open('Evento alterado com sucesso!', 'Fechar', { duration: 5000 });

      });

    }

    // Método para remover clientes
    remover():void{

      this.servico.remover(this.cliente.id!)
      .subscribe(retorno => {

        // Obter posiçao do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.id == this.cliente.id;
        });

        // Remover cliente do vetor
        this.clientes.splice(posicao, 1);

        // Limpar formulário
        this.cliente = new Cliente();

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        // Mensagem
        this.snackBar.open('Evento removido com sucesso!', 'Fechar', { duration: 5000 });

      });

    }

    // Método para cancelar
    cancelar():void{

      // Limpar formulário
      this.cliente = new Cliente();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

    }

    // Método de inicialização
    ngOnInit(){
      this.selecionar();
    }

}
