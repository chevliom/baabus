"use client";

import { XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import Image from "next/image"; // Import next/image for optimized images

export const ShoppingCartByAnima = (): JSX.Element => {
  // Cart items data
  const cartItems = [
    {
      id: 1,
      name: "Bus Bottle",
      price: "₹14.00",
      quantity: 5,
      subtotal: "₹70.00",
      image: "/image-1.png",
    },
    {
      id: 2,
      name: "Bus Bottle",
      price: "₹14.00",
      quantity: 5,
      subtotal: "₹14.00",
      image: "/image-1.png",
    },
  ];

  return (
    <Card className="w-full rounded-lg border border-solid border-[#e6e6e6]">
      <CardContent className="p-0">
        {/* Table Header */}
        <div className="p-5 pb-0">
          <div className="flex w-full">
            <div className="w-2/5 font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[14px]">
              PRODUCT
            </div>
            <div className="w-1/5 font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[14px]">
              PRICE
            </div>
            <div className="w-1/5 font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[14px]">
              QUANTITY
            </div>
            <div className="w-1/5 font-CAPS-LOCK-medium-caps-lock text-gray-scalegray-500 text-[14px]">
              SUBTOTAL
            </div>
          </div>
          <Separator className="mt-3.5 w-full" />
        </div>

        {/* Cart Items */}
        {cartItems.map((item, index) => (
          <div key={item.id} className="px-5">
            <div className="flex items-center py-5">
              <div className="flex items-center gap-3 w-2/5">
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    className="absolute w-[70px] h-[70px] top-[15px] left-[15px] object-cover"
                    alt={item.name}
                    src={item.image}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="text-gray-scalegray-900 text-[14px]">{item.name}</div>
              </div>

              <div className="w-1/5 text-gray-scalegray-900 text-[14px]">
                {item.price}
              </div>

              <div className="w-1/5">
                <div className="flex items-center justify-center p-2 bg-gray-scalewhite rounded-[170px] border border-solid border-[#e6e6e6] w-fit">
                  <div className="relative w-[34px] h-[34px] bg-gray-scalegray-50 rounded-[170px] flex items-center justify-center">
                    <Image
                      className="w-[11px] h-0.5 object-cover"
                      alt="Decrease"
                      src="/group-2.png"
                      width={11}
                      height={1}
                    />
                  </div>
                  <div className="w-10 text-center text-gray-scalegray-900 text-[14px]">
                    {item.quantity}
                  </div>
                  <div className="relative w-[34px] h-[34px] bg-gray-scalegray-50 rounded-[170px] flex items-center justify-center">
                    <Image
                      className="w-[11px] h-[11px]"
                      alt="Increase"
                      src={index === 0 ? "/group-3.png" : "/group-5.png"}
                      width={11}
                      height={11}
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/5 flex items-center justify-between">
                <div className="font-medium text-gray-scalegray-900 text-[14px]">
                  {item.subtotal}
                </div>
                <button className="flex items-center justify-center">
                  <XIcon className="w-6 h-6 text-gray-scalegray-500" />
                </button>
              </div>
            </div>

            {index < cartItems.length - 1 && <Separator className="w-full" />}
          </div>
        ))}

        <Separator className="w-full" />

        {/* Footer */}
        <div className="flex justify-end p-4">
          <Button
            variant="secondary"
            className="rounded-[43px] px-8 py-3.5 bg-gray-scalegray-50 hover:bg-gray-scalegray-100"
          >
            <span className="text-gray-scalegray-700 text-[14px] leading-6">
              Return to shop
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
