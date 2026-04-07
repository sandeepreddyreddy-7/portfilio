import Skeleton from "./Skeleton";

export default function ExperienceSkeleton() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton height={24} width="150px" className="mx-auto mb-4" />
          <Skeleton height={48} width="400px" className="mx-auto mb-4" />
          <Skeleton height={20} width="500px" className="mx-auto" />
        </div>

        {/* Timeline skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative pl-12">
                {/* Dot */}
                <Skeleton
                  variant="circle"
                  height={40}
                  width="40px"
                  className="absolute left-0 top-1"
                />

                {/* Card */}
                <div className="glass rounded-2xl p-6 border border-[#1E2A45]/80">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <Skeleton height={20} width="200px" className="mb-2" />
                      <Skeleton height={16} width="300px" />
                    </div>
                    <Skeleton height={24} width="100px" />
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-4">
                    {[...Array(2)].map((_, j) => (
                      <Skeleton key={j} height={16} width="100%" />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1E2A45]/40">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} height={24} width="60px" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
