export const roadMapData = [
    {
        title: 'Q2 2024: Foundation & Launch',
        description: 'Completed the core features required for the initial launch of AstraPlan, focusing on AI strategy and user progress tracking.',
        status: 'completed',
        quarter: 'Q2 2024',
        tasks: [
            { name: 'AI Core: Strategy Generation Flow', detail: 'Implement Genkit flow for generating goal-based strategies.', done: true },
            { name: 'Frontend: Planning UI', detail: 'Build the user interface for inputting goals and displaying strategies.', done: true },
            { name: 'Dashboard: Visualization', detail: 'Create the dashboard page with progress circles to track goals.', done: true },
            { name: 'Initial Deployment', detail: 'Deploy the application to Firebase App Hosting.', done: true },
        ]
    },
    {
        title: 'Q3 2024: AI Enhancement & User Experience',
        description: 'Focusing on making the AI smarter and the user experience more interactive and insightful. This is the current focus.',
        status: 'in-progress',
        quarter: 'Q3 2024',
        tasks: [
            { name: 'AI Upgrade: Advanced Goal Analysis', detail: 'Enhance the prompt to understand more complex, nuanced goals.', done: false },
            { name: 'AI Tools: Domain-Specific Knowledge', detail: 'Integrate tools for the AI to fetch real-time, domain-specific data (e.g., fitness research, financial market trends).', done: false },
            { name: 'UX: Interactive Strategy Steps', detail: 'Allow users to check off steps in the strategy and update their goal progress automatically.', done: false },
            { name: 'Dashboard: Deeper Insights', detail: 'Add charts and analytics to the dashboard to show progress over time.', done: false },
        ]
    },
    {
        title: 'Q4 2024: Integrations & Workflow',
        description: 'Connect AstraPlan to the tools users already use to create a seamless planning and execution workflow.',
        status: 'planned',
        quarter: 'Q4 2024',
        tasks: [
            { name: 'API: Google Calendar Integration', detail: 'Allow users to sync strategy deadlines and milestones with their Google Calendar.', done: false },
            { name: 'API: Todoist/Asana Integration', detail: 'Enable exporting strategy steps as tasks in popular to-do applications.', done: false },
            { name: 'Notifications: Email & In-App Reminders', detail: 'Implement a system to remind users of upcoming deadlines and celebrate milestones.', done: false },
        ]
    },
    {
        title: 'Q1 2025: Collaboration & Growth',
        description: 'Expand AstraPlan to support teams and collaborative goal setting, fostering shared success.',
        status: 'planned',
        quarter: 'Q1 2025',
        tasks: [
            { name: 'Data Model: Team Workspaces', detail: 'Develop the database schema and logic for shared team spaces.', done: false },
            { name: 'Frontend: Collaborative UI', detail: 'Design and build interfaces for inviting team members and assigning goals.', done: false },
            { name: 'Real-Time: Shared Progress Sync', detail: 'Implement real-time updates for collaborative goals using Firestore.', done: false },
        ]
    },
    {
        title: 'Q2 2025: Going Mobile',
        description: 'Bring AstraPlan to users\' fingertips with dedicated mobile applications for planning on the go.',
        status: 'planned',
        quarter: 'Q2 2025',
        tasks: [
            { name: 'Mobile: iOS App Development', detail: 'Build the native iOS application using Swift or React Native.', done: false },
            { name: 'Mobile: Android App Development', detail: 'Build the native Android application using Kotlin or React Native.', done: false },
            { name: 'API: Secure Mobile Endpoints', detail: 'Create and secure API endpoints specifically for the mobile apps.', done: false },
        ]
    }
];
