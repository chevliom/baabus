"use client";

import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const CartTotalByAnima = (): JSX.Element => {
  const cartData = {
    subtotal: "₹84.00",
    shipping: "Free",
    total: "₹84.00",
  };

  return (
    <Card className="w-full max-w-[424px] border border-[#e6e6e6] rounded-lg">
      <CardHeader className="pt-6 pb-0">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Cart Total
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-0">
          {/* Subtotal */}
          <div className="flex justify-between items-center py-3 bg-white shadow-sm">
            <span className="text-gray-700 text-sm">Subtotal:</span>
            <span className="text-gray-900 font-medium text-sm">
              {cartData.subtotal}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center py-3 bg-white shadow-sm">
            <span className="text-gray-700 text-sm">Shipping:</span>
            <span className="text-gray-900 font-medium text-sm">
              {cartData.shipping}
            </span>
          </div>

          <Separator className="my-4" />

          {/* Total */}
          <div className="flex justify-between items-center py-3 bg-white">
            <span className="text-gray-700 font-medium text-base">Total:</span>
            <span className="text-gray-900 font-semibold text-base">
              {cartData.total}
            </span>
          </div>
        </div>

        <Button className="w-full py-4 mt-4 bg-[#ea518f] hover:bg-[#d3407e] text-white rounded-full text-base font-semibold">
          Proceed to checkout
        </Button>
      </CardContent>
    </Card>
  );
};
