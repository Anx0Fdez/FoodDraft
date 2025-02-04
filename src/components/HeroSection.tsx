import React from 'react'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import NutriaPrime from "../images/NutriaPRIME.png";
import Image from 'next/image'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { BlurFade } from './ui/blur-fade'
import { InteractiveHoverButtonDemo } from './InteractiveHoverButton';

export default function HeroSection() {
    return (
        <div>
            <div className="flex flex-col">
                <div className="relative flex flex-col-reverse md:flex-row items-center justify-between  px-6 md:px-12">
                    <div className="flex flex-col items-start w-full md:w-1/2 space-y-6">
                        <BlurFade delay={0.25} inView>
                            <div className="text-4xl max-w-[600px] w-auto h-auto lg:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-tight">
                                <h1>Crea, comparte y aprende recetas de forma sencilla con <span className='bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 text-transparent bg-clip-text'>FoodDraft</span></h1>
                            </div>
                        </BlurFade>
                        <BlurFade delay={0.25 * 2} inView>
                            <div className="max-w-[490px]">
                                <h2 className="md:text-lg lg:text-xl max-w-lg text-lg text-neutral-600 dark:text-neutral-400 font-normal"> Guarda, organiza y comparte tus recetas en un solo lugar mientras descubres nuevas creaciones de chefs, aficionados y amantes de la cocina de todo el mundo. </h2>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.25 * 2} inView>
                            <div className="w-auto">
                                <InteractiveHoverButtonDemo />
                            </div>
                        </BlurFade>


                    </div>
                    <div className="w-[600px] hidden p-2 md:w-1/2 md:flex lg:flex justify-center items-center z-10">
                        <AspectRatio
                            ratio={1 / 1}
                            className="flex items-center justify-center"
                        >
                            <BlurFade delay={0.25} inView>
                                <Image
                                    priority
                                    src={NutriaPrime.src}
                                    alt="Nutria naranja representativa de FoodDraft"
                                    width={1024}
                                    height={1024}
                                    className=""
                                />
                            </BlurFade>
                        </AspectRatio>
                    </div>
                </div>
            </div>
        </div>
    )
}