import React, { useEffect, useRef, useCallback } from "react";
import styles from "./CircularProgress.module.css";

interface CircularProgressProps {
  value: number; // от 0 до 100
  size?: number; // размер элемента (по умолчанию 100)
  color?: string; // цвет заполненной части (по умолчанию "#007bff")
  backgroundColor?: string; // цвет фона (по умолчанию "#e0e0e0")
  textColor?: string; // цвет текста (по умолчанию "#000")
  text?: string; // текст, отображаемый в центре
  fontSize?: number; // размер шрифта (по умолчанию size/5)
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 100,
  color = "#007bff",
  backgroundColor = "#e0e0e0",
  textColor = "#000",
  text = `${value}%`,
  fontSize = size / 5,
}) => {
  const center = size / 2;
  const radius = center;

  // Реф для элемента <path>, который отображает сектор
  const pathRef = useRef<SVGPathElement>(null);
  // Реф для хранения текущего анимированного значения
  const currentValueRef = useRef(0);
  // Реф для хранения id requestAnimationFrame
  const animationFrameRef = useRef<number | null>(null);

  // Функция преобразования полярных координат в декартовы
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Оборачиваем updatePath в useCallback, чтобы он не пересоздавался при каждом рендере
  const updatePath = useCallback(
    (animatedValue: number) => {
      const progressAngle = (animatedValue / 100) * 360;
      if (progressAngle <= 0 || !pathRef.current) {
        return;
      }
      const startAngle = -90; // начало отсчёта сверху
      const endAngle = startAngle + progressAngle;
      const start = polarToCartesian(center, center, radius, startAngle);
      const end = polarToCartesian(center, center, radius, endAngle);
      const largeArcFlag = progressAngle > 180 ? 1 : 0;
      const d = `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
      pathRef.current.setAttribute("d", d);
    },
    [center, radius]
  );

  useEffect(() => {
    const animationDuration = 1000; // длительность анимации в мс
    const startValue = currentValueRef.current;
    const targetValue = value;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / animationDuration, 1);
      const newValue = startValue + progress * (targetValue - startValue);
      currentValueRef.current = newValue;
      updatePath(newValue);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, center, radius, updatePath]);

  return (
    <div
      className="relative"
      style={{ width: size, height: size, position: "relative" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Фон: полностью заполненный круг */}
        <circle cx={center} cy={center} r={radius} fill={backgroundColor} />
        {/* Прогресс: один элемент <path> обновляется напрямую */}
        <path
          ref={pathRef}
          fill={color}
          stroke="none"
          style={{ transition: "fill 1000ms ease" }}
        />
      </svg>
      <p
        className="text-xs text-center absolute"
        style={{
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: size,
          color: textColor,
          fontSize: `${fontSize}px`,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
};
