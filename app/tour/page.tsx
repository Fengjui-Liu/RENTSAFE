import { TourExperience } from "@/components/tour-experience";

export default function TourPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">情境看房</h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          點開標記，看簽約前要確認什麼。不計分
        </p>
      </section>

      <TourExperience />
    </div>
  );
}
