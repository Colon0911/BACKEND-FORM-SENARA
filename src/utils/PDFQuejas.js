import { jsPDF } from 'jspdf'

export const PDFQuejas = () => {
  var doc = new jsPDF('p', 'mm', [297, 210])

  doc.setFont("arial", "bold")
  doc.setFontSize(12)
  doc.text('Formulario de Quejas', 105, 20, 'center')

  doc.setFont("arial", "normal")
  doc.setFontSize(9)


  doc.text("Fecha: " + values.date + "   Hora:" + values.hourNow, 20, 30)

  doc.text(values.tipoUsuario, 42, 35)
  doc.text(values.fullName, 84, 35)
  doc.text(values.phone, 160, 35)
  doc.text(
    'Tipo de Usuario:__________________Nombre:____________________________________________Tel.__________________',
    20,
    35
  )


  doc.text(values.subName, 45, 40)
  doc.text(values.nParcela, 110, 40)
  doc.text(values.nToma, 165, 40)
  doc.text(
    'Lugar(Proyecto):______________________________Nº Parcela:_____________________Nº Toma:_______________________',
    20,
    40
  )

  doc.text(values.problematica.trim(), 20, 55, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text('Exponga su problemática', 20, 50)
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    55
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    60
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    65
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    70
  )

  doc.text(values.cuando.trim(), 20, 85, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text(
    'Desde cuando se presenta el problema',
    20,
    80
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    85
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    90
  )
  doc.text(values.reportado.trim(), 20, 105, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text(
    'Lo ha reportado anteriormente',
    20,
    100
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    105
  )

  doc.text(values.respInst.trim(), 20, 120, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text('Cuál ha sido la respuesta de la Institución', 20, 115)
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    120
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    125
  )

  doc.text(values.solucion.trim(), 20, 140, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text(
    'Cuál considera usted que sea la solución al problema',
    20,
    135
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    140
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    145
  )

  doc.text(values.aporte.trim(), 20, 160, { align: "justify", maxWidth: 165, lineHeightFactor: 1.5 })
  doc.text(
    'Cuál sería su aporte para solucionar el problema',
    20,
    155
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    160
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    165
  )

  doc.text(values.fullName, 22, 185)
  doc.text(values.identification, 75, 185)

  doc.text(
    '________________________            __________________                  _____________________              ______________________',
    20,
    185
  )
  doc.text(
    '   Nombre del Quejoso                               Nº cédula                                               Firma                                      Recibido SENARA',
    20,
    190
  )

  doc.text('_____________________________', 140, 215)
  doc.text('Firma del funcionario', 150, 220)

  doc.setFontSize(10)
  doc.text(
    'Nota: Las quejas deberán ser presentadas únicamente por el propietario o el arrendatario en las oficinas del SENARA',
    20,
    230
  )
  doc.text(
    'de lunes a viernes de 8 a.m a 4 p.m. El firmante se hace responsable por las declaraciones presentadas.',
    20,
    239
  )
  const pdf = doc.output("datauristring")
  return pdf
}
export default { PDFQuejas }
