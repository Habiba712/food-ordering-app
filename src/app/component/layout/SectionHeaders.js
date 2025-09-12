export default function SectionHeaders({subHeader,mainHeader}) {
    return (
        <div className="mt-4">
            <h3 className="text-gray-600 leading-4 uppercase semibold">{subHeader}</h3>
            <h2 className="text-red-600 font-bold text-bold text-4xl italic mb-4">{mainHeader}</h2>
        </div>

    )
}