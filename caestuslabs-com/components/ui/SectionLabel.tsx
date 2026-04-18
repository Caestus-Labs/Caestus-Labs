export default function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="font-[family-name:var(--font-mono)] text-xs text-text-secondary tracking-[0.2em] uppercase">
      {number} / {title}
    </div>
  )
}
