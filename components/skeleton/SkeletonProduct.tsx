import React from "react";
import { View, StyleSheet } from "react-native";
import Skeleton from "react-native-skeleton-placeholder";

const SkeletonProduct = () => {
  return (
    <View style={styles.container}>
      <Skeleton>
        <View style={styles.image} />
        <View style={styles.title} />
        <View style={styles.price} />
        <View style={styles.badge} />
        <View style={styles.rating} />
      </Skeleton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    margin: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    width: "90%",
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  price: {
    width: "60%",
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  badge: {
    width: "80%",
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  rating: {
    width: "40%",
    height: 12,
    borderRadius: 4,
  },
});

export default SkeletonProduct;
