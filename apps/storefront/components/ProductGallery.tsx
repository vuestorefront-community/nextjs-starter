"use client";
import { useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  type SfScrollableOnDragEndData,
} from '@storefront-ui/react';

import classNames from 'classnames';
import { Product } from '@vsf-enterprise/sap-commerce-webservices-sdk';
import Image from 'next/image';

interface ProductGalleryProps {
  images: Product['images'];
}

const transformImageUrl = (url: string) => {
  return new URL(url, process.env.NEXT_PUBLIC_SAPCC_BASE_URL).toString();
}

export default function GalleryVertical({ images }: ProductGalleryProps) {
  const lastThumbRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const firstThumbRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const firstThumbVisible = useIntersection(firstThumbRef, {
    root: thumbsRef.current,
    rootMargin: '0px',
    threshold: 1,
  });

  const lastThumbVisible = useIntersection(lastThumbRef, {
    root: thumbsRef.current,
    rootMargin: '0px',
    threshold: 1,
  });

  const onDragged = (event: SfScrollableOnDragEndData) => {
    if (event.swipeRight && activeIndex > 0) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
    } else if (event.swipeLeft && images && activeIndex < images.length - 1) {
      setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
    }
  };

  return (
    <div className="relative flex w-full max-h-[600px] aspect-[4/3]">
      <SfScrollable
        ref={thumbsRef}
        className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        direction="vertical"
        activeIndex={activeIndex}
        prevDisabled={activeIndex === 0}
        nextDisabled={images && activeIndex === images.length - 1}
        slotPreviousButton={
          <SfButton
            className={classNames('absolute !rounded-full z-10 top-4 rotate-90 bg-white', {
              hidden: firstThumbVisible?.isIntersecting,
            })}
            variant="secondary"
            size="sm"
            square
            slotPrefix={<SfIconChevronLeft size="sm" />}
          />
        }
        slotNextButton={
          <SfButton
            className={classNames('absolute !rounded-full z-10 bottom-4 rotate-90 bg-white', {
              hidden: lastThumbVisible?.isIntersecting,
            })}
            variant="secondary"
            size="sm"
            square
            slotPrefix={<SfIconChevronRight size="sm" />}
          />
        }
      >
        {images?.map(({ url, altText }, index, thumbsArray) => (
          <button
            // eslint-disable-next-line no-nested-ternary
            ref={index === thumbsArray.length - 1 ? lastThumbRef : index === 0 ? firstThumbRef : null}
            type="button"
            aria-label={altText}
            aria-current={activeIndex === index}
            key={`${altText}-${index}-thumbnail`}
            className={classNames(
              'md:w-[78px] md:h-auto relative shrink-0 pb-1 mx-4 -mb-2 border-b-4 snap-center cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0',
              {
                'border-primary-700': activeIndex === index,
                'border-transparent': activeIndex !== index,
              },
            )}
            onMouseOver={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
          >
            <Image alt={altText!} className="border border-neutral-200" width="78" height="78" src={transformImageUrl(url!)} />
          </button>
        ))}
      </SfScrollable>
      <SfScrollable
        className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        activeIndex={activeIndex}
        direction="vertical"
        wrapperClassName="h-full m-auto"
        buttonsPlacement="none"
        isActiveIndexCentered
        drag={{ containerWidth: true }}
        onDragEnd={onDragged}
      >
        {images?.map(({ url, altText }, index) => (
          <div key={`${altText}-${index}`} className="flex justify-center h-full basis-full shrink-0 grow snap-center">
            <Image
              aria-label={altText}
              aria-hidden={activeIndex !== index}
              className="object-contain w-auto h-full"
              alt={altText!}
              width="200" height="200"
              src={transformImageUrl(url!)}
            />
          </div>
        ))}
      </SfScrollable>
    </div>
  );
}