import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { TextField } from '../components/TextField';
import { theme } from '../constants/theme';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-10 pb-12"
      >
        <AppText variant="hero" className="mb-2">
          Welcome back
        </AppText>

        <AppText
          variant="body"
          color={theme.colors.secondary}
          className="mb-8"
        >
          Sign in to keep your week smooth and stress-free.
        </AppText>

        <Card className="mb-6">
          <View className="gap-4">
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </Card>

        <Pressable className="mb-8">
          <AppText variant="bodySmall" color={theme.colors.secondary}>
            Forgot password?
          </AppText>
        </Pressable>

        <Button onPress={handleSignIn} className="mb-6">
          Continue
        </Button>

        <View className="flex-row items-center justify-center">
          <AppText variant="body" color={theme.colors.secondary}>
            Don't have an account?{' '}
          </AppText>
          <Pressable onPress={() => router.push('/auth/sign-up')}>
            <AppText variant="body" color={theme.colors.primary}>
              Sign up
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
