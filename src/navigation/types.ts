import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  CharacterDetail: { characterId: number };
  ComponentsShowcase: undefined;
};

export type SearchStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { characterId: number };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Saved: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
