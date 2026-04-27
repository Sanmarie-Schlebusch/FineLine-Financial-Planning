import React from "react";

interface LogoVariationProps {
  className?: string;
}

export function LogoVariation({ className = "size-10" }: LogoVariationProps) {
  return (
    <div className={`${className} rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center font-bold text-sm leading-tight`}>
      <div className="text-lg">FL</div>
      <div className="text-[8px] mt-0.5">FineLine</div>
      <div className="text-[6px] leading-none">Financial</div>
      <div className="text-[6px] leading-none">Planning</div>
    </div>
  );
}