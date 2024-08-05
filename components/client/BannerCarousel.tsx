import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import Banner from "../ui/serviceCategory/Banner";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

import { BannerDocument } from "@/schemas/cms/banner";
import { ImageDocument } from "@/schemas/cms/image";

export default function BannerCarousel({
  banners
}: {
  banners: BannerDocument[];
}) {
  const plugin = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: true
    })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        loop: true
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map(
          (
            { _id, desktop, mobile, url },
            index
          ) => (
            <CarouselItem key={index}>
              <Banner
                key={_id}
                desktop={desktop as ImageDocument}
                mobile={mobile as ImageDocument}
                url={url}
              />
            </CarouselItem>
          )
        )}
      </CarouselContent>
    </Carousel>
  );
}
