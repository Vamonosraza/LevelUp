import { AreaChart, Layers, AppWindow } from 'lucide-react'

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const links:NavLink[] = [
    {
        href: '/add-job',
        label: 'add job',
        icon: <Layers />
    },
    {
        href: '/jobs',
        label: 'view jobs',
        icon: <AppWindow />
    },
    {
        href: '/stats',
        label: 'view stats',
        icon: <AreaChart />
    }
]