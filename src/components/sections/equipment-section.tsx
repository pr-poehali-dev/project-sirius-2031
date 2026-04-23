import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const equipment = [
  {
    number: "01",
    title: "Моющий пылесос Flybot",
    category: "Уборочное оборудование",
    specs: "2500 Вт · Бак 30 л · Сухая и влажная уборка · 6 насадок",
    image: "https://cdn.poehali.dev/projects/5ff2c99d-9edb-4fec-9c37-086ca8bade14/bucket/ae879382-3cba-4baf-82bf-42d3e5950fb9.jpg",
  },
  {
    number: "02",
    title: "Пароочиститель Kärcher SC 2",
    category: "Пароочистители",
    specs: "1500 Вт · Давление 3.2 бар · Бак 1 л · Шланг 2 м",
    image: "https://cdn.poehali.dev/projects/5ff2c99d-9edb-4fec-9c37-086ca8bade14/bucket/a2e4ae3b-fd4b-4fe7-8552-39f3c942278d.jpg",
  },
  {
    number: "03",
    title: "Робот-мойщик окон",
    category: "Оконная техника",
    specs: "Автоматическая мойка стёкол · Лёгкость использования",
    image: "https://cdn.poehali.dev/projects/5ff2c99d-9edb-4fec-9c37-086ca8bade14/bucket/298df716-86ef-49a6-a401-12f610eb45df.jpg",
  },
  {
    number: "04",
    title: "Строительный пылесос Karcher KWD 3",
    category: "Строительная уборка",
    specs: "Мощный всасыватель · Для стройки и ремонта",
    image: "https://cdn.poehali.dev/projects/5ff2c99d-9edb-4fec-9c37-086ca8bade14/bucket/77fd687f-d302-4301-a93e-8981f635da37.jpg",
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
          className={`mb-6 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Оборудование
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Техника в аренду</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
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
  item: { number: string; title: string; category: string; specs: string; image: string }
  index: number
  isVisible: boolean
  onBook: () => void
}) {
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/30 hover:bg-foreground/10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-foreground/5">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="font-mono text-xs text-foreground/50 bg-black/30 backdrop-blur-sm rounded px-1.5 py-0.5">
            {item.number}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <p className="mb-1 font-mono text-xs text-foreground/50">{item.category}</p>
        <h3 className="mb-2 font-sans text-sm font-light leading-snug text-foreground md:text-base">
          {item.title}
        </h3>
        <p className="mb-3 hidden font-mono text-xs leading-relaxed text-foreground/40 md:block">{item.specs}</p>
        <button
          onClick={onBook}
          className="mt-auto flex items-center justify-center gap-1.5 rounded-full border border-foreground/20 px-3 py-1.5 font-mono text-xs text-foreground/70 transition-all hover:border-foreground/50 hover:text-foreground"
        >
          <Icon name="Calendar" size={11} />
          <span>Забронировать</span>
        </button>
      </div>
    </div>
  )
}
