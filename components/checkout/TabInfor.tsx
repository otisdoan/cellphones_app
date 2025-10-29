import React from "react";
import { View } from "react-native";
import ProductSelected from "./ProductSelected";
import InforCustomer from "./InforCustomer";
import InforReceive from "./InforReceive";

interface TabInforProps {
  onFormDataChange: (data: any) => void;
}

const TabInfor: React.FC<TabInforProps> = ({ onFormDataChange }) => {
  return (
    <View>
      <ProductSelected />
      <InforCustomer />
      <InforReceive onSubmit={onFormDataChange} />
    </View>
  );
};

export default TabInfor;
