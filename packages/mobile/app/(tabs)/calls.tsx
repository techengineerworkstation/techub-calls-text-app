import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, fontSize } from "../../constants/theme";

const MOCK_CALLS = [
  { id: "1", name: "John Smith", number: "+1234567890", direction: "outbound" as const, status: "completed" as const, duration: "5:23", time: "2:30 PM", date: "Today" },
  { id: "2", name: "Sarah Johnson", number: "+1987654321", direction: "inbound" as const, status: "missed" as const, duration: "", time: "1:15 PM", date: "Today" },
  { id: "3", name: "Mike Davis", number: "+1555123456", direction: "outbound" as const, status: "completed" as const, duration: "12:45", time: "11:00 AM", date: "Today" },
  { id: "4", name: "Emily Brown", number: "+1444333222", direction: "inbound" as const, status: "completed" as const, duration: "3:12", time: "Yesterday", date: "Yesterday" },
  { id: "5", name: "Unknown", number: "+1777888999", direction: "inbound" as const, status: "missed" as const, duration: "", time: "Yesterday", date: "Yesterday" },
];

export default function CallsScreen() {
  const [filter, setFilter] = useState<"all" | "missed">("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_CALLS.filter((c) => {
    if (filter === "missed" && c.status !== "missed") return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.number.includes(search)) return false;
    return true;
  });

  const renderCall = ({ item }: { item: (typeof MOCK_CALLS)[0] }) => (
    <View style={styles.callItem}>
      <View style={[styles.directionIcon, { backgroundColor: item.status === "missed" ? colors.red + "15" : item.direction === "inbound" ? colors.green + "15" : colors.teal[50] }]}>
        <Ionicons
          name={item.direction === "inbound" ? "arrow-down" : "arrow-up"}
          size={16}
          color={item.status === "missed" ? colors.red : item.direction === "inbound" ? colors.green : colors.teal[600]}
        />
      </View>
      <View style={styles.callInfo}>
        <Text style={[styles.callName, item.status === "missed" && { color: colors.red }]}>{item.name}</Text>
        <Text style={styles.callNumber}>{item.number}</Text>
      </View>
      <View style={styles.callMeta}>
        <Text style={styles.callTime}>{item.time}</Text>
        {item.duration ? <Text style={styles.callDuration}>{item.duration}</Text> : null}
      </View>
      <TouchableOpacity style={styles.callBack}>
        <Ionicons name="call" size={18} color={colors.teal[600]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.gray[400]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search calls..."
          placeholderTextColor={colors.gray[400]}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filters}>
        {(["all", "missed"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === "all" ? "All Calls" : "Missed"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderCall}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="call-outline" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No calls found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream[50] },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fontSize.md, color: colors.black },
  filters: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
  },
  filterActive: { backgroundColor: colors.teal[600] },
  filterText: { fontSize: fontSize.sm, color: colors.gray[500], fontWeight: "500" },
  filterTextActive: { color: colors.white },
  list: { paddingHorizontal: spacing.lg },
  callItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  directionIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  callInfo: { flex: 1 },
  callName: { fontSize: fontSize.md, fontWeight: "600", color: colors.black },
  callNumber: { fontSize: fontSize.sm, color: colors.gray[500], marginTop: 2 },
  callMeta: { alignItems: "flex-end" },
  callTime: { fontSize: fontSize.xs, color: colors.gray[400] },
  callDuration: { fontSize: fontSize.xs, color: colors.gray[500], marginTop: 2 },
  callBack: { padding: spacing.sm },
  empty: { alignItems: "center", paddingTop: 60, gap: spacing.md },
  emptyText: { fontSize: fontSize.md, color: colors.gray[400] },
});
