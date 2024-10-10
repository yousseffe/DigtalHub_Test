"use client"


import { BackButton } from "./BackButton"
import Header from "./Header"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHerf: string
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHerf,
}: CardWrapperProps) => {
    return (
        <div className="w-screen shadow-md px-4 mx-2 lg:w-1/3 md:w-2/3 rounded-xl border bg-card text-card-foreground dark:bg-card dark:text-card-foreground">
            <div className="p-6">
                <Header label={headerLabel} />
            </div>
            {children}
            <div className="p-3">
                <BackButton herf={backButtonHerf} label={backButtonLabel} />
            </div>
        </div>
    )
}
