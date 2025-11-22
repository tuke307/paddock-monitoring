import React from 'react';
import { View } from 'react-native';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useThemeContext } from '@/lib/hooks/useThemeContext';
import { Moon, Sun } from '@/lib/icons/Sun';

export function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useThemeContext();
  const isDark = colorScheme === 'dark';

  return (
    <View className='flex-row items-center gap-2 p-4'>
      <Sun className='text-foreground' size={18} />
      <Switch
        checked={isDark}
        onCheckedChange={toggleColorScheme}
        aria-label="Toggle theme"
      />
      <Moon className='text-foreground' size={18} />
    </View>
  );
}
