const hayEmailjs = typeof emailjs !== 'undefined';

if (hayEmailjs) {
    emailjs.init('Wa_58ii1rp4mIx6dk');
}

function mostrarAviso(texto, variable, duracion) {
    Toastify({
        text: texto,
        duration: duracion,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: getComputedStyle(document.documentElement).getPropertyValue(variable).trim(),
            borderRadius: "0"
        }
    }).showToast();
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    if (!hayEmailjs) {
        mostrarAviso("Error al enviar el correo. Por favor, inténtalo de nuevo.😡", '--color-error', 3000);
        return;
    }

    const btn = document.getElementById('button');
    btn.value = 'Enviando formulario...';
    btn.disabled = true;

    const serviceID = 'service_dnbo3vn';
    const templateID = 'template_p3a6nmn';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Enviar';
            btn.disabled = false;
            mostrarAviso("¡Correo enviado con éxito!😊", '--color-primario', 4000);
            this.reset();
        }, (err) => {
            btn.value = 'Enviar';
            btn.disabled = false;
            mostrarAviso("Error al enviar el correo. Por favor, inténtalo de nuevo.😡", '--color-error', 3000);
            console.error(JSON.stringify(err));
        });
});
