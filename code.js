
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const mensagemDiv = document.getElementById('mensagem');

    // Função auxiliar para exibir a mensagem de feedback
    const exibirMensagem = (texto, tipo) => {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = `mensagem ${tipo}`;
        mensagemDiv.classList.remove('hidden');
        
        // Esconder a mensagem após 5 segundos
        setTimeout(() => {
            mensagemDiv.classList.add('hidden');
        }, 5000);
    };

    // --- MÁSCARAS ---
     
    // 1. Máscara para CPF (XXX.XXX.XXX-XX)
    cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        
        // Aplica a máscara
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        
        e.target.value = value.substring(0, 14); // Limita o tamanho (11 dígitos + 3 pontos + 1 traço)
    });
  
    // 2. Máscara para Telefone ((XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito

        // Aplica a máscara (XX) XXXXX-XXXX
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        e.target.value = value;
    });


    // --- VALIDAÇÕES E SUBMISSÃO ---

    // Função de Validação do Formulário
    const validarFormulario = (e) => {
        e.preventDefault(); // Impede o envio padrão

        // Validação básica do CPF (somente se tem 11 dígitos após remover máscara)
        const cpfok = cpfInput.value.replace(/\D/g, "");

        if (cpfok.length !== 11) {
            exibirMensagem('⚠️ O CPF deve conter 11 dígitos.', 'error');
            cpfInput.focus();
            return;
        }

        // Validação do Telefone (garantindo que não está vazio)
        if (telefoneInput.value.length < 14) {
             exibirMensagem('⚠️ Por favor, insira um Telefone válido.', 'error');
             telefoneInput.focus();
             return;
        }

        // Simulação de Envio
        
        // 1. Coleta os dados (exemplo)
        const dadosFormulario = {
            nome: document.getElementById('nome').value,
            dataNasc: document.getElementById('dataNasc').value,
            cpf: cpfok,
            genero: document.getElementById('genero').value,
            telefone: telefoneInput.value,
            email: document.getElementById('email').value,
            cidade: document.getElementById('cidade').value,
            uf: document.getElementById('uf').value
        };

        // 2. Exibe os dados no console (para fins de demonstração)
        console.log("Dados do Cadastro (Simulação de Envio):", dadosFormulario);

        // 3. Exibe mensagem de sucesso
        exibirMensagem('✅ Cadastro realizado com sucesso!', 'success');
        
        // 4. Limpa o formulário após o "envio"
        form.reset();
    };

    // Adicionar o listener ao evento de submit do formulário
    form.addEventListener('submit', validarFormulario);
});
script.js
