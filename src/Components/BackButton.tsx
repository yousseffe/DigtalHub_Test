"use client"

import { Link } from "react-router-dom"

export const BackButton = ({
    herf,
    label,
}: {
    herf: string
    label: string
}) => {
    return (
        <Link
            to={herf}
            className="w-full text-center font-normal text-blue-500 hover:underline"
        >
            {label}
        </Link>
    )
}
