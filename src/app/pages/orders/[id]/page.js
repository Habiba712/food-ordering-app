import SectionHeaders from "../../../component/layout/SectionHeaders";

export default function OrdersPage() {
    return (
        <section className="mt-10">
            <div className="text-center">
               <SectionHeaders mainHeader={'Your Order'}  />
               <h1>You'll see your order here!</h1>
            </div>
        </section>
    )
}