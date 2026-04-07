import Skeleton from "./Skeleton";

export default function ProjectsSkeleton() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <Skeleton height={24} width="150px" className="mx-auto mb-4" />
          <Skeleton height={48} width="400px" className="mx-auto mb-4" />
          <Skeleton height={20} width="600px" className="mx-auto" />
        </div>

        {/* Filter buttons skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={32} width="120px" className="rounded-full" />
          ))}
        </div>

        {/* Project cards skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="card"
              height={420}
              className="rounded-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
