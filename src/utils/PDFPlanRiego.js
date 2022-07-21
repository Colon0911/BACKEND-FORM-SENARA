import { jsPDF } from 'jspdf'

export const createPDF = async (data) => {
    const doc = new jsPDF('p', 'mm', [297, 210])

    // Title
    doc.setFont("times", "bold")
    doc.setFontSize(12)
    // doc.text("Formulario Solicitud de Inscripción en el Plan de Riego", 105, 20, null, null, "center")
    doc.text(data, 105, 20, null, null, "center")

    // Body
    // Section 1
    doc.setFont("times", "normal")
    doc.setFontSize(9)
    doc.text("Yo, ___________________________________________, cédula N° _____________________,", 20, 35)
    doc.text("actuando en mi nombre, o en representación legal de la persona jurídica denominada " +
        "____________________________________________, cédula jurídica __________________ en calidad de usuario del predio " +
        "inscrito en el Padrón de Usuario con el número _______ ubicado en el Sector Hidráulico ____________________________ del " +
        "Subdistrito _____________________ con una superficie total regable de __________________ hectáreas y en cumplimiento con el " +
        "deber de usuario establecido en el Reglamento de Servicio de Riego vigente, en su artículo 13, inciso 13.1 que textualmente dice:", 20, 40, { maxWidth: 170, align: "justify", lineHeightFactor: 1.4 }
    )
    doc.setFont("times", "bold")
    doc.text('"Solicitar semestralmente la incorporación de sus planes de cultivos dentro del plan de riego del' +
        'Distrito, antes del 15 de abril y 14 de octubre de cada año. EL SENARA atenderá las solicitudes para cada semestre' +
        'definiendo el plan de riego del Distrito, el cual se ajustará a la disponibilidad de agua, las condiciones del suelo y los' +
        'requerimientos de los cultivos. Si el usuario no aporta los datos a su debido tiempo, el SENARA procederá a estimarlos' +
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

    // Section 3
    // Crops Table
    // doc.table(20, 110, data, headers, { autoSize: true })

    // Footer
    // User Info
    doc.setFontSize(9)
    doc.text("___________________________________", 20, 150)
    doc.text("Firma y cédula del usuario o representante legal", 20, 155)
    doc.text("Teléfono: _____________________", 20, 160)
    doc.text("Dirección: _____________________", 20, 165)
    doc.text("Correo Electrónico: _____________________", 20, 170)

    // SENARA
    // doc.getDrawColor(0, 255, 0).setLineWidth(1 / 1).line(20)
    doc.setDrawColor(0, 0, 0)
        .line(137, 150, 137, 180)
        .line(187, 150, 187, 180)
        .line(187, 150, 137, 150)
        .line(187, 180, 137, 180)
    doc.text("____________________________", 140, 170)
    doc.text("Recibido en SENARA", 140, 175)

    const pdf = doc.output('datauristring')
    return pdf
}

export default { createPDF }