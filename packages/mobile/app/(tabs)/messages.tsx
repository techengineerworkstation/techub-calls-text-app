import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, fontSize } from "../../constants/theme";
import { sendSms } from "../../lib/api";

const MOCK_CONVERSATIONS = [
  { id: "1", name: "John Smith", number: "+1234567890", lastMessage: "Hey, are you available for a call?", time: "2:30 PM", unread: 2 },
  { id: "2", name: "Sarah Johnson", number: "+1987654321", lastMessage: "Thanks for the info!", time: "1:15 PM", unread: 0 },
  { id: "3", name: "Mike Davis", number: "+1555123456", lastMessage: "Let me know when you're free", time: "11:00 AM", unread: 1 },
  { id: "4", name: "Emily Brown", number: "+1444333222", lastMessage: "Got it, will do!", time: "Yesterday", unread: 0 },
];

const MOCK_MESSAGES: Record<string, { id: string; text: string; direction: "inbound" | "outbound"; time: string }[]> = {
  "1": [
    { id: "m1", text: "Hi there!", direction: "outbound", time: "2:25 PM" },
    { id: "m2", text: "Hey! How are you?", direction: "inbound", time: "2:27 PM" },
    { id: "m3", text: "Doing great, thanks!", direction: "outbound", time: "2:28 PM" },
    { id: "m4", text: "Hey, are you available for a call?", direction: "inbound", time: "2:30 PM" },
  ],
};

export default function MessagesScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === selected);
  const messages = selected ? MOCK_MESSAGES[selected] || [] : [];

  const handleSend = async () => {
    if (!messageText.trim() || !conversation) return;
    setSending(true);
    try {
      await sendSms(conversation.number, messageText.trim());
      setMessageText("");
    } catch {
      // handle error
    } finally {
      setSending(false);
    }
  };

  if (selected && conversation) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.teal[700]} />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <Text style={styles.chatName}>{conversation.name}</Text>
            <Text style={styles.chatNumber}>{conversation.number}</Text>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.direction === "outbound" ? styles.bubbleOut : styles.bubbleIn]}>
              <Text style={[styles.bubbleText, item.direction === "outbound" && { color: colors.white }]}>
                {item.text}
              </Text>
              <Text style={[styles.bubbleTime, item.direction === "outbound" && { color: colors.teal[100] }]}>
                {item.time}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.msgInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.gray[400]}
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, !messageText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!messageText.trim() || sending}
          >
            <Ionicons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.convItem} onPress={() => setSelected(item.id)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.convInfo}>
              <View style={styles.convTop}>
                <Text style={styles.convName}>{item.name}</Text>
                <Text style={styles.convTime}>{item.time}</Text>
              </View>
              <Text style={styles.convPreview} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream[50] },
  list: { paddingVertical: spacing.sm },
  convItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.teal[100],
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: fontSize.lg, fontWeight: "600", color: colors.teal[700] },
  convInfo: { flex: 1 },
  convTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  convName: { fontSize: fontSize.md, fontWeight: "600", color: colors.black },
  convTime: { fontSize: fontSize.xs, color: colors.gray[400] },
  convPreview: { fontSize: fontSize.sm, color: colors.gray[500], marginTop: 2 },
  badge: {
    backgroundColor: colors.teal[600],
    borderRadius: borderRadius.full,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "600", color: colors.white },
  // Chat styles
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    gap: spacing.md,
  },
  backBtn: { padding: spacing.xs },
  chatHeaderInfo: {},
  chatName: { fontSize: fontSize.md, fontWeight: "600", color: colors.black },
  chatNumber: { fontSize: fontSize.xs, color: colors.gray[500] },
  messagesList: { padding: spacing.lg, gap: spacing.sm },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  bubbleOut: {
    backgroundColor: colors.teal[600],
    alignSelf: "flex-end",
    borderBottomRightRadius: spacing.xs,
  },
  bubbleIn: {
    backgroundColor: colors.white,
    alignSelf: "flex-start",
    borderBottomLeftRadius: spacing.xs,
  },
  bubbleText: { fontSize: fontSize.md, color: colors.black },
  bubbleTime: { fontSize: 10, color: colors.gray[400], marginTop: 4, alignSelf: "flex-end" },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    gap: spacing.sm,
  },
  msgInput: {
    flex: 1,
    backgroundColor: colors.cream[50],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.black,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.teal[600],
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnDisabled: { backgroundColor: colors.gray[300] },
});
