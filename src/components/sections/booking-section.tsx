import { useReveal } from "@/hooks/use-reveal"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import type { DateRange } from "react-day-picker"
import Icon from "@/components/ui/icon"

const equipmentList = [
  "Моющий пылесос Flybot",
  "Пароочиститель Kärcher SC 2",
  "Робот-мойщик окон",
  "Строительный пылесос Karcher KWD 3",
]

export function BookingSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [selectedEquipment, setSelectedEquipment] = useState<string>("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedEquipment || !dateRange?.from || !name || !phone) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setSelectedEquipment("")
    setDateRange(undefined)
    setName("")
    setPhone("")
  }

  const getDays = () => {
    if (!dateRange?.from || !dateRange?.to) return null
    const diff = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return diff
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Бронирование
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Выберите технику и дату</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left: Equipment select + contacts */}
          <div
            className={`space-y-5 transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div>
              <label className="mb-2 block font-mono text-xs text-foreground/60">Техника</label>
              <div className="space-y-2">
                {equipmentList.map((eq) => (
                  <button
                    key={eq}
                    onClick={() => setSelectedEquipment(eq)}
                    className={`flex w-full items-center gap-3 border-b py-2.5 text-left transition-all duration-200 ${
                      selectedEquipment === eq
                        ? "border-foreground/60 text-foreground"
                        : "border-foreground/10 text-foreground/60 hover:border-foreground/30 hover:text-foreground/80"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        selectedEquipment === eq ? "bg-foreground" : "bg-foreground/20"
                      }`}
                    />
                    <span className="font-sans text-sm md:text-base">{eq}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-foreground/60">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs text-foreground/60">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (000) 000-00-00"
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none"
                />
              </div>
            </div>

            {getDays() && selectedEquipment && (
              <div className="rounded-lg border border-foreground/20 bg-foreground/5 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="CheckCircle" size={14} className="text-foreground/70" />
                  <span className="font-mono text-xs text-foreground/60">Итого</span>
                </div>
                <p className="font-sans text-base text-foreground">{selectedEquipment}</p>
                <p className="font-mono text-sm text-foreground/60">
                  {getDays()} {getDays() === 1 ? "сутки" : getDays()! <= 4 ? "суток" : "суток"} аренды
                </p>
              </div>
            )}

            <MagneticButton
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              className="w-full"
            >
              {submitted ? "Заявка отправлена!" : "Отправить заявку"}
            </MagneticButton>
          </div>

          {/* Right: Calendar */}
          <div
            className={`flex justify-center transition-all duration-700 md:justify-start ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="w-full">
              <label className="mb-3 block font-mono text-xs text-foreground/60">Выберите даты аренды</label>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                disabled={{ before: new Date() }}
                className="rounded-lg border border-foreground/20 bg-foreground/5 p-3 text-foreground"
              />
              {dateRange?.from && !dateRange?.to && (
                <p className="mt-2 font-mono text-xs text-foreground/50">Выберите дату окончания</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}