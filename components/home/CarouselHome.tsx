import { useRef } from "react";
import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const bannerImages = [
  require("@/assets/images/banners/carousel-1.webp"),
  require("@/assets/images/banners/carousel-2.webp"),
  require("@/assets/images/banners/carousel-3.webp"),
  require("@/assets/images/banners/carousel-4.webp"),
  require("@/assets/images/banners/carousel-5.webp"),
  require("@/assets/images/banners/carousel-6.webp"),
  require("@/assets/images/banners/carousel-7.png"),
  require("@/assets/images/banners/carousel-8.png"),
];

export const CarouselHome = () => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <>
      <Carousel
        ref={ref}
        loop
        width={width - 32}
        height={200}
        autoPlay
        autoPlayInterval={3000}
        data={bannerImages}
        scrollAnimationDuration={800}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={item}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View className="mt-3 flex-row justify-center">
        <Pagination.Basic
          progress={progress}
          data={bannerImages}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#c4c4c4",
          }}
          activeDotStyle={{
            width: 20,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#d70119",
          }}
          containerStyle={{
            gap: 6,
          }}
          onPress={onPressPagination}
        />
      </View>
    </>
  );
};
