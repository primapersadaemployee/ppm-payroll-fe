import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "keep-react";
import { HouseSimple } from "phosphor-react";
import BGBeranda from "/bg-beranda.webp";
import PlayStore from "/playstore.png";
import AppStore from "/appstore.png";

export default function HeroHome() {
  return (
    <div className="w-full h-auto bg-[#3629B7] rounded-lg">
      <div className="flex">
        <div className="w-[45%] p-10 flex flex-col gap-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HouseSimple size={20} weight="bold" color="#FFFFFF" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <span className="text-white font-medium">/</span>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white font-medium">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col justify-between h-full">
            <span className="font-semibold text-4xl text-white">
              Good Morning , <br /> PT Prima Persada Multimedia
            </span>
            <div className="flex gap-5">
              <img src={PlayStore} alt="Play Store" className="w-40 h-auto" />
              <img src={AppStore} alt="App Store" className="w-40 h-auto" />
            </div>
          </div>
        </div>
        <div className="w-[55%]">
          <img src={BGBeranda} alt="BG Beranda" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
