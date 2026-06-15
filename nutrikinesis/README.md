# FitCalc — Calculadora de Calorías y Monitor de Ejercicios

Una aplicación web de fitness y nutrición que combina cálculo de calorías, monitoreo de ejercicios con IA y planes nutricionales personalizados.

## Características

- **Calculadora de Calorías** — Usa la fórmula Mifflin-St Jeor para calcular el metabolismo basal (BMR), gasto total diario (TDEE) e IMC, ajustado por nivel de actividad y objetivo personal (perder/mantener/ganar peso).
- **Monitor de Ejercicios con MediaPipe** — Usa la cámara del dispositivo y el modelo de detección de poses `pose_landmarker_lite` para dar retroalimentación en tiempo real sobre la postura en: sentadillas, flexiones, estocadas, plancha y jumping jacks. Además cuenta repeticiones automáticamente.
- **Plan Nutricional** — Genera un plan de 4 comidas (desayuno, almuerzo, merienda y cena) con alimentos reales, porciones y calorías, distribuido según las calorías calculadas.

## Tecnologías

- [TanStack Start](https://tanstack.com/start) — Framework React SSR/SPA
- [TanStack Router](https://tanstack.com/router) — Routing tipado
- [MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker) — Detección de poses en tiempo real
- [Tailwind CSS v4](https://tailwindcss.com) — Estilos utilitarios
- [Netlify](https://netlify.com) — Hosting y despliegue

## Cómo ejecutar localmente

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

> **Nota:** La primera vez que actives el monitor de ejercicios, el modelo de IA se descarga (~3 MB) desde CDN. Requiere permisos de cámara en el navegador.
