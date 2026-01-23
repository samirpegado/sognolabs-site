/**
 * Integração do formulário de contato com a API
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ajax-form');
    const sendButton = document.getElementById('send');
    const successMessage = document.getElementById('ajaxsuccess');
    const errorForm = document.getElementById('err-form');
    const errorState = document.getElementById('err-state');
    const errorTimeout = document.getElementById('err-timedout');
    
    // API endpoint
    const API_URL = 'https://api.ativhub.sognolabs.org/functions/v1/contact';
    
    if (!form) return;
    
    // Esconder mensagens de erro/sucesso inicialmente
    if (successMessage) successMessage.style.display = 'none';
    if (errorForm) errorForm.style.display = 'none';
    if (errorState) errorState.style.display = 'none';
    if (errorTimeout) errorTimeout.style.display = 'none';
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Pegar os valores do formulário
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        
        // Validação básica
        if (!name || !email || !message) {
            showError(errorForm, 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(errorForm, 'Por favor, insira um email válido.');
            return;
        }
        
        // Desabilitar botão e mostrar loading
        sendButton.disabled = true;
        sendButton.textContent = 'Enviando...';
        
        // Esconder mensagens anteriores
        hideAllMessages();
        
        try {
            // Enviar para a API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });
            
            if (response.ok) {
                // Sucesso
                showSuccess();
                form.reset();
            } else {
                // Erro da API
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || 'Erro ao enviar mensagem. Tente novamente.';
                showError(errorState, errorMessage);
            }
        } catch (error) {
            // Erro de conexão
            console.error('Erro ao enviar formulário:', error);
            showError(errorTimeout, 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.');
        } finally {
            // Reabilitar botão
            sendButton.disabled = false;
            sendButton.textContent = 'Enviar Mensagem';
        }
    });
    
    function showSuccess() {
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            
            // Esconder após 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            
            // Esconder após 5 segundos
            setTimeout(() => {
                element.style.display = 'none';
            }, 5000);
        }
    }
    
    function hideAllMessages() {
        if (successMessage) successMessage.style.display = 'none';
        if (errorForm) errorForm.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
        if (errorTimeout) errorTimeout.style.display = 'none';
    }
});


