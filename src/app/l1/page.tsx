import Image from "next/image";
import Logo from "../../assets/logo.png";
import leftarrow from "../../assets/customimage/leftArrow.png";
import rightarrow from "../../assets/customimage/rightArrow.png";
import cateimg1 from "../../assets/customimage/image-1.png";
import { IoMenuOutline } from "react-icons/io5";
import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Input } from "@/ui/input";

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
                    <h3>Categories</h3>
                </div>
                <div className="categories-content-arrow relative">
                    <Image
                        src={leftarrow}
                        alt="Frame"
                        width={67}
                        height={67}
                        className="max-w-[100px] absolute left-0"
                    />
                    <Image
                        src={rightarrow}
                        alt="Frame"
                        width={67}
                        height={67}
                        className="max-w-[100px] absolute right-0"
                    />
                </div>
                <div className="categories-content-grid">
                    <div className="categories-content ">
                        <Image src={cateimg1} alt="Frame" width={67} height={67}
                            className=""
                        />
                        <h3>Water Bottle</h3>
                    </div>
                </div>
            </div>
        </div>
    </>)
}