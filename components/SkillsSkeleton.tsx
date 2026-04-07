import Skeleton from "./Skeleton";

export default function SkillsSkeleton() {
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <Skeleton height={24} width="150px" className="mx-auto mb-4" />
          <Skeleton height={48} width="400px" className="mx-auto mb-4" />
          <Skeleton height={20} width="500px" className="mx-auto" />
        </div>

        {/* Skills cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-[#1E2A45]/80">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#1E2A45]/60">
                <Skeleton variant="circle" height={40} width="40px" />
                <Skeleton height={20} width="100px" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} height={24} width="70px" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
