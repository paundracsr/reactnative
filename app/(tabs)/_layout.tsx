import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#000000", // Background header gelap
        },
        headerTintColor: "#FFFFFF", // Warna teks header gold
        headerTitleStyle: {
          fontWeight: "bold",
          color: "#FFFFFF", // Teks header lebih premium
        },
        tabBarStyle: {
          backgroundColor: "#000000", // Dark background for tab bar
          borderTopColor: "#333", // Memberikan garis pemisah tipis pada tab bar
          borderTopWidth: 1, // Menambahkan border pada tab bar untuk tampilan lebih premium
        },
        tabBarActiveTintColor: "#FFFFFF", // Warna aktif ikon tab bar menjadi gold
        tabBarInactiveTintColor: "#B0B0B0", // Warna ikon tab bar tidak aktif menjadi abu-abu muda
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerLeft: () => <DrawerToggleButton />,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="List"
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
