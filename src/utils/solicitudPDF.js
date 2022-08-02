import { jsPDF } from 'jspdf'

export const solicitudPDF = (obj) => {
  const doc = new jsPDF()
  let monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  let fecha = new Date(obj.fechaReciboRiego)
  let dia = fecha.getUTCDate()
  let mes = monthNames[fecha.getMonth()]
  let anio = fecha.getFullYear()

  function dateNow() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let finaldate

    if (month < 10) {
      finaldate = `${day}-0${month}-${year}`
      return finaldate
    } else {
      finaldate = `${day}-${month}-${year}`
      return finaldate
    }
  }

  doc.setFont('times', 'normal')
  doc.setFontSize(14)
  doc.text('Formulario Solicitud de Servicio de Riego', 65, 20)
  doc.setFontSize(12)
  doc.text('Fecha: ' + dateNow() + '', 20, 40)
  doc.text('Señores', 20, 50)
  doc.text('SENARA', 20, 55)
  doc.text('Cañas', 20, 60)
  doc.text(
    'Yo, ' + obj.fullName + ', Cédula: ' + obj.identification + ',',
    20,
    70
  )
  doc.text(
    'Telefonos ' + obj.phone + ', Direccion exacta ' + obj.exactAddress + ',',
    20,
    75
  )
  doc.text(
    'dueño de la parcela Nº ' +
      obj.nParcela +
      ' del Proyecto ' +
      obj.proyecto +
      'del Subdistrito ' +
      obj.subDistrito[0] +
      obj.subDistrito.toLowerCase().slice(1) +
      ',',
    20,
    80
  )
  doc.text(
    'inscrito en el padrón de Usuarios del Distrito de Riego Arenal Tempisque, solicito brindarme',
    20,
    85
  )
  doc.text('el servicio de riego durante el presente semestre.', 20, 90)
  doc.text(
    'Datos de la parcela: Área ' +
      obj.area +
      ' ha, Cultivo: ' +
      obj.cultivo[0] +
      obj.cultivo.toLowerCase().slice(1) +
      ', Variedad: ' +
      obj.variedad +
      ',',
    20,
    100
  )
  doc.text('Rendimiento anterior ' + obj.rendimientoAnterior + '.', 20, 105)

  doc.text(
    'Me comprometo a preparar la infraestructura para recibir el riego el día ' +
      dia +
      ' de ' +
      mes,
    20,
    115
  )

  doc.text(
    'del ' +
      anio +
      ', según lo estipulado en el Reglamento de servicio de Riego del Distrito de ',
    20,
    120
  )
  doc.text(
    'Riego y a utilizar el  servicio conforme a lo establecido en dicho reglamento.',
    20,
    125
  )

  doc.text('Atentamente ,', 20, 135)
  doc.text('Firma: _______________________________________', 20, 145)
  doc.text('Fax: ' + obj.fax + '', 20, 155)
  doc.text(
    'Dirección para notificaciones: ' + obj.email + '',

    20,
    165
  )
  doc.text('Observaciones: ' + obj.observaciones + '', 20, 175)
  
  const pdf = doc.output('datauristring')
  return pdf
}

export default { solicitudPDF }
