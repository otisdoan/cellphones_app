import React, { useState, useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

interface CarouselProductProps {
  array_image: string[] | null | undefined;
  variant_image?: string;
}

const CarouselProduct: React.FC<CarouselProductProps> = ({
  array_image,
  variant_image,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const images =
    variant_image && variant_image.trim() !== ""
      ? [variant_image, ...(array_image ?? [])]
      : (array_image ?? []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const handleThumbnailPress = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* Main Image Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.mainCarousel}
      >
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: item }}
              style={styles.mainImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Thumbnail Images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailContainer}
      >
        {images.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.thumbnail,
              currentIndex === index && styles.activeThumbnail,
            ]}
            onPress={() => handleThumbnailPress(index)}
          >
            <Image
              source={{ uri: item }}
              style={styles.thumbnailImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 32,
  },
  mainCarousel: {
    height: 320,
  },
  imageContainer: {
    width: width,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#d70019",
    width: 24,
  },
  thumbnailContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  activeThumbnail: {
    borderColor: "#d70019",
    borderWidth: 2,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
});

export default CarouselProduct;
