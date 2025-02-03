import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from 'components/ScreenContent';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';
import { LoginDemo } from 'components/LoginDemo';
import { Container } from 'components/Container';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <Container>
      <LoginDemo />
      <Button
        onPress={() =>
          navigation.navigate('Home')
        }
        title="Home"
      />
    </Container>
  );
}
