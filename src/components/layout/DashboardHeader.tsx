"use client";

import { motion } from "framer-motion";

export default function DashboardHeader({ title, description }: { title: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-1">
                {description}
            </p>
        </motion.div>
    )
}
