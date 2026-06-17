interface Props {
  dailyCalories: number | null
  onGoToCalculator: () => void
}

interface Food {
  name: string
  portion: string
  calories: number
}

interface Meal {
  name: string
  icon: string
  percentage: number
  foods: Food[]
}

interface DayPlan {
  day: string
  meals: Meal[]
}

const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

const additionalTips = [
  'Bebe al menos 2 litros de agua por dia.',
  'Evita azucares refinados y alimentos ultraprocesados.',
  'Incluye fibra en cada comida: verduras, frutas y granos integrales.',
  'Come despacio y mastica bien los alimentos.',
  'Ajusta porciones si tienes hambre real o cambios en tu entrenamiento.',
  'Consulta con un nutricionista para un plan 100% personalizado.',
]

const breakfastOptions: Food[][] = [
  [
    { name: 'Avena con leche descremada', portion: '1 taza', calories: 180 },
    { name: 'Banana y frutillas', portion: '1 porcion mediana', calories: 90 },
    { name: 'Huevo revuelto', portion: '1 unidad', calories: 70 },
  ],
  [
    { name: 'Pan integral con palta', portion: '2 rebanadas + 1/2 palta', calories: 260 },
    { name: 'Yogur natural', portion: '1 pote', calories: 120 },
    { name: 'Manzana', portion: '1 unidad', calories: 80 },
  ],
  [
    { name: 'Tortilla de huevo con verduras', portion: '2 huevos', calories: 190 },
    { name: 'Tostada integral', portion: '1 rebanada', calories: 70 },
    { name: 'Jugo natural sin azucar', portion: '200 ml', calories: 90 },
  ],
  [
    { name: 'Yogur griego con granola', portion: '1 bowl', calories: 260 },
    { name: 'Frutos rojos', portion: '1/2 taza', calories: 45 },
    { name: 'Nueces', portion: '15 g', calories: 95 },
  ],
  [
    { name: 'Quinoa cocida con leche', portion: '1 taza', calories: 220 },
    { name: 'Pera', portion: '1 unidad', calories: 90 },
    { name: 'Huevo duro', portion: '1 unidad', calories: 70 },
  ],
  [
    { name: 'Panqueques de avena', portion: '2 unidades', calories: 260 },
    { name: 'Miel', portion: '1 cucharadita', calories: 25 },
    { name: 'Yogur natural', portion: '1/2 pote', calories: 70 },
  ],
  [
    { name: 'Omelette de espinaca', portion: '2 huevos', calories: 190 },
    { name: 'Pan integral', portion: '2 rebanadas', calories: 140 },
    { name: 'Fruta fresca', portion: '1 porcion', calories: 80 },
  ],
]

const lunchOptions: Food[][] = [
  [
    { name: 'Pechuga de pollo a la plancha', portion: '180 g', calories: 200 },
    { name: 'Arroz integral con verduras', portion: '1 taza', calories: 200 },
    { name: 'Ensalada verde', portion: '1 plato grande', calories: 60 },
  ],
  [
    { name: 'Pescado al horno', portion: '180 g', calories: 220 },
    { name: 'Papas cocidas', portion: '1 mediana', calories: 150 },
    { name: 'Ensalada de tomate y pepino', portion: '1 plato', calories: 70 },
  ],
  [
    { name: 'Carne magra salteada', portion: '170 g', calories: 250 },
    { name: 'Quinoa', portion: '1 taza', calories: 220 },
    { name: 'Brocoli al vapor', portion: '1 taza', calories: 55 },
  ],
  [
    { name: 'Lentejas guisadas', portion: '1 plato', calories: 320 },
    { name: 'Ensalada mixta', portion: '1 plato', calories: 70 },
    { name: 'Fruta de postre', portion: '1 unidad', calories: 80 },
  ],
  [
    { name: 'Atun o salmon', portion: '180 g', calories: 260 },
    { name: 'Pasta integral', portion: '1 taza', calories: 200 },
    { name: 'Verduras salteadas', portion: '1 taza', calories: 90 },
  ],
  [
    { name: 'Pollo asado', portion: '200 g', calories: 240 },
    { name: 'Camote asado', portion: '1 mediano', calories: 130 },
    { name: 'Ensalada con aceite de oliva', portion: '1 plato', calories: 110 },
  ],
  [
    { name: 'Bowl de garbanzos', portion: '1 plato', calories: 300 },
    { name: 'Arroz integral', portion: '3/4 taza', calories: 160 },
    { name: 'Verduras frescas', portion: '1 plato', calories: 60 },
  ],
]

const snackOptions: Food[][] = [
  [
    { name: 'Manzana', portion: '1 unidad', calories: 80 },
    { name: 'Almendras', portion: '15 unidades', calories: 145 },
  ],
  [
    { name: 'Yogur griego natural', portion: '1 pote', calories: 130 },
    { name: 'Frutas variadas', portion: '1 taza', calories: 90 },
  ],
  [
    { name: 'Batido proteico con leche', portion: '300 ml', calories: 200 },
    { name: 'Banana', portion: '1 unidad', calories: 105 },
  ],
  [
    { name: 'Tostada integral', portion: '1 rebanada', calories: 70 },
    { name: 'Mantequilla de mani', portion: '1 cucharada', calories: 90 },
  ],
  [
    { name: 'Pera', portion: '1 unidad', calories: 90 },
    { name: 'Nueces', portion: '20 g', calories: 130 },
  ],
  [
    { name: 'Quesillo o queso fresco', portion: '80 g', calories: 120 },
    { name: 'Galletas integrales', portion: '3 unidades', calories: 90 },
  ],
  [
    { name: 'Hummus', portion: '3 cucharadas', calories: 100 },
    { name: 'Bastones de zanahoria', portion: '1 taza', calories: 50 },
  ],
]

const dinnerOptions: Food[][] = [
  [
    { name: 'Filete de pescado al vapor', portion: '160 g', calories: 160 },
    { name: 'Pure de zanahoria y papa', portion: '1 taza', calories: 190 },
    { name: 'Ensalada verde', portion: '1 plato', calories: 40 },
  ],
  [
    { name: 'Pechuga de pollo', portion: '170 g', calories: 190 },
    { name: 'Caldo de verduras', portion: '1 taza', calories: 30 },
    { name: 'Camote asado', portion: '1 mediano', calories: 130 },
  ],
  [
    { name: 'Huevos revueltos con verduras', portion: '3 huevos', calories: 250 },
    { name: 'Ensalada variada', portion: '1 plato grande', calories: 70 },
    { name: 'Pan integral', portion: '1 rebanada', calories: 70 },
  ],
  [
    { name: 'Sopa de verduras con pollo', portion: '1 plato grande', calories: 240 },
    { name: 'Palta', portion: '1/4 unidad', calories: 80 },
    { name: 'Infusion sin azucar', portion: '1 taza', calories: 5 },
  ],
  [
    { name: 'Carne magra a la plancha', portion: '170 g', calories: 240 },
    { name: 'Verduras salteadas', portion: '1 taza', calories: 120 },
    { name: 'Pasta integral', portion: '1/2 taza', calories: 100 },
  ],
  [
    { name: 'Tacos saludables de pollo', portion: '2 unidades', calories: 300 },
    { name: 'Ensalada fresca', portion: '1 plato', calories: 60 },
    { name: 'Yogur natural', portion: '1/2 pote', calories: 70 },
  ],
  [
    { name: 'Crema de verduras', portion: '1 plato', calories: 160 },
    { name: 'Tortilla de atun', portion: '1 porcion', calories: 230 },
    { name: 'Ensalada verde', portion: '1 plato', calories: 40 },
  ],
]

function scaleFoods(foods: Food[], targetCalories: number): Food[] {
  const currentTotal = foods.reduce((sum, food) => sum + food.calories, 0)
  const factor = targetCalories / currentTotal

  return foods.map((food) => ({
    ...food,
    calories: Math.max(20, Math.round((food.calories * factor) / 5) * 5),
  }))
}

function getMeals(calories: number, dayIndex: number): Meal[] {
  const breakfastCal = Math.round(calories * 0.25)
  const lunchCal = Math.round(calories * 0.35)
  const snackCal = Math.round(calories * 0.15)
  const dinnerCal = Math.round(calories * 0.25)

  return [
    {
      name: 'Desayuno',
      icon: 'AM',
      percentage: 25,
      foods: scaleFoods(breakfastOptions[dayIndex], breakfastCal),
    },
    {
      name: 'Almuerzo',
      icon: 'MD',
      percentage: 35,
      foods: scaleFoods(lunchOptions[dayIndex], lunchCal),
    },
    {
      name: 'Merienda',
      icon: 'PM',
      percentage: 15,
      foods: scaleFoods(snackOptions[dayIndex], snackCal),
    },
    {
      name: 'Cena',
      icon: 'NT',
      percentage: 25,
      foods: scaleFoods(dinnerOptions[dayIndex], dinnerCal),
    },
  ]
}

function getWeeklyPlan(calories: number): DayPlan[] {
  return weekDays.map((day, index) => ({
    day,
    meals: getMeals(calories, index),
  }))
}

function escapePdfText(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function wrapPdfText(text: string, maxLength = 96) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxLength && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  })

  if (line) lines.push(line)
  return lines
}

function buildPdf(plan: DayPlan[], dailyCalories: number, macros: { name: string; grams: number; pct: number }[]) {
  const contentLines: string[] = []
  const pushText = (text: string, x: number, y: number, size = 10) => {
    contentLines.push(`BT /F1 ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`)
  }

  const pages: string[] = []
  let y = 792

  const newPage = () => {
    pages.push(contentLines.splice(0).join('\n'))
    y = 792
  }

  const addLine = (text: string, size = 10, indent = 0, gap = 14) => {
    if (y < 56) newPage()
    pushText(text, 42 + indent, y, size)
    y -= gap
  }

  addLine('NutriKinesis - Plan nutricional semanal', 18, 0, 24)
  addLine(`Basado en ${dailyCalories.toLocaleString()} kcal por dia`, 11, 0, 18)
  addLine(`Macronutrientes: ${macros.map((m) => `${m.name} ${m.grams}g (${m.pct}%)`).join(' | ')}`, 10, 0, 22)

  plan.forEach(({ day, meals }) => {
    addLine(day, 14, 0, 18)
    meals.forEach((meal) => {
      const mealTotal = meal.foods.reduce((sum, food) => sum + food.calories, 0)
      addLine(`${meal.name} - ${mealTotal} kcal (${meal.percentage}% del total diario)`, 11, 10, 15)
      meal.foods.forEach((food) => {
        wrapPdfText(`- ${food.name}: ${food.portion} - ${food.calories} kcal`).forEach((line) => {
          addLine(line, 9, 24, 12)
        })
      })
      y -= 4
    })
    y -= 8
  })

  addLine('Consejos adicionales', 14, 0, 18)
  additionalTips.forEach((tip) => {
    wrapPdfText(`- ${tip}`).forEach((line) => addLine(line, 10, 12, 13))
  })

  if (contentLines.length) newPage()

  const objects: string[] = []
  objects.push('<< /Type /Catalog /Pages 2 0 R >>')
  objects.push(`<< /Type /Pages /Kids [${pages.map((_, i) => `${3 + i * 2} 0 R`).join(' ')}] /Count ${pages.length} >>`)

  pages.forEach((pageContent, i) => {
    const pageObject = 3 + i * 2
    const contentObject = pageObject + 1
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents ${contentObject} 0 R >>`)
    objects.push(`<< /Length ${pageContent.length} >>\nstream\n${pageContent}\nendstream`)
  })

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

function downloadPdf(plan: DayPlan[], dailyCalories: number, macros: { name: string; grams: number; pct: number }[]) {
  const blob = buildPdf(plan, dailyCalories, macros)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'plan-nutricional-semanal.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const macroColors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500']
const mealGradients = [
  'from-amber-500/20 to-orange-500/10 border-amber-500/30',
  'from-yellow-500/20 to-amber-500/10 border-yellow-500/30',
  'from-green-500/20 to-emerald-500/10 border-green-500/30',
  'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
]

export default function NutritionPlan({ dailyCalories, onGoToCalculator }: Props) {
  if (!dailyCalories) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">NK</div>
        <h3 className="text-xl font-semibold mb-2">Aun no hay datos caloricos</h3>
        <p className="text-white/50 mb-6 max-w-sm mx-auto">
          Primero calcula tus calorias diarias para generar un plan nutricional personalizado.
        </p>
        <button
          onClick={onGoToCalculator}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ir a la calculadora
        </button>
      </div>
    )
  }

  const weeklyPlan = getWeeklyPlan(dailyCalories)
  const macros = [
    { name: 'Proteinas', grams: Math.round((dailyCalories * 0.3) / 4), pct: 30 },
    { name: 'Carbohidratos', grams: Math.round((dailyCalories * 0.45) / 4), pct: 45 },
    { name: 'Grasas', grams: Math.round((dailyCalories * 0.25) / 9), pct: 25 },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 mb-8 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <h2 className="text-3xl font-bold mb-2">Plan Nutricional Semanal</h2>
          <p className="text-white/60">
            Basado en <span className="text-emerald-400 font-semibold">{dailyCalories.toLocaleString()} kcal/dia</span>
          </p>
        </div>
        <button
          onClick={() => downloadPdf(weeklyPlan, dailyCalories, macros)}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Descargar PDF
        </button>
      </div>

      <div className="bg-white/5 rounded-3xl border border-white/10 p-5 mb-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4 text-center uppercase tracking-wider">Distribucion de macronutrientes</h3>
        <div className="flex rounded-full overflow-hidden h-3 mb-4">
          <div className="bg-emerald-500" style={{ width: '30%' }} />
          <div className="bg-blue-500" style={{ width: '45%' }} />
          <div className="bg-purple-500" style={{ width: '25%' }} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {macros.map(({ name, grams, pct }, i) => (
            <div key={name} className="text-center">
              <div className={`inline-block w-2 h-2 rounded-full ${macroColors[i]} mb-1`} />
              <div className="text-lg font-bold">{grams}g</div>
              <div className="text-xs text-white/50">{name}</div>
              <div className="text-xs text-white/30">{pct}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {weeklyPlan.map(({ day, meals }) => (
          <section key={day} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-black text-white">{day}</h3>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {dailyCalories.toLocaleString()} kcal
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {meals.map((meal, i) => {
                const mealTotal = meal.foods.reduce((sum, food) => sum + food.calories, 0)
                return (
                  <div key={`${day}-${meal.name}`} className={`bg-gradient-to-br ${mealGradients[i]} rounded-2xl border p-4`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white/80">{meal.icon}</span>
                        <div>
                          <h4 className="font-bold text-lg">{meal.name}</h4>
                          <p className="text-xs text-white/50">{meal.percentage}% del total diario</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-white">{mealTotal}</div>
                        <div className="text-xs text-white/50">kcal</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {meal.foods.map((food) => (
                        <div key={`${day}-${meal.name}-${food.name}`} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2.5">
                          <div>
                            <p className="text-sm font-medium">{food.name}</p>
                            <p className="text-xs text-white/40">{food.portion}</p>
                          </div>
                          <span className="ml-3 shrink-0 text-sm font-semibold text-white/70">{food.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 bg-white/5 rounded-3xl border border-white/10 p-5">
        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Consejos adicionales</h3>
        <ul className="space-y-2 text-sm text-white/60">
          {additionalTips.map((tip) => (
            <li key={tip} className="flex gap-2"><span>-</span><span>{tip}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
