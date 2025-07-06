import Image from "next/image";
import Logo from "../../assets/logo.png";
import leftarrow from "../../assets/customimage/leftArrow.png";
import rightarrow from "../../assets/customimage/rightArrow.png";
import cateimg1 from "../../assets/customimage/image-1.png";
import car from "../../assets/customimage/car.png";
import whishlist from "../../assets/customimage/whishlist.png";
import highlights from "../../assets/customimage/highlights.png";
import kid1 from "../../assets/customimage/kid1.png";
import kid2 from "../../assets/customimage/kid2.png";
import kid3 from "../../assets/customimage/kid3.png";
import bgImage from "../../assets/customimage/gridBg.png";
import bgImage1 from "../../assets/customimage/productBg.png";
import { IoMenuOutline } from "react-icons/io5";
import { Car, HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Input } from "@/ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function l1() {
    const isLoggedIn = Cookies.get("token");
    return (<>
        <div className="full-section border-[#5399DA] border-solid border-[2px]">
            <div className="header flex flex-row justify-between p-[15px] items-center">
                <div className="menu text-[40px] text-[#22609B]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z" fill="#22609B" />
                    </svg>

                </div>
                <div className="logo-content flex flex-row items-center gap-[25px]">
                    <div className="logo">
                        <div className="relative h-[32px] w-[82.72px] sm:h-[36px] sm:w-[90px] md:h-[40px] md:w-[100px] lg:h-[48px] lg:w-[120px] xl:h-[56px] xl:w-[140px]">
                            <Image
                                src={Logo}
                                alt="Frame"
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 90px, (max-width: 768px) 100px, (max-width: 1024px) 120px, 140px"
                            />
                        </div>


                    </div>
                    <div className="shopping-icons flex flex-row gap-[10px]">
                        <Link href="/cart" aria-label="Cart">
                            <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-pink-800 bg-pink-100">
                                <ShoppingCartIcon className="h-5 w-5 text-pink-600" />
                            </button>
                        </Link>
                        <Link href="/whishlist" aria-label="Wishlist">
                            <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-pink-800 bg-pink-100">
                                <HeartIcon className="h-4 w-4 fill-pink-600 text-pink-600" />
                            </button>
                        </Link>
                        <Link href={isLoggedIn ? "/profile" : "/default-channel/login"} aria-label="User Profile">
                            <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-yellow-600 bg-yellow-100">
                                <UserIcon className="h-4 w-4 fill-pink-600 text-pink-600" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header-search px-[15px] py-[5px]">
                <div className="flex flex-row items-center h-9 w-full rounded-full border-2 border-dashed border-pink-800 bg-blue-100 px-4">
                    <SearchIcon className="mr-2 h-5 w-5 text-blue-600" />
                    <Input
                        className="h-full flex-1 border-none bg-transparent text-sm placeholder-gray-500 focus:ring-0 focus:ring-offset-0"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="categories-sec">
                <div className="title">
                    <h3 className="text-[20px] text-[#B71557] capitalize pt-[20px] mb-[15px] text-center font-[600]" >Categories</h3>
                </div>
                <div className="categories-grid-content flex flex-row justify-center items-center">
                    <div className="categories-content-arrow">
                        <Image
                            src={leftarrow}
                            alt="Frame"
                            className=" "
                        />
                    </div>
                    <div className="categories-content-grid flex flex-row max-w-[375px] w-full justify-center gap-[25px]">
                        <div className="categories-content text-center ">
                            <Image src={cateimg1} alt="Frame"
                            />
                            <h3 className="text-[11px] text-[#22609B] capitalize mt-[8px] font-[500]">Water Bottle</h3>
                        </div>
                        <div className="categories-content text-center ">
                            <Image src={cateimg1} alt="Frame"
                            />
                            <h3 className="text-[11px] text-[#22609B] capitalize mt-[8px] font-[500]">Water Bottle</h3>
                        </div>
                        <div className="categories-content text-center ">
                            <Image src={cateimg1} alt="Frame"
                            />
                            <h3 className="text-[11px] text-[#22609B] capitalize mt-[8px] font-[500]">Water Bottle</h3>
                        </div>
                    </div>
                    <div className="categories-content-arrow">
                        <Image
                            src={rightarrow}
                            alt="Frame"
                            className=""
                        />
                    </div>
                </div>
            </div>


            <div className="grid-section">
                <div className="grid-content">
                    <div
                        className="left-content bg-cover bg-center bg-no-repeat p-6 text-white"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    >
                        <h3 className="text-2xl font-bold mb-4">s11ip, smile, and go!</h3>
                        <Image src={car} alt="Frame" className="mb-4" />
                        <button className="bg-pink-600 text-white px-4 py-2 rounded">shop now</button>
                    </div>
                </div>
            </div>

            <div className="safe-text">
                <h3 className="text-[12px] font-[500] bg-[#FDF1F6] py-[15px] border-t-2 border-b-2 border-dashed border-[#971248] text-[#971248]">
                    Safe, fun, and engaging toys to spark joy and creativity in every little one!
                </h3>
            </div>

            <div className="product-sec mt-[20px] px-[15px] flex flex-col justify-center">
                <div className="product-title text-[#EB5190] font-[700]" >
                    <h3 className="text-[14px]">Our Products</h3>
                    <h2 className="text-[24px] mt-[2px] mb-[10px]">Our <span className="text-[#5399DA]">Best Sellers</span> Products</h2>
                </div>
                <div className="product-grid-content flex flex-row justify-center gap-[20px]">
                    <div className="product-content relative">
                        <Image src={cateimg1} alt="Frame" className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded mb-[10px]" />
                        <Image src={whishlist} alt="Frame" className="absolute top-2 right-2" />
                        <div className="product-text">
                            <p className="text-[12px] font-[600]">BAABUS Magic Swing Car</p>
                            <h3 className="text-[14px] mt-[3px] font-[600]">Rs 890</h3>
                        </div>
                    </div>

                    <div className="product-content relative mt-[30px]">
                        <Image src={cateimg1} alt="Frame" className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded mb-[10px]" />
                        <Image src={whishlist} alt="Frame" className="absolute top-2 right-2" />
                        <div className="product-text">
                            <p className="text-[12px] font-[600]">BAABUS Magic Swing Car</p>
                            <h3 className="text-[14px] mt-[3px] font-[600]">Rs 890</h3>
                        </div>
                    </div>
                    <div className="product-content relative">
                        <Image src={cateimg1} alt="Frame" className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] rounded mb-[10px]" />
                        <Image src={whishlist} alt="Frame" className="absolute top-2 right-2" />
                        <div className="product-text">
                            <p className="text-[12px] font-[600]">BAABUS Magic Swing Car</p>
                            <h3 className="text-[14px] mt-[3px] font-[600]">Rs 890</h3>
                        </div>
                    </div>
                </div>
                <div className="view-all flex flex-row justify-center items-center mt-[20px]">
                    <Link
                        href="/products"
                        className="bg-pink-200 text-[#8B1C49] text-[14px] font-[700] rounded-full px-4 py-2 shadow-md">
                        View All Products
                    </Link>
                </div>
            </div>

            <div className="babus-highlight mt-[40px]">
                <div className="image text-center">
                    <Image src={highlights} alt="Frame" className="w-full" />
                </div>
            </div>

            <section className="py-10 bg-white text-center">
                {/* Title */}
                <h2 className="text-3xl font-bold  mb-[30px] underline decoration-dotted decoration-[3px] decoration-[#B71557] underline-offset-[6px] text-center mx-auto max-w-max">
                    <span className="text-[#22609B]">Kids </span>
                    <span className="text-[#B71557]">Gallery</span>
                </h2>


                {/* Images */}
                <div className="flex justify-center gap-6 px-4">
                    <div className="rounded-[40px] transform -rotate-3 ">
                        <Image src={kid1} alt="Kid 1" className=" " />
                    </div>

                    <div className="rounded-[40px] ">
                        <Image src={kid2} alt="Kid 2" className=" " />
                    </div>

                    <div className="rounded-[40px] transform rotate-3 ">
                        <Image src={kid3} alt="Kid 3" className=" " />
                    </div>
                </div>
            </section>

            <Card className="relative  overflow-hidden rounded-[20px] bg-[#61ab59]">
                <CardContent className="flex h-full items-center p-0 px-2">
                    <div className="flex w-full flex-row pl-[10px]">
                        {/* Left Text Block */}
                        <div className="flex max-w-[910px] flex-col justify-center">
                            <h2 className="font-fredoka text-[20px] z-10 mb-6 text-white">
                                Make Every Day a Toys <br /> Adventure foe
                                Your Little<br /> Explorers!
                            </h2>

                            <Button className="mt-2 flex w-fit items-center gap-[9px] rounded-[30px] bg-[#ffca24] px-4 py-6 text-black hover:bg-[#ffca24]/90">
                                <span className="font-fredoka z-10 text-xl leading-[32px]">READ BLOG</span>
                                <div className="flex h-[29px] w-[35px] items-center justify-center rounded-[17.5px/14.5px] bg-[#5c0047]">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            transform: "rotate(25.25deg)",
                                        }}
                                    >
                                        <line
                                            x1="2"
                                            y1="16"
                                            x2="16"
                                            y2="2"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <polyline
                                            points="11,2 16,2 16,7"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </Button>
                        </div>

                        {/* Right Image */}
                        <div className="z-10 ml-auto">
                            <img className="h-[319px] object-cover" alt="Toy image" src="/image-59.png" />
                        </div>
                    </div>

                    <img className="absolute bottom-0 z-[0] left-0" alt="Line" src="/line-4.svg" />

                </CardContent>
            </Card>

            <div className="bg-white w-full py-6 flex items-center justify-center border-t border-b">
                <div className="flex items-center gap-4">
                    {/* Simulated phone outline with arrows icon */}
                    <div className="w-12 h-12 border-2 rounded-md flex items-center justify-center text-black">
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6259 2.42871C9.74024 2.42871 8.89088 2.78053 8.26464 3.40677C7.6384 4.033 7.28659 4.88236 7.28659 5.768V11.6913C7.87602 11.4839 8.51858 11.4839 9.10802 11.6913V5.768C9.10802 4.93014 9.78802 4.25014 10.6259 4.25014H23.3759C24.2137 4.25014 24.8937 4.93014 24.8937 5.768V11.6913C25.4832 11.4839 26.1257 11.4839 26.7152 11.6913V5.768C26.7152 4.88236 26.3633 4.033 25.7371 3.40677C25.1109 2.78053 24.2615 2.42871 23.3759 2.42871H10.6259ZM26.448 13.6244C26.3646 13.5349 26.2641 13.4632 26.1524 13.4134C26.0407 13.3636 25.9201 13.3369 25.7978 13.3347C25.6755 13.3325 25.554 13.355 25.4406 13.4008C25.3272 13.4467 25.2242 13.5148 25.1378 13.6013C25.0513 13.6878 24.9831 13.7908 24.9373 13.9042C24.8915 14.0176 24.869 14.1391 24.8712 14.2613C24.8733 14.3836 24.9001 14.5042 24.9499 14.6159C24.9996 14.7276 25.0714 14.8282 25.1609 14.9116L27.2494 17.0001H21.5544C21.3129 17.0001 21.0813 17.0961 20.9105 17.2669C20.7397 17.4377 20.6437 17.6693 20.6437 17.9109C20.6437 18.1524 20.7397 18.384 20.9105 18.5548C21.0813 18.7256 21.3129 18.8216 21.5544 18.8216H27.2494L25.1609 20.9101C25.076 20.9944 25.0086 21.0947 24.9627 21.2052C24.9167 21.3156 24.893 21.4341 24.893 21.5537C24.893 21.6733 24.9167 21.7918 24.9627 21.9023C25.0086 22.0127 25.076 22.113 25.1609 22.1973C25.3316 22.3678 25.5631 22.4636 25.8044 22.4636C26.0458 22.4636 26.2773 22.3678 26.448 22.1973L30.0909 18.5544C30.2614 18.3837 30.3572 18.1522 30.3572 17.9109C30.3572 17.6695 30.2614 17.438 30.0909 17.2673L26.448 13.6244ZM24.8937 24.1304C25.4832 24.3378 26.1257 24.3378 26.7152 24.1304V28.2323C26.7152 29.1179 26.3633 29.9673 25.7371 30.5935C25.1109 31.2198 24.2615 31.5716 23.3759 31.5716H10.6259C10.1874 31.5716 9.75312 31.4852 9.34798 31.3174C8.94284 31.1496 8.57472 30.9036 8.26464 30.5935C7.6384 29.9673 7.28659 29.1179 7.28659 28.2323V24.1304C7.87602 24.3378 8.51858 24.3378 9.10802 24.1304V28.2323C9.10802 29.0701 9.78802 29.7501 10.6259 29.7501H23.3759C24.2137 29.7501 24.8937 29.0701 24.8937 28.2323V24.1304ZM6.7523 18.8216H12.4473C12.6888 18.8216 12.9205 18.7256 13.0913 18.5548C13.2621 18.384 13.358 18.1524 13.358 17.9109C13.358 17.6693 13.2621 17.4377 13.0913 17.2669C12.9205 17.0961 12.6888 17.0001 12.4473 17.0001H6.7523L8.84087 14.9116C8.93035 14.8282 9.00212 14.7276 9.05189 14.6159C9.10167 14.5042 9.12843 14.3836 9.13059 14.2613C9.13275 14.1391 9.11025 14.0176 9.06445 13.9042C9.01865 13.7908 8.95047 13.6878 8.86399 13.6013C8.77751 13.5148 8.6745 13.4467 8.5611 13.4008C8.4477 13.355 8.32623 13.3325 8.20395 13.3347C8.08167 13.3369 7.96108 13.3636 7.84936 13.4134C7.73765 13.4632 7.6371 13.5349 7.55373 13.6244L3.91087 17.2673C3.74033 17.438 3.64453 17.6695 3.64453 17.9109C3.64453 18.1522 3.74033 18.3837 3.91087 18.5544L7.55373 22.1973C7.72637 22.3582 7.95471 22.4457 8.19065 22.4416C8.42659 22.4374 8.6517 22.3418 8.81856 22.175C8.98542 22.0081 9.08099 21.783 9.08516 21.5471C9.08932 21.3111 9.00174 21.0828 8.84087 20.9101L6.7523 18.8216Z" fill="black" />
                        </svg>

                    </div>

                    {/* Text */}
                    <div className="text-left">
                        <h3 className="text-xl font-semibold text-black leading-tight">Babus App</h3>
                        <p className="text-sm text-black">Download the App</p>
                    </div>
                </div>
            </div>
        </div >
    </>)
}