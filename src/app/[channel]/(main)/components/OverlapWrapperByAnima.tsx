"use client";

import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";

export const OverlapWrapperByAnima = (): JSX.Element => {
  return (
    <section className="relative w-full h-[225px] bg-[url(/rectangle-971.svg)] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 className="font-['Baloo-Regular',Helvetica] font-normal text-[#ea518f] text-8xl">
            Cart
          </h1>

          <Breadcrumb className="mt-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="font-['Poppins',Helvetica] font-medium text-black text-base"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-3.5 w-2" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-['Poppins',Helvetica] font-light text-black text-base">
                  Cart
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </section>
  );
};
