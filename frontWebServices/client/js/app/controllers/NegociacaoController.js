class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);

     

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new ListaNegociacoes();        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);

        this._botao = new Botao();
        this._botao.texto = "disabled,disabled,disabled,disabled";
        this._botaoView = new BotaoView($('#botao'));
        this._botaoView.update(this._botao);

     //   this._corrida = new Corrida();
     //   this._corridaView = new CorridaView($('#corridaView'));
     //   this._corridaView.update(this._corrida);
        
    }
    
    solicitaVeiculo(event){

        event.preventDefault();

        // chamar API para solicitar veiculo passando ( usuario, origem, destino ) e 
        // retornando ( usuario, origem, destino, descrição do carro e tempo em que o carro estará disponível na origem)
        
        let service = new NegociacaoService();
        service.solicitarVeiculo("semana").then (
            negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                console.log("negociacoes da semana obtida com sucesso");
                this._negociacoesView.update(this._listaNegociacoes);
            })   
            .catch (erro => console.log(erro));


        this._botao.texto = "disabled,enabled,disabled,enabled";
        this._botaoView.update(this._botao);

        this._mensagem.texto = 'Veículo X, placa Y estará disponível em N minutos em ORIGEM...';
        this._mensagemView.update(this._mensagem);          

    }


    iniciaCorrida(event){

        event.preventDefault();

        
        // chamar API para solicitar inicio da corrida passando ( usuario, origem, destino ) e retornando
        // ( carro, placa, origem, destino e previsão de chegada )  
        let service = new NegociacaoService();
        service.iniciarCorrida();


        var msgtest = " $$$$ ";

        this._mensagem.texto = 'texto 1'+' texto2 '+ msgtest;
       
        this._mensagemView.update(this._mensagem);         
        
        this._botao.texto = "disabled,disabled,enabled,disabled";
        this._botaoView.update(this._botao);

    }



    finalizaCorrida(event){


        // chamar API para solicitar a finalização da corrida passando ( usuario, origem, destino ) e 
        // retornando o status de corrida finalizada e o valor total a ser cobraddo.  
        
        event.preventDefault();
        this._mensagem.texto = 'Corrida finalizada com sucesso. O valor de $$$ será cobrado em seu cartão de crédito final 9999. Obrigado pela preferência.';
        this._mensagemView.update(this._mensagem);       
        
        this._botao.texto = "enabled,disabled,disabled,disabled";
        this._botaoView.update(this._botao);

    }


    cancelaCorrida(event){

        event.preventDefault();

        // chamar API para solicitar cancelamento da corrida passando ( usuario, origem, destino )  e recebendo
        // o status da solicitação ( ok / nok )

        let service = new NegociacaoService();
        service.cancelarCorrida("semana").then (
            negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                console.log("negociacoes da semana obtida com sucesso");
                this._negociacoesView.update(this._listaNegociacoes);
            })   
            .catch (erro => console.log(erro));


        this.importaNegociacoes();

        this._mensagem.texto = 'Corrida cancelada $$$ com sucesso';
        this._mensagemView.update(this._mensagem); 
        
        this._botao.texto = "enabled,disabled,disabled,disabled";
        this._botaoView.update(this._botao);

    }

    validaLogin(event){

        event.preventDefault();

        this._botao.texto = "enabled,disabled,disabled,disabled";
        this._botaoView.update(this._botao);

    }

    importaNegociacoes() {
        
        let service = new NegociacaoService();
        service.obterNegociacoes("semana").then (
            negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                console.log("negociacoes da semana obtida com sucesso");
                this._negociacoesView.update(this._listaNegociacoes);
            })   
            .catch (erro => console.log(erro));

    };     

    apaga() {
        //   this._listaNegociacoes.esvazia();
        //   this._negociacoesView.update(this._listaNegociacoes);
          
           this._mensagem.texto = 'Negociacoes apagadas com sucesso';
           this._mensagemView.update(this._mensagem);                      
       }
   

    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();   
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);    
    }
    
    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}