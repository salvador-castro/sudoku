# 🧩 Sudoku — Next.js + React

Aplicación de **Sudoku sin pistas** desarrollada con **Next.js (App Router)** y **React**, enfocada en el aprendizaje profundo de:

- estado complejo con `useReducer`
- separación de lógica y UI
- generación y validación de Sudoku
- manejo de teclado
- feedback visual y UX
- modales y animaciones simples
- Tailwind CSS

El usuario puede **colocar cualquier número libremente** y validar el tablero al final.

---

## 🚀 Demo local

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000/
```

---

## 🎯 Objetivos del proyecto

- ❌ **No hay pistas ni ayudas**
- ✅ El jugador puede escribir cualquier número
- ✅ Validar si hay errores o contradicciones
- ✅ Detectar cuando el tablero está completo y correcto
- ✅ Celebrar con un modal y animación 🎉
- ✅ Generar un **nuevo Sudoku** al finalizar
- ❌ El resolvedor automático **NO está incluido** (proyecto aparte)

---

## 🧠 Funcionalidades

### 🎮 Juego
- Generación de Sudoku por dificultad:
  - Básico
  - Intermedio
  - Avanzado
- Movimiento con teclado:
  - `1–9` → colocar número
  - `Backspace / Delete / 0` → borrar
  - Flechas → mover selección
- Reset del tablero
- Validación manual

### ✅ Validación
Al presionar **Validar**:
- ❌ Si hay contradicciones → mensaje de error
- ⚠️ Si faltan casilleros:
  - mensaje: **“Faltan casilleros, verificar”**
  - casilleros vacíos resaltados en rojo claro por 5s
- 🎉 Si está completo y correcto:
  - modal de felicitación
  - lluvia de emojis 🥳
  - botón **Genial** genera un nuevo tablero

---

## 🧱 Stack tecnológico

- **Next.js 14+** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- Sin librerías externas para Sudoku

---

## 📁 Estructura del proyecto

```
app/
├── page.tsx                # Página principal (Sudoku)
├── layout.tsx              # Layout raíz
├── globals.css             # Estilos globales
│
components/
├── SudokuBoard.tsx         # Grilla 9x9
├── Cell.tsx                # Celda individual
├── Controls.tsx            # Botones y teclado numérico
├── CelebrationModal.tsx    # Modal + animación
│
hooks/
├── useSudokuGame.ts        # Lógica central del juego
│
lib/
└── sudoku/
    ├── types.ts            # Tipos (Board, Difficulty, etc.)
    ├── generator.ts        # Generador de Sudoku
    ├── board.ts            # Validaciones (consistencia)
```

---

## 🧩 Arquitectura del estado

Toda la lógica vive en:

```ts
hooks/useSudokuGame.ts
```

Se maneja con `useReducer`, no con múltiples `useState`.

---

## 🎨 UI / UX

- Tablero alineado a la izquierda
- Controles fijos a la derecha (sticky)
- Separación visual clara de subcuadrículas 3×3
- Feedback inmediato y visual
- Modal accesible (ESC / click afuera)

---

## ⚠️ Decisiones importantes

- ❌ No se valida cada movimiento  
- ❌ No hay hints  
- ❌ No hay solver automático  
- ✅ Sudoku generado solo en cliente  

---

## 🛠️ Instalación

```bash
git clone <repo>
cd sudoku
npm install
npm run dev
```

---

## 📄 Licencia

MIT
