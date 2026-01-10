import { BlockHeader, BlockWrapper } from "@/components/blocks/block-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const gridCols = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function Features({
  eyebrow,
  title,
  subtitle,
  features,
  columns = 3,
  className,
}: Props) {
  return (
    <BlockWrapper className={className} spacing="lg" width="xl">
      <BlockHeader
        align="center"
        eyebrow={eyebrow}
        subtitle={subtitle}
        title={title}
      />

      <div
        className={cn(
          "stagger-children grid grid-cols-1 gap-6",
          gridCols[columns]
        )}
      >
        {features.map((feature) => (
          <Card
            className="card-shine border-foreground/5 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-foreground/10 hover:shadow-depth"
            key={feature.id}
          >
            <CardHeader>
              {feature.icon ? (
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              ) : null}
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </BlockWrapper>
  );
}
