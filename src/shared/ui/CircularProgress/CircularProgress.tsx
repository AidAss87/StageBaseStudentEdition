"use client";

import React, { useEffect, useState } from "react";
import styles from "./CircularProgress.module.css";

interface CircularProgressProps {
  value: number; // 0–100
  size?: number; // Размер круга (по умолчанию 100)
  strokeWidth?: number; // Толщина линии (по умолчанию 10)
  color?: string; // Цвет прогресса (по умолчанию #007bff)
  backgroundColor?: string; // Цвет фона круга (по умолчанию #e0e0e0)
  textColor?: string; // Цвет текста
  text?: string;
  fontSize?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 100,
  strokeWidth = 10,
  color = "#007bff",
  backgroundColor = "#e0e0e0",
  textColor = "#000",
  text = `${value}%`,
  fontSize = size / 5,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Состояние для анимации
  const [animatedValue, setAnimatedValue] = useState(0);

  // Анимация изменения значения
  useEffect(() => {
    const animationDuration = 1000; // Длительность анимации в миллисекундах
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / animationDuration, 1);
      setAnimatedValue(progress * value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value]);

  // Функция для создания сегмента круга
  const createSegment = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, startAngle);
    const end = polarToCartesian(center, center, radius, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${center} ${center} Z`;
  };

  // Функция для преобразования полярных координат в декартовы
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

  // Создаем сегменты
  const segments = [];
  const segmentCount = 4; // Количество сегментов
  const segmentAngle = 360 / segmentCount;
  const filledSegments = Math.floor((animatedValue / 100) * segmentCount);

  for (let i = 0; i < filledSegments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = (i + 1) * segmentAngle;
    segments.push(
      <path
        key={i}
        d={createSegment(startAngle, endAngle)}
        fill={color}
        stroke="none"
        className={styles.segment}
      />
    );
  }

  // Последний частично заполненный сегмент
  const partialSegmentAngle = (animatedValue / 100) * 360 - filledSegments * segmentAngle;
  if (partialSegmentAngle > 0) {
    const startAngle = filledSegments * segmentAngle;
    const endAngle = startAngle + partialSegmentAngle;
    segments.push(
      <path
        key="partial"
        d={createSegment(startAngle, endAngle)}
        fill={color}
        stroke="none"
        className={styles.segment}
      />
    );
  }

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.circularProgress}
      >
        {/* Фон круга */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Заполненные сегменты */}
        {segments}
      </svg>
      <p
        className="text-xs w-full text-center absolute left-0 top-1/2  -translate-y-1/2"
        style={{ width: size, color: textColor, fontSize: `${fontSize}px` }}
      >
        {text}
      </p>
    </div>
  );
};