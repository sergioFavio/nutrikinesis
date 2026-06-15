import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CalorieCalculator from '../components/CalorieCalculator'
import ExerciseMonitor from '../components/ExerciseMonitor'
import NutritionPlan from '../components/NutritionPlan'

export const Route = createFileRoute('/')({
  component: Home,
})

type Tab = 'calories' | 'exercise' | 'nutrition'

const tabs: { id: Tab; label: string; desc: string }[] = [
  { id: 'calories', label: 'Calorías', desc: 'Calculadora' },
  { id: 'exercise', label: 'Ejercicios', desc: 'Monitor IA' },
  { id: 'nutrition', label: 'Nutrición', desc: 'Plan diario' },
]

function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('calories')
  const [dailyCalories, setDailyCalories] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-black text-slate-950">
              NK
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                NutriKinesis
              </h1>
              <p className="text-xs text-white/50">Tu asistente de salud y fitness</p>
            </div>
          </div>

          <nav className="mx-auto flex justify-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-1 lg:shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-w-[8rem] flex-col items-center gap-0.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-emerald-500 to-cyan-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-xs opacity-70">{tab.desc}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'calories' && (
          <CalorieCalculator onCaloriesCalculated={setDailyCalories} />
        )}
        {activeTab === 'exercise' && <ExerciseMonitor />}
        {activeTab === 'nutrition' && (
          <NutritionPlan dailyCalories={dailyCalories} onGoToCalculator={() => setActiveTab('calories')} />
        )}
      </main>
    </div>
  )
}
