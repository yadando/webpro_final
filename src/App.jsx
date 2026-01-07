import { useState } from 'react'
import './App.css'

function App() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    const winnerIndex = Math.floor(Math.random() * items.length)

    const anglePerItem = 360 / items.length
    const stopAngle = 360 - (winnerIndex * anglePerItem + anglePerItem / 2)
    const newRotation = rotation + 1800 + (stopAngle - (rotation % 360))

    setRotation(newRotation)

    setTimeout(() => {
      setResult(items[winnerIndex])
      setIsSpinning(false)
    }, 3000)
  }

  const getWheelBackground = () => {
    const colors = items.map(i => i % 2 === 0 ? '#ff6b6b' : '#4ecdc4')
    let gradient = 'conic-gradient('
    const step = 360 / items.length
    items.forEach((_, i) => {
      gradient += `${colors[i]} ${step * i}deg ${step * (i + 1)}deg,`
    })
    return gradient.slice(0, -1) + ')'
  }

  return (
    <div className="container">
      <h1>ルーレット</h1>
      
      <div className="wheel-container">
        <div className="pointer">▼</div>
        <div 
          className="wheel" 
          style={{ 
            background: getWheelBackground(),
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.2, 0, 0.2, 1)' : 'none'
          }}
        >
          {items.map((num, i) => (
            <span 
              key={num} 
              className="wheel-number"
              style={{ transform: `rotate(${360 / 10 * i + (360/10/2)}deg)` }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      <button className="spin-btn" onClick={spinRoulette} disabled={isSpinning}>
        {isSpinning ? '抽選中' : 'スタート'}
      </button>

      {result !== null && (
        <h2 className="result">結果: {result}</h2>
      )}
    </div>
  )
}

export default App