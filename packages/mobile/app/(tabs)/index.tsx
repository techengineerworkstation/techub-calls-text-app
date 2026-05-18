import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, fontSize } from "../../constants/theme";
import { makeCall } from "../../lib/api";

const DIALPAD = [
  ["1", ""],
  ["2", "ABC"],
  ["3", "DEF"],
  ["4", "GHI"],
  ["5", "JKL"],
  ["6", "MNO"],
  ["7", "PQRS"],
  ["8", "TUV"],
  ["9", "WXYZ"],
  ["*", ""],
  ["0", "+"],
  ["#", ""],
];

function formatNumber(num: string): string {
  const digits = num.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export default function DialerScreen() {
  const [number, setNumber] = useState("");
  const [calling, setCalling] = useState(false);

  const handleDial = (digit: string) => {
    setNumber((prev) => prev + digit);
  };

  const handleDelete = () => {
    setNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = async () => {
    if (number.length < 3) return;
    setCalling(true);
    try {
      const result = await makeCall(number);
      if (result.success) {
        Alert.alert("Calling", `Dialing ${formatNumber(number)}...`);
      } else {
        Alert.alert("Error", result.error || "Failed to place call");
      }
    } catch {
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setCalling(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.numberText}>
          {number ? formatNumber(number) : "Enter number"}
        </Text>
      </View>

      <View style={styles.pad}>
        {DIALPAD.map(([digit, letters]) => (
          <TouchableOpacity
            key={digit}
            style={styles.key}
            onPress={() => handleDial(digit)}
            activeOpacity={0.7}
          >
            <Text style={styles.keyDigit}>{digit}</Text>
            {letters ? <Text style={styles.keyLetters}>{letters}</Text> : null}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
          <Ionicons name="backspace" size={24} color={colors.gray[500]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.callBtn,
            (number.length < 3 || calling) && styles.callBtnDisabled,
          ]}
          onPress={handleCall}
          disabled={number.length < 3 || calling}
        >
          <Ionicons name="call" size={28} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setNumber("")}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream[50],
    paddingTop: spacing.xxl,
  },
  display: {
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  numberText: {
    fontSize: fontSize.xxxl,
    fontWeight: "300",
    color: colors.black,
    letterSpacing: 1,
  },
  pad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
  },
  key: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  keyDigit: {
    fontSize: fontSize.xxl,
    fontWeight: "500",
    color: colors.black,
  },
  keyLetters: {
    fontSize: 9,
    fontWeight: "400",
    color: colors.gray[400],
    marginTop: -2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxl,
  },
  actionBtn: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  callBtn: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  callBtnDisabled: {
    backgroundColor: colors.gray[300],
    shadowOpacity: 0,
  },
  clearText: {
    fontSize: fontSize.sm,
    color: colors.gray[500],
    fontWeight: "500",
  },
});
