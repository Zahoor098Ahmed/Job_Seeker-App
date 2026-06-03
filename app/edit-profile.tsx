import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../state/store';
import { updateProfile } from '../state/userSlice';
import { getThemeColors } from '../lib/theme';

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);
  const themeMode = useAppSelector((s) => s.theme.mode);
  const palette = getThemeColors(themeMode);
  
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [nameError, setNameError] = useState('');

  const handleSave = () => {
    // Validation
    if (!name.trim()) {
      setNameError('Name is required');
      return;
    }
    
    if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return;
    }
    
    // Update profile
    dispatch(updateProfile({
      name: name.trim(),
      bio: bio.trim()
    }));
    
    // Navigate back
    router.back();
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: palette.background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={palette.text} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: palette.text }]}>Edit Profile</Text>
        <View style={styles.spacer} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
            <View style={[styles.avatarContainer, { backgroundColor: palette.primary }]}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: palette.text }]}>Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: palette.background,
                    color: palette.text,
                    borderColor: nameError ? '#ef4444' : palette.border
                  }
                ]}
                placeholder="Enter your name"
                placeholderTextColor={palette.mutedText}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (text.trim()) setNameError('');
                }}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: palette.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: palette.background,
                    color: palette.text,
                    borderColor: palette.border
                  }
                ]}
                value={user.email}
                editable={false}
                placeholderTextColor={palette.mutedText}
              />
              <Text style={[styles.hint, { color: palette.mutedText }]}>Email cannot be changed</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: palette.text }]}>Bio / Description</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { 
                    backgroundColor: palette.background,
                    color: palette.text,
                    borderColor: palette.border
                  }
                ]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={palette.mutedText}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <Text style={[styles.hint, { color: palette.mutedText }]}>{bio.length}/500 characters</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: palette.primary }]}
            onPress={handleSave}
            activeOpacity={0.9}
          >
            <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 100,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom:30,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});