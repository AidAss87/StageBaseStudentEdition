import React, { useState, useEffect } from "react";

// Преобразует полярные координаты в декартовы
function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

// Возвращает строку для атрибута d, описывающую дугу
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

// Компонент Arc отвечает за отрисовку одного сегмента дуги.
// При animate=true дуга «рисуется» (анимируется) от полного dashoffset к 0.
// Важно: в стиле добавлен transition не только для strokeDashoffset,
// но и для свойства stroke – чтобы при смене активного цвета дуга плавно меняла цвет.
const Arc = ({
  cx,
  cy,
  r,
  startAngle,
  endAngle,
  color,
  animate,
  animationDuration,
}) => {
  const deltaAngle = endAngle - startAngle;
  // Вычисляем длину дуги (arcLength) для анимации strokeDashoffset
  const arcLength = (Math.PI * r * Math.abs(deltaAngle)) / 180;
  const [dashoffset, setDashoffset] = useState(animate ? arcLength : 0);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        setDashoffset(0);
      }, 50); // небольшая задержка для срабатывания анимации
      return () => clearTimeout(timeout);
    }
  }, [animate, arcLength]);

  const d = describeArc(cx, cy, r, startAngle, endAngle);

  return (
    <path
      d={d}
      stroke={color}
      strokeWidth="20"
      fill="none"
      strokeDasharray={arcLength}
      strokeDashoffset={dashoffset}
      style={{
        transition: `stroke-dashoffset ${animationDuration}ms ease-in-out, stroke ${animationDuration}ms ease-in-out`,
      }}
    />
  );
};

// Основной компонент StageProgressCircle принимает массив stageData и параметры
// size и animationDuration.
// Логика такова: при клике увеличивается currentStage.
// Все уже заполненные сегменты, а также текущий анимируемый сегмент отрисовываются с цветом,
// соответствующим последнему (текущему) этапу.
export const StageProgressCircle = ({
  stageData,
  size = 200,
  animationDuration = 1000,
}) => {
  // currentStage === -1: ни один этап ещё не заполнен
  const [currentStage, setCurrentStage] = useState(-1);
  const numStages = stageData.length;
  const anglePerStage = 360 / numStages; // угол одного сегмента
  const cx = size / 2;
  const cy = size / 2;
  // Радиус выбираем с запасом для учета strokeWidth (20)
  const r = cx - 20;

  const handleClick = () => {
    if (currentStage < numStages - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  // Если заполнен хотя бы один этап, используем для всех отрисованных сегментов цвет текущего этапа
  const activeColor = currentStage >= 0 ? stageData[currentStage].color : null;

  return (
    <div
      style={{ cursor: "pointer", display: "inline-block" }}
      onClick={handleClick}
    >
      <svg width={size} height={size}>
        {/* Фоновый круг для незаполненной части */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="#eee"
          strokeWidth="20"
          fill="none"
        />
        {
          // Для каждого этапа: если индекс этапа больше currentStage – не отрисовываем
          // Если этап уже заполнен или является активным, передаём в Arc свойство color равное activeColor.
          stageData.map((stage, index) => {
            if (index > currentStage) return null;
            const startAngle = -90 + index * anglePerStage;
            const endAngle = startAngle + anglePerStage;
            const animate = index === currentStage;
            return (
              <Arc
                key={index}
                cx={cx}
                cy={cy}
                r={r}
                startAngle={startAngle}
                endAngle={endAngle}
                color={activeColor}
                animate={animate}
                animationDuration={animationDuration}
              />
            );
          })
        }
      </svg>
      {/* Текст, соответствующий текущему этапу */}
      <div style={{ textAlign: "center", marginTop: "10px", fontSize: "18px" }}>
        {currentStage >= 0 ? stageData[currentStage].text : "Начните"}
      </div>
    </div>
  );
};

// Пример данных
const stageData = [
  { color: "green", text: "Stage 1" },
  { color: "yellow", text: "Stage 2" },
  { color: "orange", text: "Stage 3" },
  { color: "red", text: "Stage 4" },
];

// Пример использования компонента
