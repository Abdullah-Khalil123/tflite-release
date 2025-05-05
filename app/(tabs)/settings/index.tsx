import AccountSettingCard from '@/components/AccountSettingCard';
import Heading from '@/components/Heading';
import LayoutWrapper2 from '@/components/LayoutWrapper2';
import ArrowSVG from '@/assets/Settings/arrow';
import LogoutSVG from '@/assets/Settings/logout';
import DarkModeToggle from '@/components/DarkModeToggle';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <LayoutWrapper2>
      <Heading title="Display Settings" className="mb-6" />
      <DarkModeToggle />
      <Heading title="Account settings" className="mb-6 mt-9" />
      <AccountSettingCard
        title="Change Password"
        onPress={() => router.push('/(tabs)/settings/change-password')}
        IconSvg={ArrowSVG}
        className="mb-6"
      />
      <AccountSettingCard
        title="Change Email"
        onPress={() => router.push('/(tabs)/settings/change-email')}
        IconSvg={ArrowSVG}
      />
      <Heading title="Log out" className="mb-6 mt-9" />
      <AccountSettingCard
        title="Log Out"
        onPress={() => {}}
        IconSvg={LogoutSVG}
      />
    </LayoutWrapper2>
  );
}
