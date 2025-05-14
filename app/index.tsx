import { ResizingButton } from '@/components/Buttons/resizable';
import InputField1 from '@/components/InputFields/InputField1';
import LayoutWrapper from '@/components/LayoutWrapper';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, ToastAndroid, View } from 'react-native';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleLogin = async () => {
    const response = await fetch(
      'https://signify-backend-gjut.onrender.com/api/auth/login',
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

    const data: LoginResponse = await response.json();

    if (response.ok) {
      router.replace('/(tabs)');
    } else {
      ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
    }
  };

  return (
    <LayoutWrapper>
      <View className="bg-white flex-1 items-center justify-center px-4">
        <View className="w-full">
          <Text className="text-center font-poppins500 text-lg leading-[27px] mb-8">
            Login to proceed
          </Text>
          <InputField1
            placeholder={'Email'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <InputField1
            placeholder={'Password'}
            value={password}
            type="Password"
            onChangeText={(text) => setPassword(text)}
            className="mt-6"
          />
          <Pressable
            onPress={() => setChecked(!isChecked)}
            className="my-8 flex-row items-center"
          >
            <Checkbox
              value={isChecked}
              color={'#F46A62'}
              style={{ width: 18, height: 18, borderRadius: 5 }}
            />
            <Text className="font-poppins500 ml-2.5 text-xs">Remember me</Text>
          </Pressable>

          <ResizingButton
            title="Sign in"
            onPress={() => {
              handleLogin();
            }}
            className="bg-[#F46A62] py-4"
            textStyles="text-base text-white"
            isLoading={false}
            isDisabled={false}
          />
          <Text className="text-xs leading-[18px] font-poppins500 my-6 text-center">
            Or
          </Text>

          <ResizingButton
            title="Sign Up"
            onPress={() => {
              router.replace('../signup/signup');
            }}
            className="bg-[#FFF6F5] py-4 border border-[#F46A62] mb-3"
            textStyles="text-base text-black"
            isLoading={false}
            isDisabled={false}
          />

          <ResizingButton
            title="Guest Login"
            // Icon={GoogleLogoSVG}
            onPress={() => {
              router.replace('/(tabs)');
            }}
            className="bg-[#FFF6F5] py-4 border border-[#F46A62]"
            textStyles="text-base text-black"
            isLoading={false}
            isDisabled={false}
          />
        </View>
      </View>
    </LayoutWrapper>
  );
}
