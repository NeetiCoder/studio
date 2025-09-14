export const roadMapData = [
    {
        title: 'Q2 2024: Foundation & Launch',
        description: 'Completed the core features required for the initial launch of AstraPlan, focusing on AI strategy and user progress tracking.',
        status: 'completed',
        quarter: 'Q2 2024',
        tasks: [
            { name: 'AI Core: Strategy Generation Flow', detail: 'Implemented Genkit flow for generating goal-based strategies using `ai.definePrompt`. (ETA: 2 weeks)', done: true },
            { name: 'Frontend: Planning UI', detail: 'Built the UI for goal input and strategy display using Next.js and ShadCN components. (ETA: 1.5 weeks)', done: true },
            { name: 'Dashboard: Visualization', detail: 'Created the dashboard with progress circles to track goals. (ETA: 1 week)', done: true },
            { name: 'Initial Deployment', detail: 'Deployed the app to Firebase App Hosting. (ETA: 0.5 weeks)', done: true },
        ]
    },
    {
        title: 'Q3 2024: AI Enhancement & User Experience',
        description: 'Focusing on making the AI smarter and the user experience more interactive and insightful. This is the current focus.',
        status: 'in-progress',
        quarter: 'Q3 2024',
        tasks: [
            { name: 'AI Upgrade: Advanced Goal Analysis', detail: 'Refine the `generateStrategySuggestionsPrompt` to better understand nuanced goals and provide more sophisticated, structured output. (ETA: 2 weeks)', done: false },
            { name: 'AI Tools: Domain-Specific Knowledge', detail: 'Integrate tools with `ai.defineTool` for the AI to fetch real-time data (e.g., use a search tool for fitness research or financial market trends). (ETA: 3 weeks)', done: false },
            { name: 'UX: Interactive Strategy Steps', detail: 'Allow users to check off strategy steps. This involves storing goals and progress in a database like Firestore. (ETA: 4 weeks)', done: false },
            { name: 'Dashboard: Deeper Insights', detail: 'Add charts (using `shadcn/ui` charts) to the dashboard to show progress over time, fetching data from Firestore. (ETA: 2 weeks)', done: false },
        ]
    },
    {
        title: 'Q4 2024: Integrations & Workflow',
        description: 'Connect AstraPlan to the tools users already use to create a seamless planning and execution workflow.',
        status: 'planned',
        quarter: 'Q4 2024',
        tasks: [
            { name: 'API: Google Calendar Integration', detail: 'Use the Google Calendar API to allow users to sync strategy deadlines and milestones. This requires setting up OAuth. (ETA: 4 weeks)', done: false },
            { name: 'API: Todoist/Asana Integration', detail: 'Enable exporting strategy steps as tasks in popular to-do apps via their respective APIs. (ETA: 4 weeks)', done: false },
            { name: 'Notifications: Email & In-App Reminders', detail: 'Implement a system (e.g., using Firebase Functions and a cron job) to remind users of upcoming deadlines and celebrate milestones. (ETA: 3 weeks)', done: false },
        ]
    },
    {
        title: 'Q1 2025: Collaboration & Growth',
        description: 'Expand AstraPlan to support teams and collaborative goal setting, fostering shared success.',
        status: 'planned',
        quarter: 'Q1 2025',
        tasks: [
            { name: 'Data Model: Team Workspaces', detail: 'Develop the Firestore schema and security rules for shared team spaces and collaborative goals. (ETA: 3 weeks)', done: false },
            { name: 'Frontend: Collaborative UI', detail: 'Design and build interfaces for inviting team members, assigning goals, and viewing team progress. (ETA: 5 weeks)', done: false },
            { name: 'Real-Time: Shared Progress Sync', detail: 'Implement real-time updates for collaborative goals using Firestore\'s real-time listeners. (ETA: 3 weeks)', done: false },
        ]
    },
];
