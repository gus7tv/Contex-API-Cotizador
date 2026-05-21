import { MARCAS, MARCAS_MODELOS, PLANES, CIUDADES, USOS } from '../constants';
import { formatearDinero } from '../helpers';

function nombre(lista, id) {
    return lista.find(x => x.id === id)?.nombre ?? '—';
}

function nombreModelo(marca, modelo) {
    return (MARCAS_MODELOS[marca] || []).find(m => m.id === modelo)?.nombre ?? '—';
}

/**
 * Genera y descarga un PDF con el detalle de la cotización.
 * jspdf se carga dinámicamente para no inflar el bundle inicial.
 * @param {import('../domain/types').Datos} datos
 * @param {number} total
 * @param {string} [codigo]
 */
export async function exportarPDF(datos, total, codigo) {
    const [{ jsPDF }, autoTableMod] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
    ]);
    const autoTable = autoTableMod.default;

    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-MX');

    doc.setFontSize(20);
    doc.setTextColor(75, 0, 175);
    doc.text('Cotización de Seguro', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Fecha: ${fecha}`, 14, 28);
    if (codigo) doc.text(`Código: ${codigo}`, 14, 34);

    autoTable(doc, {
        startY: 42,
        head: [['Concepto', 'Valor']],
        body: [
            ['Marca', nombre(MARCAS, datos.marca)],
            ['Modelo', nombreModelo(datos.marca, datos.modelo)],
            ['Año', String(datos.year)],
            ['Valor vehículo', `$${Number(datos.valorVehiculo).toLocaleString('en-US')} USD`],
            ['Edad conductor', `${datos.edadConductor} años`],
            ['Ciudad', nombre(CIUDADES, datos.ciudad)],
            ['Uso', nombre(USOS, datos.uso)],
            ['Plan', nombre(PLANES, datos.plan)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [75, 0, 175] },
    });

    const plan = PLANES.find(p => p.id === datos.plan);
    if (plan) {
        const yAfterTable = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(12);
        doc.setTextColor(50);
        doc.text(`Coberturas del plan ${plan.nombre}:`, 14, yAfterTable);

        autoTable(doc, {
            startY: yAfterTable + 4,
            body: plan.coberturas.map(c => [`• ${c}`]),
            theme: 'plain',
            styles: { fontSize: 10 },
        });
    }

    const yTotal = doc.lastAutoTable.finalY + 14;
    doc.setFontSize(16);
    doc.setTextColor(0, 150, 0);
    doc.text(`Total: ${formatearDinero(total)} / año`, 14, yTotal);

    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
        'Cotización indicativa. Sujeta a aprobación y términos del asegurador.',
        14,
        285
    );

    const filename = codigo
        ? `cotizacion-${codigo}.pdf`
        : `cotizacion-${Date.now()}.pdf`;
    doc.save(filename);
}
