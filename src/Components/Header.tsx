interface HeaderProps {
    label: string
}

const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-2 items-center justify-center">
            <h1 className="text-4xl font-bold ">
                Digital Hub
            </h1>
            <p className="text-gray-600 text-md">{label}</p>
        </div>
    )
}

export default Header
