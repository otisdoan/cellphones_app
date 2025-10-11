import { useRef } from "react";
import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export const CarouselHome = () => {
  const ref = useRef<ICarouselInstance>(null);
  const data = [1, 2, 3, 4, 5];
  const progress = useSharedValue<number>(0);

  const colors = ["#B0604D", "#899F9C", "#B3C680", "#5C6265", "#F5D399"];

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
        data={data}
        scrollAnimationDuration={800}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors[index % colors.length],
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Slide {index + 1}
            </Text>
          </View>
        )}
      />

      <View className="mt-3 flex-row justify-center">
        <Pagination.Basic
          progress={progress}
          data={data}
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
