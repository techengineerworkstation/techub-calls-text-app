import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, fontSize } from "../../constants/theme";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "John Smith", phone: "+1234567890", email: "john@example.com", company: "Acme Inc" },
  { id: "2", name: "Sarah Johnson", phone: "+1987654321", email: "sarah@example.com", company: "Tech Corp" },
  { id: "3", name: "Mike Davis", phone: "+1555123456", email: "mike@example.com", company: "Design Studio" },
  { id: "4", name: "Emily Brown", phone: "+1444333222", email: "emily@example.com", company: "StartupXYZ" },
  { id: "5", name: "Alex Wilson", phone: "+1666777888", email: "alex@example.com", company: "Cloud Solutions" },
];

export default function ContactsScreen() {
  const [contacts] = useState(MOCK_CONTACTS);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
        <Text style={styles.contactCompany}>{item.company}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="call" size={18} color={colors.teal[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble" size={18} color={colors.teal[600]} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor={colors.gray[400]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No contacts found</Text>
          </View>
        }
      />

      <Modal visible={showAdd} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Contact</Text>
            <TextInput style={styles.input} placeholder="Name *" placeholderTextColor={colors.gray[400]} value={newName} onChangeText={setNewName} />
            <TextInput style={styles.input} placeholder="Phone *" placeholderTextColor={colors.gray[400]} value={newPhone} onChangeText={setNewPhone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.gray[400]} value={newEmail} onChangeText={setNewEmail} keyboardType="email-address" />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAdd(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={() => setShowAdd(false)}>
                <Text style={styles.saveText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream[50] },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fontSize.md, color: colors.black },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.teal[600],
    justifyContent: "center",
    alignItems: "center",
  },
  list: { paddingHorizontal: spacing.lg },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cream[200],
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: fontSize.lg, fontWeight: "600", color: colors.teal[700] },
  contactInfo: { flex: 1 },
  contactName: { fontSize: fontSize.md, fontWeight: "600", color: colors.black },
  contactPhone: { fontSize: fontSize.sm, color: colors.gray[500], marginTop: 2 },
  contactCompany: { fontSize: fontSize.xs, color: colors.gray[400], marginTop: 1 },
  contactActions: { flexDirection: "row", gap: spacing.sm },
  actionBtn: { padding: spacing.sm },
  empty: { alignItems: "center", paddingTop: 60, gap: spacing.md },
  emptyText: { fontSize: fontSize.md, color: colors.gray[400] },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: spacing.xxl,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    gap: spacing.md,
  },
  modalTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.black, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.cream[50],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.md, marginTop: spacing.sm },
  cancelBtn: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  cancelText: { fontSize: fontSize.md, color: colors.gray[500], fontWeight: "500" },
  saveBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.teal[600],
    borderRadius: borderRadius.lg,
  },
  saveText: { fontSize: fontSize.md, color: colors.white, fontWeight: "600" },
});
