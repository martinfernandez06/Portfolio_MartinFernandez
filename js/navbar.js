const menu = document.getElementById('menu-principal');
const enlaces = [...document.querySelectorAll('#menu-principal .nav-link')];

function enlacePorHash(hash) {
    return enlaces.find((enlace) => enlace.getAttribute('href') === hash) || enlaces[0];
}

function marcar(activo) {
    enlaces.forEach((enlace) => {
        enlace.classList.remove('active');
        enlace.removeAttribute('aria-current');
    });

    activo.classList.add('active');
    activo.setAttribute('aria-current', 'page');
}

function desplazarA(destino) {
    const seccion = document.querySelector(destino);

    if (!seccion) {
        return;
    }

    const relleno = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

    window.scrollTo({ top: seccion.getBoundingClientRect().top + window.scrollY - relleno });
}

marcar(enlacePorHash(location.hash));

document.addEventListener('click', function (event) {
    const clicado = event.target.closest('.nav-link, .navbar-brand');

    if (!clicado) {
        return;
    }

    const destino = clicado.getAttribute('href');
    marcar(enlacePorHash(destino));

    if (!menu.classList.contains('show')) {
        return;
    }

    event.preventDefault();

    menu.addEventListener('hidden.bs.offcanvas', function () {
        desplazarA(destino);
        history.replaceState(null, '', destino);
    }, { once: true });

    bootstrap.Offcanvas.getOrCreateInstance(menu).hide();
});
