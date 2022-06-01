export interface SportSelectionTabParams {
  sports: SportsParams[];
  startRoute: string;
  onSportsChange: (sportSlug: string, sportId: string) => void;

  view(params: {slug: string}): Element;
}

export interface SportsParams {
  id: string;
  slug: string;
  // wlsSlug: string;
  // gameName: string;
  displayName: string;
  // imgUrl: string;
  iconUrl: string;
  // selectedIconUrl: string;
  // isSelected: boolean;
}
