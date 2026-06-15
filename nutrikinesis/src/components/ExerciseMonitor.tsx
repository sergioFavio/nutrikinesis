import { useState, useRef, useEffect, useCallback } from 'react'
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision'
import { Music, Pause, Play, SkipForward } from 'lucide-react'

type ExerciseType = 'squats' | 'pushups' | 'lunges' | 'plank' | 'jumping_jacks'

interface Exercise {
  id: ExerciseType
  name: string
  icon: string
  description: string
  muscles: string[]
  tips: string[]
}

const EXERCISES: Exercise[] = [
  {
    id: 'squats',
    name: 'Sentadillas',
    icon: '🏋️',
    description: 'Ejercicio compuesto que trabaja piernas y glúteos',
    muscles: ['Cuádriceps', 'Glúteos', 'Isquiotibiales', 'Core'],
    tips: [
      'Mantén la espalda recta durante todo el movimiento',
      'Baja hasta que los muslos estén paralelos al suelo',
      'Las rodillas no deben sobrepasar los pies',
      'Empuja con los talones al subir',
    ],
  },
  {
    id: 'pushups',
    name: 'Flexiones',
    icon: '💪',
    description: 'Ejercicio clásico para pecho, hombros y tríceps',
    muscles: ['Pectoral', 'Tríceps', 'Hombros', 'Core'],
    tips: [
      'Mantén el cuerpo en línea recta de cabeza a talones',
      'Baja el pecho hasta casi tocar el suelo',
      'Codos a 45° del cuerpo (no abiertos)',
      'Exhala al subir, inhala al bajar',
    ],
  },
  {
    id: 'lunges',
    name: 'Estocadas (Lunges)',
    icon: '🦵',
    description: 'Trabaja equilibrio, piernas y glúteos unilateralmente',
    muscles: ['Cuádriceps', 'Glúteos', 'Isquiotibiales', 'Pantorrillas'],
    tips: [
      'Da un paso largo hacia adelante',
      'La rodilla trasera casi toca el suelo',
      'El torso permanece erguido',
      'Alterna ambas piernas',
    ],
  },
  {
    id: 'plank',
    name: 'Plancha',
    icon: '🧘',
    description: 'Isométrico para fortalecer el core completo',
    muscles: ['Core', 'Abdominales', 'Espalda baja', 'Hombros'],
    tips: [
      'Caderas en línea con hombros y talones',
      'Contrae el abdomen y los glúteos',
      'No dejes caer las caderas ni elevarlas',
      'Respira de forma constante',
    ],
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    icon: '⚡',
    description: 'Cardio de cuerpo completo, ideal para calentar',
    muscles: ['Piernas', 'Hombros', 'Core', 'Cardio'],
    tips: [
      'Mantén las rodillas ligeramente flexionadas',
      'Brazos salen laterales hasta la cabeza',
      'Aterrizaje suave con pies al ancho de hombros',
      'Ritmo constante y controlado',
    ],
  },
]

interface Feedback {
  status: 'good' | 'warning' | 'idle'
  message: string
}

function analyzeSquat(landmarks: any[]): Feedback {
  if (!landmarks || landmarks.length < 33) return { status: 'idle', message: 'Posiciónate frente a la cámara' }
  const leftHip = landmarks[23]
  const leftKnee = landmarks[25]
  const leftAnkle = landmarks[27]
  if (!leftHip || !leftKnee || !leftAnkle) return { status: 'idle', message: 'No se detecta cuerpo completo' }

  const kneeAngle = getAngle(leftHip, leftKnee, leftAnkle)

  if (kneeAngle < 100) return { status: 'good', message: '✅ ¡Excelente profundidad! Rodilla bien flexionada' }
  if (kneeAngle < 140) return { status: 'warning', message: '⚠️ Baja más para una sentadilla completa' }
  return { status: 'idle', message: '▶ Inicia la sentadilla flexionando las rodillas' }
}

function analyzePushup(landmarks: any[]): Feedback {
  if (!landmarks || landmarks.length < 33) return { status: 'idle', message: 'Posiciónate frente a la cámara' }
  const leftShoulder = landmarks[11]
  const leftElbow = landmarks[13]
  const leftWrist = landmarks[15]
  const leftHip = landmarks[23]
  if (!leftShoulder || !leftElbow || !leftWrist || !leftHip) return { status: 'idle', message: 'No se detecta cuerpo completo' }

  const elbowAngle = getAngle(leftShoulder, leftElbow, leftWrist)
  const bodyAngle = getAngle(leftShoulder, leftHip, { x: leftHip.x, y: leftHip.y + 0.2, z: 0 })

  if (elbowAngle < 100) return { status: 'good', message: '✅ ¡Buena profundidad! Cuerpo alineado' }
  if (elbowAngle < 160) return { status: 'warning', message: '⚠️ Baja más el pecho hacia el suelo' }
  return { status: 'idle', message: '▶ Inicia la flexión bajando los codos' }
}

function analyzeLunge(landmarks: any[]): Feedback {
  if (!landmarks || landmarks.length < 33) return { status: 'idle', message: 'Posiciónate frente a la cámara' }
  const leftHip = landmarks[23]
  const leftKnee = landmarks[25]
  const leftAnkle = landmarks[27]
  if (!leftHip || !leftKnee || !leftAnkle) return { status: 'idle', message: 'No se detecta cuerpo completo' }

  const kneeAngle = getAngle(leftHip, leftKnee, leftAnkle)
  if (kneeAngle < 110) return { status: 'good', message: '✅ ¡Buena estocada! Rodilla bien flexionada' }
  if (kneeAngle < 150) return { status: 'warning', message: '⚠️ Da un paso más largo y baja más la rodilla' }
  return { status: 'idle', message: '▶ Da un paso adelante para iniciar la estocada' }
}

function analyzePlank(landmarks: any[]): Feedback {
  if (!landmarks || landmarks.length < 33) return { status: 'idle', message: 'Posiciónate de lado a la cámara' }
  const leftShoulder = landmarks[11]
  const leftHip = landmarks[23]
  const leftAnkle = landmarks[27]
  if (!leftShoulder || !leftHip || !leftAnkle) return { status: 'idle', message: 'No se detecta cuerpo completo' }

  const bodyAngle = getAngle(leftShoulder, leftHip, leftAnkle)
  if (bodyAngle > 160) return { status: 'good', message: '✅ ¡Excelente! Cuerpo perfectamente alineado' }
  if (bodyAngle > 140) return { status: 'warning', message: '⚠️ Alinea las caderas con hombros y talones' }
  return { status: 'idle', message: '▶ Adopta la posición de plancha (boca abajo)' }
}

function analyzeJumpingJacks(landmarks: any[]): Feedback {
  if (!landmarks || landmarks.length < 33) return { status: 'idle', message: 'Posiciónate frente a la cámara' }
  const leftWrist = landmarks[15]
  const rightWrist = landmarks[16]
  const leftShoulder = landmarks[11]
  if (!leftWrist || !rightWrist || !leftShoulder) return { status: 'idle', message: 'No se detecta cuerpo completo' }

  const armsUp = leftWrist.y < leftShoulder.y && rightWrist.y < leftShoulder.y
  const armsDown = leftWrist.y > leftShoulder.y && rightWrist.y > leftShoulder.y
  if (armsUp) return { status: 'good', message: '✅ ¡Brazos arriba! Perfecto' }
  if (armsDown) return { status: 'warning', message: '▶ Sube los brazos hasta la cabeza' }
  return { status: 'idle', message: '▶ Realiza jumping jacks con brazos extendidos' }
}

function getAngle(a: any, b: any, c: any): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
  let angle = Math.abs((radians * 180.0) / Math.PI)
  if (angle > 180) angle = 360 - angle
  return angle
}

const analyzers: Record<ExerciseType, (lm: any[]) => Feedback> = {
  squats: analyzeSquat,
  pushups: analyzePushup,
  lunges: analyzeLunge,
  plank: analyzePlank,
  jumping_jacks: analyzeJumpingJacks,
}

const musicModules = import.meta.glob<string>('../musicas/*.{mp3,wav,ogg,m4a}', {
  eager: true,
  query: '?url',
  import: 'default',
})

function formatTrackName(path: string): string {
  const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? 'Cancion'
  return decodeURIComponent(fileName)
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
}

const MUSIC_TRACKS = Object.entries(musicModules)
  .map(([path, src]) => ({
    name: formatTrackName(path),
    src,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export default function ExerciseMonitor() {
  const [selected, setSelected] = useState<ExerciseType>('squats')
  const [isRunning, setIsRunning] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>({ status: 'idle', message: 'Selecciona un ejercicio e inicia el monitor' })
  const [repCount, setRepCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null)
  const animFrameRef = useRef<number>(0)
  const streamRef = useRef<MediaStream | null>(null)
  const lastFeedbackRef = useRef<'good' | 'warning' | 'idle'>('idle')
  const repCountedRef = useRef(false)
  const playAfterTrackChangeRef = useRef(false)

  const exercise = EXERCISES.find((e) => e.id === selected)!
  const currentTrack = MUSIC_TRACKS[selectedTrackIndex]

  const stopCamera = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsMusicPlaying(false)
    setIsRunning(false)
    setFeedback({ status: 'idle', message: 'Monitor detenido' })
  }, [])

  const startCamera = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      if (!poseLandmarkerRef.current) {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
        )
        poseLandmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numPoses: 1,
        })
      }

      setIsRunning(true)
      setLoading(false)
    } catch (err: any) {
      setError('No se pudo acceder a la cámara. Asegúrate de dar los permisos necesarios.')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return
    let lastVideoTime = -1

    function detect() {
      const video = videoRef.current
      const canvas = canvasRef.current
      const landmarker = poseLandmarkerRef.current
      if (!video || !canvas || !landmarker) {
        animFrameRef.current = requestAnimationFrame(detect)
        return
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime
        const result = landmarker.detectForVideo(video, performance.now())
        if (result.landmarks && result.landmarks.length > 0) {
          const landmarks = result.landmarks[0]

          // Draw landmarks
          const drawingUtils = new DrawingUtils(ctx)
          drawingUtils.drawLandmarks(landmarks, { color: '#00ff88', lineWidth: 2, radius: 4 })
          drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, { color: '#00ccff', lineWidth: 2 })

          // Analyze
          const fb = analyzers[selected](landmarks)
          setFeedback(fb)

          // Count reps: transition from good → warning/idle counts as one rep
          if (fb.status === 'good' && !repCountedRef.current) {
            repCountedRef.current = true
          } else if (fb.status !== 'good' && repCountedRef.current) {
            repCountedRef.current = false
            setRepCount((c) => c + 1)
          }
        } else {
          setFeedback({ status: 'idle', message: 'No se detecta persona. Colócate frente a la cámara.' })
        }
      }

      animFrameRef.current = requestAnimationFrame(detect)
    }

    animFrameRef.current = requestAnimationFrame(detect)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [isRunning, selected])

  useEffect(() => {
    return () => {
      stopCamera()
      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close()
        poseLandmarkerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    audio.load()

    if (playAfterTrackChangeRef.current && isRunning) {
      audio.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false))
    } else {
      setIsMusicPlaying(false)
    }

    playAfterTrackChangeRef.current = false
  }, [selectedTrackIndex])

  const handleExerciseChange = (id: ExerciseType) => {
    setSelected(id)
    setRepCount(0)
    repCountedRef.current = false
    setFeedback({ status: 'idle', message: 'Selecciona un ejercicio e inicia el monitor' })
  }

  const handlePlayPauseMusic = async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsMusicPlaying(true)
    } catch {
      setError('No se pudo reproducir la cancion seleccionada.')
      setIsMusicPlaying(false)
    }
  }

  const handleTrackChange = (index: number) => {
    playAfterTrackChangeRef.current = false
    setSelectedTrackIndex(index)
  }

  const handleNextTrack = () => {
    if (MUSIC_TRACKS.length === 0) return
    playAfterTrackChangeRef.current = isMusicPlaying
    setSelectedTrackIndex((index) => (index + 1) % MUSIC_TRACKS.length)
  }

  const feedbackColors = {
    good: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    warning: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
    idle: 'bg-white/5 border-white/10 text-white/60',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Monitor de Ejercicios</h2>
        <p className="text-white/60">Usa la cámara con IA MediaPipe para verificar tu postura en tiempo real</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start">
        {/* Left: exercise selector + info */}
        <div className="space-y-4 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto lg:pr-2">
          {/* Selector */}
          <div className="bg-white/5 rounded-3xl border border-white/10 p-4">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 block">
              Selecciona ejercicio
            </label>
            <div className="space-y-2">
              {EXERCISES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleExerciseChange(ex.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    selected === ex.id
                      ? 'bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 border border-emerald-500/40 text-white'
                      : 'bg-white/5 border border-transparent text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{ex.icon}</span>
                  <div className="text-left">
                    <p className="font-medium">{ex.name}</p>
                    <p className="text-xs opacity-60">{ex.muscles.slice(0, 2).join(' · ')}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise info */}
          <div className="bg-white/5 rounded-3xl border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{exercise.icon}</span>
              <div>
                <h3 className="font-bold">{exercise.name}</h3>
                <p className="text-xs text-white/50">{exercise.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {exercise.muscles.map((m) => (
                <span key={m} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">{m}</span>
              ))}
            </div>
            <div className="space-y-1.5">
              {exercise.tips.map((tip, i) => (
                <p key={i} className="text-xs text-white/50 flex gap-1.5">
                  <span className="text-emerald-500 shrink-0">▸</span>{tip}
                </p>
              ))}
            </div>
          </div>

          {/* Rep counter */}
          <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 rounded-3xl border border-emerald-500/30 p-4 text-center">
            <p className="text-xs text-white/50 mb-1 uppercase tracking-wider">Repeticiones detectadas</p>
            <p className="text-5xl font-black text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">{repCount}</p>
            <button
              onClick={() => { setRepCount(0); repCountedRef.current = false }}
              className="mt-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Reiniciar contador
            </button>
          </div>
        </div>

        {/* Right: camera */}
        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={currentTrack?.src}
            preload="metadata"
            onEnded={handleNextTrack}
          />

          <div className="relative bg-black rounded-3xl overflow-hidden aspect-[8/9] border border-white/10">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-0" playsInline muted />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            {!isRunning && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
                <div className="text-center">
                  <div className="text-5xl mb-3">📷</div>
                  <p className="text-white/60 text-sm">La cámara está desactivada</p>
                  <p className="text-white/40 text-xs mt-1">Pulsa "Iniciar monitor" para comenzar</p>
                </div>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/70 text-sm">Cargando modelo IA...</p>
                  <p className="text-white/40 text-xs mt-1">Primera carga puede demorar unos segundos</p>
                </div>
              </div>
            )}
          </div>

          {isRunning && MUSIC_TRACKS.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-2 mb-3">
                <Music className="h-4 w-4 text-emerald-300 shrink-0" aria-hidden="true" />
                <select
                  value={selectedTrackIndex}
                  onChange={(event) => handleTrackChange(Number(event.target.value))}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400"
                  aria-label="Seleccionar cancion"
                >
                  {MUSIC_TRACKS.map((track, index) => (
                    <option key={track.src} value={index}>
                      {track.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handlePlayPauseMusic}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400"
                >
                  {isMusicPlaying ? (
                    <>
                      <Pause className="h-4 w-4" aria-hidden="true" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" aria-hidden="true" />
                      Reproducir
                    </>
                  )}
                </button>
                <button
                  onClick={handleNextTrack}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/15 disabled:opacity-40"
                  disabled={MUSIC_TRACKS.length < 2}
                >
                  <SkipForward className="h-4 w-4" aria-hidden="true" />
                  Cambiar
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className={`rounded-2xl border px-4 py-3 transition-all ${feedbackColors[feedback.status]}`}>
            <p className="text-sm font-medium text-center">{feedback.message}</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-2xl px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          {/* Control button */}
          {!isRunning ? (
            <button
              onClick={startCamera}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:opacity-90 transition-all disabled:opacity-40 shadow-lg shadow-emerald-500/20"
            >
              {loading ? 'Iniciando...' : '▶ Iniciar monitor'}
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 transition-all"
            >
              ⏹ Detener monitor
            </button>
          )}

          <p className="text-xs text-white/30 text-center">
            La cámara solo se procesa localmente. Ningún video se envía a servidores.
          </p>
        </div>
      </div>
    </div>
  )
}
