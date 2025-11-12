import { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
}

const { height } = Dimensions.get("window");

export default function StoreScreen() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#d70018");
    }, [])
  );

  // Danh sách cửa hàng CellphoneS (một số địa chỉ thực tế)
  const stores: Store[] = [
    {
      id: 1,
      name: "CellphoneS Nguyễn Trãi",
      address: "Số 3 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 10.7695,
      longitude: 106.6906,
    },
    {
      id: 2,
      name: "CellphoneS Thủ Đức",
      address: "216 Võ Văn Ngân, P. Bình Thọ, TP. Thủ Đức, TP.HCM",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 10.8506,
      longitude: 106.7717,
    },
    {
      id: 3,
      name: "CellphoneS Trần Hưng Đạo",
      address: "669 Trần Hưng Đạo, P. Lê Hồng Phong, TP. Quy Nhơn, Bình Định",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 13.7657,
      longitude: 109.2292,
    },
    {
      id: 4,
      name: "CellphoneS Hà Nội",
      address: "125 Thái Hà, P. Trung Liệt, Q. Đống Đa, Hà Nội",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 21.0126,
      longitude: 105.8194,
    },
    {
      id: 5,
      name: "CellphoneS Đà Nẵng",
      address: "125 Lê Văn Việt, P. Bình Thuận, Q. Hải Châu, Đà Nẵng",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 16.0544,
      longitude: 108.2022,
    },
    {
      id: 6,
      name: "CellphoneS Cần Thơ",
      address: "42 Mậu Thân, P. Xuân Khánh, Q. Ninh Kiều, Cần Thơ",
      phone: "1800 2097",
      hours: "8:00 - 21:00",
      latitude: 10.0341,
      longitude: 105.7725,
    },
  ];

  const handleStorePress = (store: Store) => {
    setSelectedStore(store);
    mapRef.current?.animateToRegion(
      {
        latitude: store.latitude,
        longitude: store.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const handleCallStore = () => {
    Linking.openURL("tel:18002097");
  };

  const handleDirections = (store: Store) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#d70018" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="storefront" size={28} color="white" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Hệ thống cửa hàng</Text>
            <Text style={styles.headerSubtitle}>
              {stores.length} cửa hàng trên toàn quốc
            </Text>
          </View>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 10.7769,
            longitude: 106.7009,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={store.address}
              onPress={() => setSelectedStore(store)}
            >
              <View style={styles.markerContainer}>
                <View
                  style={[
                    styles.marker,
                    selectedStore?.id === store.id && styles.markerSelected,
                  ]}
                >
                  <Ionicons name="storefront" size={20} color="white" />
                </View>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Selected Store Card */}
        {selectedStore && (
          <View style={styles.storeCard}>
            <View style={styles.storeCardHeader}>
              <View style={styles.storeCardTitle}>
                <Ionicons name="storefront" size={20} color="#d70018" />
                <Text style={styles.storeCardName}>{selectedStore.name}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedStore(null)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.storeCardContent}>
              <View style={styles.storeCardRow}>
                <Ionicons name="location" size={16} color="#6B7280" />
                <Text style={styles.storeCardText}>
                  {selectedStore.address}
                </Text>
              </View>
              <View style={styles.storeCardRow}>
                <Ionicons name="call" size={16} color="#6B7280" />
                <Text style={styles.storeCardText}>{selectedStore.phone}</Text>
              </View>
              <View style={styles.storeCardRow}>
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text style={styles.storeCardText}>{selectedStore.hours}</Text>
              </View>
            </View>

            <View style={styles.storeCardActions}>
              <TouchableOpacity
                style={styles.storeCardButton}
                onPress={handleCallStore}
              >
                <Ionicons name="call" size={18} color="white" />
                <Text style={styles.storeCardButtonText}>Gọi ngay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.storeCardButton,
                  styles.storeCardButtonSecondary,
                ]}
                onPress={() => handleDirections(selectedStore)}
              >
                <Ionicons name="navigate" size={18} color="#d70018" />
                <Text style={styles.storeCardButtonTextSecondary}>
                  Chỉ đường
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Store List */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Danh sách cửa hàng</Text>
        <ScrollView
          style={styles.storeList}
          showsVerticalScrollIndicator={false}
        >
          {stores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeItem,
                selectedStore?.id === store.id && styles.storeItemSelected,
              ]}
              onPress={() => handleStorePress(store)}
            >
              <View style={styles.storeItemHeader}>
                <View style={styles.storeItemIcon}>
                  <Ionicons name="storefront" size={20} color="#d70018" />
                </View>
                <View style={styles.storeItemContent}>
                  <Text style={styles.storeItemName}>{store.name}</Text>
                  <Text style={styles.storeItemAddress} numberOfLines={2}>
                    {store.address}
                  </Text>
                  <View style={styles.storeItemMeta}>
                    <View style={styles.storeItemMetaItem}>
                      <Ionicons name="call" size={12} color="#6B7280" />
                      <Text style={styles.storeItemMetaText}>
                        {store.phone}
                      </Text>
                    </View>
                    <View style={styles.storeItemMetaItem}>
                      <Ionicons name="time" size={12} color="#6B7280" />
                      <Text style={styles.storeItemMetaText}>
                        {store.hours}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#d70018",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 2,
  },
  mapContainer: {
    height: height * 0.4,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    backgroundColor: "#d70018",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerSelected: {
    backgroundColor: "#b8001a",
    transform: [{ scale: 1.2 }],
  },
  storeCard: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  storeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  storeCardTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  storeCardName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  storeCardContent: {
    gap: 8,
    marginBottom: 12,
  },
  storeCardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  storeCardText: {
    flex: 1,
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  storeCardActions: {
    flexDirection: "row",
    gap: 12,
  },
  storeCardButton: {
    flex: 1,
    backgroundColor: "#d70018",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  storeCardButtonSecondary: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d70018",
  },
  storeCardButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  storeCardButtonTextSecondary: {
    color: "#d70018",
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  storeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  storeItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  storeItemSelected: {
    borderColor: "#d70018",
    backgroundColor: "#FEF2F2",
  },
  storeItemHeader: {
    flexDirection: "row",
    gap: 12,
  },
  storeItemIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FEF2F2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  storeItemContent: {
    flex: 1,
  },
  storeItemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  storeItemAddress: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 6,
  },
  storeItemMeta: {
    flexDirection: "row",
    gap: 12,
  },
  storeItemMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  storeItemMetaText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
