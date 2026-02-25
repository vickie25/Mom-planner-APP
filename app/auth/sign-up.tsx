import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { theme } from '../constants/theme';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-10 pb-12"
      >
        <AppText variant="hero" className="mb-2">
          Create account
        </AppText>

        <AppText
          variant="body"
          color={theme.colors.secondary}
          className="mb-8"
        >
          Build a calm, shared rhythm for your family.
        </AppText>

        <Card className="mb-6">
          <View className="gap-4">
            <TextField
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </Card>

        <Button onPress={handleSignUp} className="mb-6">
          Create Account
        </Button>

        <View className="flex-row items-center justify-center">
          <AppText variant="body" color={theme.colors.secondary}>
            Already have an account?{' '}
          </AppText>
          <Pressable onPress={() => router.back()}>
            <AppText variant="body" color={theme.colors.primary}>
              Sign in
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
