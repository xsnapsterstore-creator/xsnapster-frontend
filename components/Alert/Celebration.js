import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function Celebration ({ isSuccess }) {
  const hasFired = useRef(false)

  useEffect(() => {
    // 🔄 Reset when coupon is not active
    if (!isSuccess) {
      hasFired.current = false
      return
    }

    // 🎉 Fire only once per success trigger
    if (isSuccess && !hasFired.current) {
      hasFired.current = true

      // 🎊 Burst animation
      const duration = 1000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        })

        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [isSuccess])

  return null // no UI needed
}
