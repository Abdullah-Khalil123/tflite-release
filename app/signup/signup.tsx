import { ResizingButton } from '@/components/Buttons/resizable';
import InputField1 from '@/components/InputFields/InputField1';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password) {
      ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        'https://signify-backend-gjut.onrender.com/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        ToastAndroid.show(
          'Account created successfully! Check Email',
          ToastAndroid.SHORT
        );
        router.push('/'); // Navigate to sign-in page
      } else {
        ToastAndroid.show(
          data.message || 'Registration failed',
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show('Network error. Please try again.', ToastAndroid.SHORT);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <View className="bg-white flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md">
          {/* Header */}
          <View className="items-center mb-10">
            <View className="bg-[#FFF6F5] p-4 rounded-full mb-4">
              <Feather name="user-plus" size={32} color="#F46A62" />
            </View>
            <Text className="font-poppins700 text-2xl text-center">
              Create Account
            </Text>
            <Text className="font-poppins400 text-gray-500 text-center mt-2">
              Sign up to get started
            </Text>
          </View>

          {/* Input Fields */}
          <InputField1
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => setName(text)}
            className="mb-4"
          />

          <InputField1
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="mb-4"
          />

          <InputField1
            placeholder="Password"
            value={password}
            type="Password"
            onChangeText={(text) => setPassword(text)}
          />

          {/* Sign Up Button */}
          <ResizingButton
            title="Create Account"
            onPress={handleSignUp}
            className="bg-[#F46A62] py-4 rounded-lg mt-8"
            textStyles="text-base text-white font-poppins600"
            isLoading={isLoading}
            isDisabled={isLoading}
          />

          {/* Sign In Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="font-poppins400 text-gray-600">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text className="font-poppins600 text-[#F46A62]">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LayoutWrapper>
  );
}
