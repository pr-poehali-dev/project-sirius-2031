import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const pricing = [
  {
    title: "Моющий пылесос Flybot",
    category: "Уборочное оборудование",
    rates: [
      { days: "1 сутки", price: "950 ₽" },
      { days: "2 суток", price: "1 750 ₽" },
      { days: "3 суток", price: "2 550 ₽" },
    ],
    note: "Доставка обсуждается отдельно",
    direction: "top",
  },
  {
    title: "Пароочиститель Kärcher SC 2",
    category: "Пароочистители",
    rates: [
      { days: "1 сутки", price: "725 ₽" },
      { days: "2 суток", price: "1 300 ₽" },
      { days: "3 суток", price: "1 650 ₽" },
    ],
    note: "Доставка обсуждается отдельно",
    direction: "right",
  },
  {
    title: "Робот-мойщик окон",
    category: "Оконная техника",
    rates: [
      { days: "1 сутки", price: "425 ₽" },
      { days: "2 суток", price: "800 ₽" },
      { days: "3 суток", price: "1 050 ₽" },
    ],
    note: "Доставка обсуждается отдельно",
    direction: "left",
  },
  {
    title: "Строительный пылесос Karcher KWD 3",
    category: "Строительная уборка",
    rates: [
      { days: "1 сутки", price: "900 ₽" },
      { days: "2 суток", price: "1 700 ₽" },
      { days: "3 суток", price: "2 400 ₽" },
    ],
    note: "Доставка обсуждается отдельно",
    direction: "bottom",
  },
]

export function PricingSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Тарифы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Стоимость аренды</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-8 lg:gap-x-24">
          {pricing.map((item, i) => (
            <PricingCard
              key={i}
              item={item}
              index={i}
              isVisible={isVisible}
              onBook={() => scrollToSection?.(2)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  item,
  index,
  isVisible,
  onBook,
}: {
  item: typeof pricing[0]
  index: number
  isVisible: boolean
  onBook: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (item.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">{item.category}</span>
      </div>
      <h3 className="mb-3 font-sans text-xl font-light text-foreground md:text-2xl">{item.title}</h3>

      <div className="mb-3 flex gap-4">
        {item.rates.map((rate, ri) => (
          <div key={ri} className="flex-1 border-t border-foreground/10 pt-2">
            <p className="font-mono text-xs text-foreground/50 mb-1">{rate.days}</p>
            <p className="font-sans text-base font-light text-foreground md:text-lg">{rate.price}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-foreground/40">{item.note}</span>
        <button
          onClick={onBook}
          className="font-mono text-xs text-foreground/60 underline-offset-2 hover:text-foreground hover:underline transition-colors"
        >
          Забронировать →
        </button>
      </div>
    </div>
  )
}