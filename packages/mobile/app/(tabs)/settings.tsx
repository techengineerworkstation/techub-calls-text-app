import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, fontSize } from "../../constants/theme";

export default function SettingsScreen() {
  const [callRecording, setCallRecording] = useState(true);
  const [voicemail, setVoicemail] = useState(false);
  const [notifCalls, setNotifCalls] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile */}
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>T</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>TechHub User</Text>
          <Text style={styles.profilePhone}>+1 (225) 513-7157</Text>
          <Text style={styles.profileSIP}>SIP: techengineerworkstation</Text>
        </View>
      </View>

      {/* Phone Settings */}
      <Text style={styles.sectionTitle}>Phone Settings</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="recording" size={20} color={colors.teal[600]} />
            <Text style={styles.rowLabel}>Call Recording</Text>
          </View>
          <Switch value={callRecording} onValueChange={setCallRecording} trackColor={{ true: colors.teal[600] }} />
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="voicemail" size={20} color={colors.teal[600]} />
            <Text style={styles.rowLabel}>Voicemail</Text>
          </View>
          <Switch value={voicemail} onValueChange={setVoicemail} trackColor={{ true: colors.teal[600] }} />
        </View>
      </View>

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="call" size={20} color={colors.teal[600]} />
            <Text style={styles.rowLabel}>Incoming Calls</Text>
          </View>
          <Switch value={notifCalls} onValueChange={setNotifCalls} trackColor={{ true: colors.teal[600] }} />
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="chatbubble" size={20} color={colors.teal[600]} />
            <Text style={styles.rowLabel}>Messages</Text>
          </View>
          <Switch value={notifMessages} onValueChange={setNotifMessages} trackColor={{ true: colors.teal[600] }} />
        </View>
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>App Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Phone Number</Text>
          <Text style={styles.rowValue}>+1 (225) 513-7157</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>SIP Connection</Text>
          <Text style={styles.rowValue}>techengineerworkstation</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream[50] },
  content: { padding: spacing.lg, paddingBottom: 40 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.xxl,
    gap: spacing.lg,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.teal[100],
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: { fontSize: fontSize.xxxl, fontWeight: "700", color: colors.teal[700] },
  profileInfo: { flex: 1 },
  profileName: { fontSize: fontSize.xl, fontWeight: "700", color: colors.black },
  profilePhone: { fontSize: fontSize.sm, color: colors.gray[500], marginTop: 2 },
  profileSIP: { fontSize: fontSize.xs, color: colors.gray[400], marginTop: 2 },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.gray[500],
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xxl,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowLabel: { fontSize: fontSize.md, color: colors.black },
  rowValue: { fontSize: fontSize.md, color: colors.gray[500] },
});
