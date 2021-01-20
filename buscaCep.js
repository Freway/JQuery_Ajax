function ClickBuscaCep(form) {
            //$("#btnConsultar").click(function () {
            if ($('[name="' + form + 'Cep"]').val() != "" || $('[name="' + form + 'Cep"]').val().length < 8) {
                $('[name="' + form + 'btnConsultar"]').prop('disabled', true);
                $('[name="' + form + 'loading"]').css("visibility", "visible");
                var txtCep = $('[name="' + form + 'Cep"]').val();
                //alert(txtCep);
                $.ajax({
                    url: '/Usuario/BuscaCep',
                    dataType: 'json',
                    type: 'POST',
                    data: { cep: txtCep },
                    success: function (dados) {
                        //alert("retornou");
                        $(dados).each(function (i) {
                            var _status = dados[0].status;
                            var _mensagem = dados[0].mensagem;
                            if (_status == "1") {
                                $('[name="' + form + 'logradouro"]').val(dados[0].logradouro);
                                $('[name="' + form + 'bairro"]').val(dados[0].bairro);

                                $.ajax({
                                    url: '/Usuario/RetornaEstados',
                                    dataType: 'json',
                                    type: 'POST',
                                    data: { idEstado: dados[0].idestado },
                                    success: function (dadosuf) {
                                        $('[name="' + form + 'estadoid"]').empty();
                                        $('[name="' + form + 'estadoid"]').append($('<option>', {
                                            value: "",
                                            text: "Selecione..."
                                        }));
                                        $(dadosuf).each(function (i) {
                                            $('[name="' + form + 'estadoid"]').append($('<option>', {
                                                value: dadosuf[i].id,
                                                text: dadosuf[i].estado,
                                                selected: dadosuf[i].selecionado
                                            }));
                                        });

                                        $.ajax({
                                            url: '/Usuario/RetornaCidadesPorEstado',
                                            dataType: 'json',
                                            type: 'POST',
                                            data: { idEstado: dados[0].idestado, idCidade: dados[0].idcidade },
                                            success: function (dados2) {
                                                $('[name="' + form + 'cidadeid"]').empty();
                                                $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                                    value: "",
                                                    text: "Selecione a Cidade..."
                                                }));
                                                $(dados2).each(function (i) {
                                                    $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                                        value: dados2[i].id,
                                                        text: dados2[i].cidade,
                                                        selected: dados2[i].selecionado
                                                    }));
                                                });

                                                $('[name="' + form + 'cidadeid option"]')
                                                    .removeAttr("selected")
                                                    .filter("[value=" + dados[0].idcidade + "]")
                                                    .attr("selected", true);

                                                $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                                $('[name="' + form + 'loading"]').css("visibility", "hidden");
                                            },
                                            error: function (ex3) {
                                                alert('Erro.' + ex3);
                                                $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                                $('[name="' + form + 'loading"]').css("visibility", "hidden");

                                                $('[name="' + form + 'logradouro"]').val('');
                                                $('[name="' + form + 'bairro"]').val('');
                                                $('[name="' + form + 'numero"]').val('');
                                                $('[name="' + form + 'complemento"]').val('');

                                                //reiniciaComboEstado("frmCadastroEndereco", 0);

                                                $('[name="' + form + 'cidadeid"]').empty();
                                                $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                                    value: "",
                                                    text: "Selecione..."
                                                }));
                                            }
                                        });
                                    },
                                    error: function (ex3) {
                                        alert('Erro.' + ex3);
                                        $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                        $('[name="' + form + 'loading"]').css("visibility", "hidden");

                                        $('[name="' + form + 'logradouro"]').val('');
                                        $('[name="' + form + 'bairro"]').val('');
                                        $('[name="' + form + 'numero"]').val('');
                                        $('[name="' + form + 'complemento"]').val('');

                                        //reiniciaComboEstado("frmCadastroEndereco", 0);
                                        $('[name="' + form + 'estadoid"]').empty();
                                        $('[name="' + form + 'estadoid"]').append($('<option>', {
                                            value: "",
                                            text: "Selecione..."
                                        }));

                                        $('[name="' + form + 'cidadeid"]').empty();
                                        $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                            value: "",
                                            text: "Selecione..."
                                        }));
                                    }
                                });

                            } else {
                                if (_status == "2") {

                                    $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                    $('[name="' + form + 'loading"]').css("visibility", "hidden");

                                    $('[name="' + form + 'logradouro"]').val('');
                                    $('[name="' + form + 'bairro"]').val('');
                                    $('[name="' + form + 'numero"]').val('');
                                    $('[name="' + form + 'complemento"]').val('');

                                    $.ajax({
                                        url: '/Usuario/RetornaEstados',
                                        dataType: 'json',
                                        type: 'POST',
                                        //data: { idEstado: dados[0].idestado },
                                        success: function (dadosuf) {
                                            $('[name="' + form + 'estadoid"]').empty();
                                            $('[name="' + form + 'estadoid"]').append($('<option>', {
                                                value: "",
                                                text: "Selecione..."
                                            }));
                                            $(dadosuf).each(function (i) {
                                                $('[name="' + form + 'estadoid"]').append($('<option>', {
                                                    value: dadosuf[i].id,
                                                    text: dadosuf[i].estado,
                                                    selected: dadosuf[i].selecionado
                                                }));
                                            });

                                            $('[name="' + form + 'cidadeid"]').empty();
                                            $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                                value: "",
                                                text: "Selecione o Estado..."
                                            }));

                                        },
                                        error: function (ex3) {
                                            alert('Erro.' + ex3);
                                            $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                            $('[name="' + form + 'loading"]').css("visibility", "hidden");

                                            $('[name="' + form + 'logradouro"]').val('');
                                            $('[name="' + form + 'bairro"]').val('');
                                            $('[name="' + form + 'numero"]').val('');
                                            $('[name="' + form + 'complemento"]').val('');

                                            //reiniciaComboEstado("frmCadastroEndereco", 0);
                                            $('[name="' + form + 'estadoid"]').empty();
                                            $('[name="' + form + 'estadoid"]').append($('<option>', {
                                                value: "",
                                                text: "Selecione..."
                                            }));

                                            $('[name="' + form + 'cidadeid"]').empty();
                                            $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                                value: "",
                                                text: "Selecione..."
                                            }));
                                        }
                                    });




                                } else {
                                    $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                                    $('[name="' + form + 'loading"]').css("visibility", "hidden");

                                    $('[name="' + form + 'logradouro"]').val('');
                                    $('[name="' + form + 'bairro"]').val('');
                                    $('[name="' + form + 'numero"]').val('');
                                    $('[name="' + form + 'complemento"]').val('');

                                    //reiniciaComboEstado("frmCadastroEndereco", form, 0);
                                    $('[name="' + form + 'estadoid"]').empty();
                                    $('[name="' + form + 'estadoid"]').append($('<option>', {
                                        value: "",
                                        text: "Selecione..."
                                    }));

                                    $('[name="' + form + 'cidadeid"]').empty();
                                    $('[name="' + form + 'cidadeid"]').append($('<option>', {
                                        value: "",
                                        text: "Selecione..."
                                    }));
                                }
                                alert(_mensagem);
                            }
                        });
                    },
                    error: function (ex3) {
                        alert("Erro ao localizar Cep. Detalhes do erro: " + ex3);
                        $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                        $('[name="' + form + 'loading"]').css("visibility", "hidden");

                        $('[name="' + form + 'logradouro"]').val('');
                        $('[name="' + form + 'bairro"]').val('');
                        $('[name="' + form + 'numero"]').val('');
                        $('[name="' + form + 'complemento"]').val('');
                        //reiniciaComboEstado("frmCadastroEndereco", 0);
                        $('[name="' + form + 'estadoid"]').empty();
                        $('[name="' + form + 'estadoid"]').append($('<option>', {
                            value: "",
                            text: "Selecione..."
                        }));
                        $('[name="' + form + 'cidadeid"]').empty();
                        $('[name="' + form + 'cidadeid"]').append($('<option>', {
                            value: "",
                            text: "Selecione..."
                        }));
                    }
                });
            } else {
                alert("Informe o CEP! Ex.: 01234567");
                $('[name="' + form + 'btnConsultar"]').prop('disabled', false);
                $('[name="' + form + 'loading"]').css("visibility", "hidden");

                $('[name="' + form + 'logradouro"]').val('');
                $('[name="' + form + 'bairro"]').val('');
                $('[name="' + form + 'numero"]').val('');
                $('[name="' + form + 'complemento"]').val('');
                //reiniciaComboEstado("frmCadastroEndereco", 0);
                $('[name="' + form + 'estadoid"]').empty();
                $('[name="' + form + 'estadoid"]').append($('<option>', {
                    value: "",
                    text: "Selecione..."
                }));
                $('[name="' + form + 'cidadeid"]').empty();
                $('[name="' + form + 'cidadeid"]').append($('<option>', {
                    value: "",
                    text: "Selecione..."
                }));
            }
            //});
        }
