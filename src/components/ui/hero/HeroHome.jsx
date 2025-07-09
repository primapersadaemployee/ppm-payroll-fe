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
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[45%] p-4 lg:p-10 flex flex-col gap-4 lg:gap-8">
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
          <div className="flex flex-col justify-between h-full gap-4 lg:gap-0">
            <span className="font-semibold text-2xl lg:text-4xl text-white">
              Good Morning , <br /> PT Prima Persada Multimedia
            </span>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-5">
              <img
                src={PlayStore}
                alt="Play Store"
                className="w-32 lg:w-40 h-auto"
              />
              <img
                src={AppStore}
                alt="App Store"
                className="w-32 lg:w-40 h-auto"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[55%] h-48 lg:h-auto">
          <img
            src={BGBeranda}
            alt="BG Beranda"
            className="w-full h-full object-cover lg:object-fill"
          />
        </div>
      </div>
    </div>
  );
}
