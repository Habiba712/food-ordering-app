import Image from "next/image";
import pizza_hero from "../../../../public/images/pizza-hero.png"
import ArrowRight from "../icons/arrow_right";
import ramen_hero from "../../../../public/images/ramen_mushroom.png"

export default function Hero() {

    return (
        <section className="hero">

            {/* //* at first we used grid grid-cols-2 to get two identical cols, but 
            //* if we want to have a column shorter than the other we move to css, check global css */}

            <div className="py-12">
                <h1 className="text-4xl font-semibold leading-normal">
                    <span className="text-red-500 text-3xl font-semibold">안녕하세요! </span>
                    Welcome to our restaurant !!
                </h1>
                {/* <form className="flex flex-col gap-4">
    <input type="text" placeholder="이름을 입력해주세요" />
    <input type="text" placeholder="주소를 입력해주세요" />
    <input type="text" placeholder="전화번호를 입력해주세요" /> */}
                <p className="my-6 text-gray-500">
                    Craving the rich, bold flavors of Korea? You’re in the right                     place! From
                    sizzling Korean BBQ to comforting bibimbap, from crunchy kimchi to
                    heartwarming tteokbokki, we bring you an authentic taste of Korea
                    right here.
                </p>
                <div className="flex gap-4 text-sm ">
                    <button className="items-center text-white uppercase py-2 px-4 flex gap-2 rounded-full bg-red-600 "

                    >
                        Order now
                        <ArrowRight />


                    </button>
                    <button className=" text-gray-700 semibold py-2 px-4 flex gap-2 rounded-full">
                        Learn more
                        <ArrowRight />

                    </button>

                </div>
            </div>

            <div className="relative">

                {/* //* the layout fill and objectFit contain allowed The
                //* image to grow when another elemetn on the same section grew 
                //* like the h1, when we used text-4xl on it  */}

                <Image layout={'fill'}
                    objectFit={"contain"}
                    alt={"pizza-hero"} src={ramen_hero}

                />

            </div>
        </section>
    )
}

