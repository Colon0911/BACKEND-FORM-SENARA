import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const createPDF = async (data) => {
    const crops = data.crops
    let info = []

    crops.forEach((e, i) => {
        info.push([e.cultivo, e.toma, e.area, e.fecha])
    })

    const doc = new jsPDF('p', 'mm', [297, 210])

    // Title
    doc.setFont("times", "bold")
    doc.setFontSize(12)
    doc.text("Formulario Solicitud de Inscripción en el Plan de Riego", 105, 20, null, null, "center")

    // Body
    // Section 1
    doc.setFont("times", "normal")
    doc.setFontSize(9)
    doc.text("Yo, ___________________________________________, cédula N° _____________________,", 20, 35)

    if (data.identification.length === 9) {
        doc.text(data.fullName, 27, 35)
        doc.text(data.identification, 110, 35)
    }

    doc.text("actuando en mi nombre, o en representación legal de la persona jurídica denominada " +
        "____________________________________________, cédula jurídica __________________ en calidad de usuario del predio " +
        "inscrito en el Padrón de Usuario con el número _______ ubicado en el Sector Hidráulico ____________________________ del " +
        "Subdistrito _____________________ con una superficie total regable de __________________ hectáreas y en cumplimiento con el " +
        "deber de usuario establecido en el Reglamento de Servicio de Riego vigente, en su artículo 13, inciso 13.1 que textualmente dice:", 20, 40, { maxWidth: 170, align: "justify", lineHeightFactor: 1.4 }
    )

    if (data.identification.length === 12) {
        doc.setFontSize(7)
        doc.text(data.fullName, 22, 44.5)
        doc.setFontSize(9)
        doc.text(data.identification, 115, 44.5)
    }

    doc.text(data.standardNumber, 89, 49)
    doc.text(data?.hydraulicName || '', 142, 49)
    doc.text(data?.subName || '', 36, 53.5)
    doc.text(data.irrigableSurface, 128, 53.5)
    
    // doc.text('Cañas', 142, 49)
    // doc.text('Cañas_3', 36, 53.5)
    
    doc.setFont("times", "bold")
    doc.text('"Solicitar semestralmente la incorporación de sus planes de cultivos dentro del plan de riego del ' +
        'Distrito, antes del 15 de abril y 14 de octubre de cada año. EL SENARA atenderá las solicitudes para cada semestre ' +
        'definiendo el plan de riego del Distrito, el cual se ajustará a la disponibilidad de agua, las condiciones del suelo y los ' +
        'requerimientos de los cultivos. Si el usuario no aporta los datos a su debido tiempo, el SENARA procederá a estimarlos ' +
        'discrecionalmente con base en la información que tenga disponible."', 20, 65, { maxWidth: 170, align: "justify", lineHeightFactor: 1.4 }
    )

    // Section 2
    doc.setFont("times", "normal")
    doc.setFontSize(9)
    doc.text("Presento aquí mi plan de cultivo, manifestado que tengo previsto sembrar los siguientes cultivos para el _____________________ " +
        "ciclo del _____________________ en las fechas que detallo, con el propósito que sean consideradas en la elaboración del Plan de " +
        "Cultivos del DRAT y que se considere en el Plan de Cultivos y Programa de Riegos del DRAT, que el SENARA elabora en " +
        "función de la disponibilidad de agua en la fuente.", 20, 90, { maxWidth: 170, align: "justify", lineHeightFactor: 1.4 }
    )

    doc.text(data.date, 165, 90)

    // Section 3
    // Crops Table

    doc.autoTable({
        startY: 110,
        styles: {
            valign: 'middle',
            halign: 'center',
            lineColor: 'black',
            lineWidth: .1,
        },
        head: [['Cultivo', 'Toma', 'Área (ha)', 'Fecha de siembra propuesta']],
        body: info,
        margin: { left: 20, right: 20 },
        theme: 'plain',
    })

    // Footer
    // User Info
    doc.setFontSize(9)
    doc.text("___________________________________", 20, 205)
    doc.text("Firma y cédula del usuario o representante legal", 20, 210)
    doc.text("Teléfono: _____________________", 20, 215)
    doc.text("Dirección: __________________________________", 20, 220)
    doc.text("Correo Electrónico: _____________________", 20, 225)

    doc.text(data?.phone || '', 35, 215)
    doc.text(data?.exactAddress  || '', 35, 220)
    doc.text(data?.email || '', 47, 225)

    // SENARA
    doc.setDrawColor(0, 0, 0)
        .line(137, 200, 137, 230)
        .line(187, 200, 187, 230)
        .line(187, 200, 137, 200)
        .line(187, 230, 137, 230)
    doc.text("____________________________", 140, 220)
    doc.text("Recibido en SENARA", 140, 225)

    const pdf = doc.output('datauristring')
    return pdf
}

export default { createPDF }