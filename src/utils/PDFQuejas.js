import { jsPDF } from 'jspdf'

export const PDFQuejas = () => {
  var doc = new jsPDF('p', 'mm', [297, 210])

  doc.setFont('times', 'bold')
  doc.setFontSize(12)
  doc.text('Formulario de Quejas', 105, 20, 'center')

  doc.setFont('times', 'normal')
  doc.setFontSize(9)
  doc.text('Fecha:_________________________    Hora:____________', 20, 30)

  doc.text(
    'Nombre del Propietario:__________________________________________________________Tel.________________________',
    20,
    35
  )
  doc.text(
    'Nombre del Arrendatario:_________________________________________________________Tel.________________________',
    20,
    40
  )
  doc.text(
    'Lugar(Proyecto):______________________________Nº Parcela:_____________________Nº Toma:_______________________',
    20,
    45
  )

  doc.text('Exponga su problemática', 20, 55)
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
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    75
  )

  doc.text(
    'Desde cuando se presenta el problema:__________________________________________________________________________',
    20,
    85
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    90
  )

  doc.text(
    'Lo ha reportado anteriormente:________________________________________________________________________________',
    20,
    100
  )

  doc.text('Cuál ha sido la respuesta de la Institución', 20, 110)
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    115
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    120
  )

  doc.text(
    'Cuál considera usted que sea la solución al problema:______________________________________________________________',
    20,
    130
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    135
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    140
  )

  doc.text(
    'Cuál sería su aporte para solucionar el problema:__________________________________________________________________',
    20,
    150
  )
  doc.text(
    '_________________________________________________________________________________________________________',
    20,
    155
  )

  doc.text(
    '_________________            ___________________                   ________________________              ______________________',
    20,
    165
  )
  doc.text(
    'Nombre del Quejoso                       Nº cédula                                                   Firma                                        Recibido SENARA',
    20,
    170
  )

  doc.text('_____________________________', 140, 190)
  doc.text('Firma del funcionario', 150, 195)

  doc.setFontSize(10)
  doc.text(
    'Nota: Las quejas deberán ser presentadas únicamente por el propietario o el arrendatario en las oficinas del SENARA',
    20,
    210
  )
  doc.text(
    'de lunes a viernes de 8 a.m a 4 p.m. El firmante se hace responsable por las declaraciones presentadas.',
    20,
    214
  )
  const pdf = doc.output("datauristring")
  return pdf
}
export default { PDFQuejas }
