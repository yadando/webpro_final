import { useState } from 'react'
import './App.css'

function App() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // ルーレットの中身を固定
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // ランダムに当選番号を決める (0 〜 9 のインデックス)
    const winnerIndex = Math.floor(Math.random() * items.length)

    // --- ここからは回転角度の計算（おまじないだと思ってOKです） ---
    const anglePerItem = 360 / items.length
    // 当選した数字が上に来るように角度を調整
    const stopAngle = 360 - (winnerIndex * anglePerItem + anglePerItem / 2)
    // 5回転(1800度) + 調整した角度
    const newRotation = rotation + 1800 + (stopAngle - (rotation % 360))
    // -------------------------------------------------------

    setRotation(newRotation)

    // 3秒後に結果を表示
    setTimeout(() => {
      setResult(items[winnerIndex])
      setIsSpinning(false)
    }, 3000)
  }

  // 背景の扇形を作る関数
  const getWheelBackground = () => {
    // 10個分の色を作る (赤と青を交互にするなど)
    const colors = items.map(i => i % 2 === 0 ? '#ff6b6b' : '#4ecdc4')
    // CSSの conic-gradient を作る文字列を生成
    let gradient = 'conic-gradient('
    const step = 360 / items.length
    items.forEach((_, i) => {
      gradient += `${colors[i]} ${step * i}deg ${step * (i + 1)}deg,`
    })
    return gradient.slice(0, -1) + ')'
  }

  return (
    <div className="container">
      <h1>Simple Roulette 1-10</h1>
      
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
          {/* 数字を円周上に配置 */}
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
        {isSpinning ? '回っています...' : 'スタート！'}
      </button>

      {result !== null && (
        <h2 className="result">結果: {result}</h2>
      )}
    </div>
  )
}

export default App