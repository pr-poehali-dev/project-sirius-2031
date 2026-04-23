import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const equipment = [
  {
    number: "01",
    title: "Моющий пылесос Flybot",
    category: "Уборочное оборудование",
    specs: "2500 Вт · Бак 30 л · Сухая и влажная уборка · 6 насадок",
    direction: "left",
  },
  {
    number: "02",
    title: "Пароочиститель Kärcher SC 2",
    category: "Пароочистители",
    specs: "1500 Вт · Давление 3.2 бар · Бак 1 л · Шланг 2 м",
    direction: "right",
  },
  {
    number: "03",
    title: "Робот-мойщик окон",
    category: "Оконная техника",
    specs: "Автоматическая мойка стёкол · Лёгкость использования",
    direction: "left",
  },
  {
    number: "04",
    title: "Строительный пылесос Karcher KWD 3",
    category: "Строительная уборка",
    specs: "Мощный всасыватель · Для стройки и ремонта",
    direction: "right",
  },
]

export function EquipmentSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Оборудование
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Техника в аренду</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {equipment.map((item, i) => (
            <EquipmentCard
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

function EquipmentCard({
  item,
  index,
  isVisible,
  onBook,
}: {
  item: { number: string; title: string; category: string; specs: string; direction: string }
  index: number
  isVisible: boolean
  onBook: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return item.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/30 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
      }}
    >
      <div className="flex items-center gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 group-hover:text-foreground/50 md:text-base">
          {item.number}
        </span>
        <div>
          <h3 className="mb-0.5 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{item.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <span className="hidden font-mono text-xs text-foreground/40 md:block">{item.specs}</span>
        <button
          onClick={onBook}
          className="flex items-center gap-1.5 rounded-full border border-foreground/20 px-3 py-1.5 font-mono text-xs text-foreground/70 transition-all hover:border-foreground/50 hover:text-foreground"
        >
          <Icon name="Calendar" size={12} />
          <span>Забронировать</span>
        </button>
      </div>
    </div>
  )
}