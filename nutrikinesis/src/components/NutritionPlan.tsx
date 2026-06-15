interface Props {
  dailyCalories: number | null
  onGoToCalculator: () => void
}

interface Meal {
  name: string
  icon: string
  percentage: number
  foods: { name: string; portion: string; calories: number }[]
}

function getMeals(calories: number): Meal[] {
  const breakfastCal = Math.round(calories * 0.25)
  const lunchCal = Math.round(calories * 0.35)
  const snackCal = Math.round(calories * 0.15)
  const dinnerCal = Math.round(calories * 0.25)

  return [
    {
      name: 'Desayuno',
      icon: '🌅',
      percentage: 25,
      foods: getBreakfastFoods(breakfastCal),
    },
    {
      name: 'Almuerzo',
      icon: '☀️',
      percentage: 35,
      foods: getLunchFoods(lunchCal),
    },
    {
      name: 'Merienda',
      icon: '🍎',
      percentage: 15,
      foods: getSnackFoods(snackCal),
    },
    {
      name: 'Cena',
      icon: '🌙',
      percentage: 25,
      foods: getDinnerFoods(dinnerCal),
    },
  ]
}

function getBreakfastFoods(cal: number) {
  if (cal < 400) return [
    { name: 'Avena con leche descremada', portion: '1 taza (200ml)', calories: 180 },
    { name: 'Frutas frescas (banana + frutilla)', portion: '1 porción mediana', calories: 80 },
    { name: 'Huevo revuelto', portion: '1 unidad', calories: 70 },
    { name: 'Té o café sin azúcar', portion: '1 taza', calories: 5 },
  ]
  if (cal < 600) return [
    { name: 'Avena con leche + miel', portion: '1½ tazas', calories: 270 },
    { name: 'Tostadas integrales', portion: '2 rebanadas', calories: 140 },
    { name: 'Huevo revuelto', portion: '2 unidades', calories: 140 },
    { name: 'Jugo de naranja natural', portion: '200ml', calories: 90 },
  ]
  return [
    { name: 'Avena con leche entera + frutas', portion: '2 tazas', calories: 350 },
    { name: 'Tostadas integrales con palta', portion: '2 rebanadas + ½ palta', calories: 260 },
    { name: 'Huevos revueltos', portion: '2 unidades', calories: 140 },
    { name: 'Yogur griego', portion: '1 pote (200g)', calories: 130 },
    { name: 'Jugo de naranja natural', portion: '200ml', calories: 90 },
  ]
}

function getLunchFoods(cal: number) {
  if (cal < 500) return [
    { name: 'Pechuga de pollo a la plancha', portion: '150g', calories: 165 },
    { name: 'Arroz integral', portion: '½ taza cocida', calories: 110 },
    { name: 'Ensalada verde mixta', portion: '1 plato grande', calories: 50 },
    { name: 'Agua con limón', portion: '1 vaso', calories: 5 },
  ]
  if (cal < 700) return [
    { name: 'Pollo a la plancha o asado', portion: '200g', calories: 220 },
    { name: 'Arroz integral con verduras', portion: '1 taza cocida', calories: 200 },
    { name: 'Ensalada de tomate y pepino', portion: '1 plato', calories: 60 },
    { name: 'Sopa de verduras', portion: '1 plato chico', calories: 80 },
    { name: 'Fruta de postre', portion: '1 unidad', calories: 80 },
  ]
  return [
    { name: 'Salmón o atún al horno', portion: '200g', calories: 280 },
    { name: 'Arroz integral o quinoa', portion: '1½ tazas', calories: 280 },
    { name: 'Brócoli y zanahorias al vapor', portion: '1 taza', calories: 80 },
    { name: 'Ensalada con aceite de oliva', portion: '1 plato', calories: 90 },
    { name: 'Pan integral', portion: '1 rebanada', calories: 70 },
    { name: 'Fruta de postre', portion: '1 pieza grande', calories: 100 },
  ]
}

function getSnackFoods(cal: number) {
  if (cal < 200) return [
    { name: 'Manzana o pera', portion: '1 unidad mediana', calories: 80 },
    { name: 'Almendras', portion: '15 unidades (25g)', calories: 145 },
  ]
  if (cal < 300) return [
    { name: 'Yogur griego natural', portion: '1 pote (200g)', calories: 130 },
    { name: 'Frutas variadas', portion: '1 taza', calories: 90 },
    { name: 'Nueces o almendras', portion: '20g', calories: 120 },
  ]
  return [
    { name: 'Batido proteico con leche', portion: '300ml', calories: 200 },
    { name: 'Banana', portion: '1 grande', calories: 105 },
    { name: 'Mantequilla de maní', portion: '1 cucharada (15g)', calories: 90 },
    { name: 'Tostada integral', portion: '1 rebanada', calories: 70 },
  ]
}

function getDinnerFoods(cal: number) {
  if (cal < 400) return [
    { name: 'Filete de pescado al vapor', portion: '150g', calories: 140 },
    { name: 'Puré de zanahoria y papa', portion: '½ taza', calories: 120 },
    { name: 'Ensalada verde', portion: '1 plato', calories: 40 },
    { name: 'Infusión de manzanilla', portion: '1 taza', calories: 5 },
  ]
  if (cal < 600) return [
    { name: 'Pechuga de pollo o huevos', portion: '180g / 3 huevos', calories: 250 },
    { name: 'Camote o batata asada', portion: '1 mediana', calories: 130 },
    { name: 'Ensalada variada con vinagre', portion: '1 plato grande', calories: 70 },
    { name: 'Caldo de verduras', portion: '1 taza', calories: 30 },
  ]
  return [
    { name: 'Carne magra o pollo a la plancha', portion: '200g', calories: 280 },
    { name: 'Pasta integral o legumbres', portion: '1 taza cocida', calories: 200 },
    { name: 'Salteado de verduras con aceite', portion: '1 taza', calories: 120 },
    { name: 'Ensalada completa', portion: '1 plato', calories: 80 },
    { name: 'Pan integral', portion: '1 rebanada', calories: 70 },
  ]
}

const macroColors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500']
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
        <div className="text-6xl mb-4">🥗</div>
        <h3 className="text-xl font-semibold mb-2">Aún no hay datos calóricos</h3>
        <p className="text-white/50 mb-6 max-w-sm mx-auto">
          Primero calcula tus calorías diarias para generar un plan nutricional personalizado.
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

  const meals = getMeals(dailyCalories)
  const macros = [
    { name: 'Proteínas', grams: Math.round((dailyCalories * 0.3) / 4), pct: 30 },
    { name: 'Carbohidratos', grams: Math.round((dailyCalories * 0.45) / 4), pct: 45 },
    { name: 'Grasas', grams: Math.round((dailyCalories * 0.25) / 9), pct: 25 },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Plan Nutricional Diario</h2>
        <p className="text-white/60">Basado en <span className="text-emerald-400 font-semibold">{dailyCalories.toLocaleString()} kcal/día</span></p>
      </div>

      {/* Macro summary */}
      <div className="bg-white/5 rounded-3xl border border-white/10 p-5 mb-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4 text-center uppercase tracking-wider">Distribución de macronutrientes</h3>
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

      {/* Meal cards */}
      <div className="space-y-4">
        {meals.map((meal, i) => {
          const mealTotal = meal.foods.reduce((sum, f) => sum + f.calories, 0)
          return (
            <div
              key={meal.name}
              className={`bg-gradient-to-br ${mealGradients[i]} rounded-3xl border p-5`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meal.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{meal.name}</h3>
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
                  <div key={food.name} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium">{food.name}</p>
                      <p className="text-xs text-white/40">{food.portion}</p>
                    </div>
                    <span className="text-sm font-semibold text-white/70 ml-3 shrink-0">{food.calories} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-white/5 rounded-3xl border border-white/10 p-5">
        <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">💧 Consejos adicionales</h3>
        <ul className="space-y-2 text-sm text-white/60">
          <li className="flex gap-2"><span>•</span><span>Bebe al menos 2 litros de agua por día</span></li>
          <li className="flex gap-2"><span>•</span><span>Evita azúcares refinados y alimentos ultraprocesados</span></li>
          <li className="flex gap-2"><span>•</span><span>Incluye fibra en cada comida (verduras, granos integrales)</span></li>
          <li className="flex gap-2"><span>•</span><span>Come despacio y mastica bien los alimentos</span></li>
          <li className="flex gap-2"><span>•</span><span>Consulta con un nutricionista para un plan 100% personalizado</span></li>
        </ul>
      </div>
    </div>
  )
}
