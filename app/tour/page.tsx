import { TourExperience } from "@/components/tour-experience";

export default function TourPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)]">情境看房</h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
          點開標記，先猜再看答案。沒有分數，只有一份你可以帶去看房的清單。
        </p>
      </section>

      <TourExperience />
    </div>
  );
}
