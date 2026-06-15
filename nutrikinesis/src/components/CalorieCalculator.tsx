import { useState } from 'react'

interface Props {
  onCaloriesCalculated: (calories: number) => void
}

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
type Goal = 'lose' | 'maintain' | 'gain'

const activityLabels: Record<ActivityLevel, { label: string; desc: string; factor: number }> = {
  sedentary: { label: 'Sedentario', desc: 'Poco o ningún ejercicio', factor: 1.2 },
  light: { label: 'Ligero', desc: '1-3 días/semana', factor: 1.375 },
  moderate: { label: 'Moderado', desc: '3-5 días/semana', factor: 1.55 },
  active: { label: 'Activo', desc: '6-7 días/semana', factor: 1.725 },
  very_active: { label: 'Muy activo', desc: 'Atleta / trabajo físico', factor: 1.9 },
}

const goalAdjustments: Record<Goal, { label: string; adjustment: number; color: string }> = {
  lose: { label: 'Perder peso', adjustment: -500, color: 'from-orange-500 to-red-500' },
  maintain: { label: 'Mantener peso', adjustment: 0, color: 'from-emerald-500 to-cyan-500' },
  gain: { label: 'Ganar músculo', adjustment: 300, color: 'from-blue-500 to-purple-500' },
}

export default function CalorieCalculator({ onCaloriesCalculated }: Props) {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male' as 'male' | 'female',
    activity: 'moderate' as ActivityLevel,
    goal: 'maintain' as Goal,
  })
  const [result, setResult] = useState<{
    bmr: number
    tdee: number
    target: number
    bmi: number
    bmiCategory: string
  } | null>(null)

  function calculate() {
    const age = parseFloat(form.age)
    const weight = parseFloat(form.weight)
    const height = parseFloat(form.height)
    if (!age || !weight || !height) return

    // Mifflin-St Jeor
    let bmr =
      form.gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161

    const tdee = bmr * activityLabels[form.activity].factor
    const target = tdee + goalAdjustments[form.goal].adjustment

    const bmi = weight / Math.pow(height / 100, 2)
    const bmiCategory =
      bmi < 18.5 ? 'Bajo peso' :
      bmi < 25 ? 'Normal' :
      bmi < 30 ? 'Sobrepeso' : 'Obesidad'

    const res = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
      bmi: parseFloat(bmi.toFixed(1)),
      bmiCategory,
    }
    setResult(res)
    onCaloriesCalculated(res.target)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Calculadora de Calorías</h2>
        <p className="text-white/60">Calcula tus necesidades calóricas diarias usando la fórmula Mifflin-St Jeor</p>
      </div>

      <div className="bg-white/5 rounded-3xl border border-white/10 p-6 space-y-5 backdrop-blur-sm">
        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-white/70 mb-2 block">Sexo</label>
          <div className="grid grid-cols-2 gap-2">
            {(['male', 'female'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setForm({ ...form, gender: g })}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                  form.gender === g
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {g === 'male' ? '♂ Masculino' : '♀ Femenino'}
              </button>
            ))}
          </div>
        </div>

        {/* Basic fields */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'age', label: 'Edad', unit: 'años', placeholder: '25' },
            { key: 'weight', label: 'Peso', unit: 'kg', placeholder: '70' },
            { key: 'height', label: 'Altura', unit: 'cm', placeholder: '170' },
          ].map(({ key, label, unit, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-medium text-white/60 mb-1.5 block">{label}</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={placeholder}
                  value={form[key as 'age' | 'weight' | 'height']}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">{unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Level */}
        <div>
          <label className="text-sm font-medium text-white/70 mb-2 block">Nivel de actividad</label>
          <div className="space-y-1.5">
            {(Object.entries(activityLabels) as [ActivityLevel, typeof activityLabels[ActivityLevel]][]).map(([key, { label, desc }]) => (
              <button
                key={key}
                onClick={() => setForm({ ...form, activity: key })}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                  form.activity === key
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-white'
                    : 'bg-white/5 border border-transparent text-white/60 hover:bg-white/8 hover:text-white'
                }`}
              >
                <span className="font-medium">{label}</span>
                <span className="text-xs opacity-60">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="text-sm font-medium text-white/70 mb-2 block">Objetivo</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.entries(goalAdjustments) as [Goal, typeof goalAdjustments[Goal]][]).map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => setForm({ ...form, goal: key })}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                  form.goal === key
                    ? `bg-gradient-to-br ${color} text-white shadow-lg`
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculate}
          disabled={!form.age || !form.weight || !form.height}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          Calcular mis calorías
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4 animate-fade-in">
          {/* Main result */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-3xl border border-emerald-500/30 p-6 text-center">
            <p className="text-sm text-white/60 mb-1">Calorías diarias recomendadas</p>
            <p className="text-6xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
              {result.target.toLocaleString()}
            </p>
            <p className="text-white/60 text-sm mt-1">kcal / día · {goalAdjustments[form.goal].label}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Metabolismo basal', value: result.bmr.toLocaleString(), unit: 'kcal', icon: '🫀' },
              { label: 'Gasto total (TDEE)', value: result.tdee.toLocaleString(), unit: 'kcal', icon: '⚡' },
              { label: 'IMC', value: result.bmi, unit: result.bmiCategory, icon: '📊' },
            ].map(({ label, value, unit, icon }) => (
              <div key={label} className="bg-white/5 rounded-2xl border border-white/10 p-4 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs text-white/50">{unit}</div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-emerald-400/80">
            ✅ Plan nutricional generado en la pestaña <strong>Nutrición</strong>
          </p>
        </div>
      )}
    </div>
  )
}
