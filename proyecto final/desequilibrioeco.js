const causas = {
    deforestacion: 'drop1',
    contaminacion: 'drop2',
    cambio_climatico: 'drop3',
    sobrepesca: 'drop4',
    urbanizacion: 'drop5',
    quema_combustibles: 'drop6',
    agricultura_intensiva: 'drop7',
    uso_plaguicidas: 'drop8',
    destruccion_habitats: 'drop9',
    especies_invasoras: 'drop10'
};

document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    if (event.target.classList.contains('dropzone')) {
        event.target.appendChild(document.getElementById(data));
    }
}

function calcularPuntos() {
    let puntos = 0;
    let errores = '';

    document.querySelectorAll('.dropzone').forEach(zone => {
        const causaId = zone.firstElementChild ? zone.firstElementChild.id : '';
        if (causas[causaId] === zone.id) {
            zone.classList.add('correct');
            puntos += 1;
        } else if (causaId) {
            zone.classList.add('incorrect');
            errores += `Error en ${causaId.replace(/_/g, ' ')}.<br>`;
        }
    });

    document.getElementById('resultado').innerHTML = `Puntos Totales: ${puntos * 10}/100<br>${errores}`;
    document.getElementById('resultado').style.color = puntos === 10 ? 'green' : 'red';
}

function reiniciarJuego() {
    const dragContainer = document.getElementById('dragContainer');
    document.querySelectorAll('.drag-item').forEach(item => {
        dragContainer.appendChild(item);
    });
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.classList.remove('correct', 'incorrect');
    });
    document.getElementById('resultado').innerHTML = '';
}
