"use client";

import Image from "next/image";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/cn";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

const MIN_POSITION = 0;
const MAX_POSITION = 100;
const DEFAULT_POSITION = 50;
const KEYBOARD_STEP = 5;

function clampPosition(value: number) {
  return Math.min(
    MAX_POSITION,
    Math.max(MIN_POSITION, value),
  );
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instructionsId = useId();

  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const bounds = container.getBoundingClientRect();

    if (bounds.width <= 0) {
      return;
    }

    const relativePosition = clientX - bounds.left;
    const percentage =
      (relativePosition / bounds.width) * 100;

    setPosition(clampPosition(percentage));
  }, []);

  function handlePointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    setIsDragging(true);
    updatePosition(event.clientX);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (!isDragging || !event.isPrimary) {
      return;
    }

    updatePosition(event.clientX);
  }

  function handlePointerEnd(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    setIsDragging(false);
  }

  function handleLostPointerCapture() {
    setIsDragging(false);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
  ) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();

        setPosition((currentPosition) =>
          clampPosition(
            currentPosition - KEYBOARD_STEP,
          ),
        );

        break;

      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();

        setPosition((currentPosition) =>
          clampPosition(
            currentPosition + KEYBOARD_STEP,
          ),
        );

        break;

      case "Home":
        event.preventDefault();
        setPosition(MIN_POSITION);
        break;

      case "End":
        event.preventDefault();
        setPosition(MAX_POSITION);
        break;

      default:
        break;
    }
  }

  const roundedPosition = Math.round(position);

  return (
    <div
      ref={containerRef}
      className={cn(
        `
          relative
          aspect-[4/3]
          w-full
          cursor-ew-resize
          touch-none
          select-none
          overflow-hidden
          bg-border
          sm:aspect-[16/10]
          lg:aspect-[16/9]
        `,
        isDragging && "cursor-grabbing",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={handleLostPointerCapture}
    >
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src={afterSrc}
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-background/90 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] backdrop-blur-sm md:left-6 md:top-6">
        After
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-background/90 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] backdrop-blur-sm md:right-6 md:top-6">
        Before
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          z-20
          w-px
          bg-white
          shadow-[0_0_12px_rgba(0,0,0,0.35)]
        "
        style={{
          left: `${position}%`,
        }}
      />

      <button
        type="button"
        role="slider"
        aria-label="Compare before and after images"
        aria-describedby={instructionsId}
        aria-orientation="horizontal"
        aria-valuemin={MIN_POSITION}
        aria-valuemax={MAX_POSITION}
        aria-valuenow={roundedPosition}
        aria-valuetext={`${roundedPosition}% after image visible`}
        onKeyDown={handleKeyDown}
        className="
          absolute
          top-1/2
          z-30
          flex
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/70
          bg-black/65
          text-white
          shadow-lg
          backdrop-blur-sm
          transition-transform
          duration-300
          hover:scale-105
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-black
        "
        style={{
          left: `${position}%`,
        }}
      >
        <span
          aria-hidden="true"
          className="flex items-center gap-1"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
          >
            <path
              d="M10 3 5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
          >
            <path
              d="m6 3 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p
        id={instructionsId}
        className="sr-only"
      >
        Use the left and right arrow keys to compare the
        images. Press Home to show only the before image and
        End to show the complete after image. {afterAlt}
      </p>
    </div>
  );
}