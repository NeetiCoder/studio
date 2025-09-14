import { ProgressCircle } from "@/components/common/progress-circle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

const mockGoals = [
  {
    title: "Career Advancement",
    description: "Get promoted to Senior Developer",
    progress: 75,
    icon: <TrendingUp className="w-8 h-8 text-accent" />,
  },
  {
    title: "Fitness Journey",
    description: "Run a half-marathon in under 2 hours",
    progress: 40,
    icon: <Target className="w-8 h-8 text-accent" />,
  },
  {
    title: "Personal Growth",
    description: "Read 24 books this year",
    progress: 92,
    icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter animated-gradient-text">
            Your Dashboard
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
            Track your progress and stay motivated. The future is yours to shape.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          {mockGoals.map((goal, index) => (
            <Card
              key={index}
              className="glassmorphism hover:border-accent transition-all duration-300 transform-style-3d hover:-translate-y-2 hover:[transform:rotateY(10deg)]"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold font-headline"><div>{goal.title}</div></CardTitle>
                {goal.icon}
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <p className="text-muted-foreground text-center h-10">{goal.description}</p>
                <ProgressCircle progress={goal.progress} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
