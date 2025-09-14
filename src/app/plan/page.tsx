import { PlanClientPage } from "./client-page";

export default function PlanPage() {
    return (
        <div className="min-h-screen py-12 bg-background">
            <div className="container mx-auto px-4">
                <header className="text-center mb-12">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter animated-gradient-text">
                        Create Your Strategy
                    </h1>
                    <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                        Define your goal, and let our AI forge a personalized path to your success. Start by filling out the details below.
                    </p>
                </header>
                <PlanClientPage />
            </div>
        </div>
    );
}
