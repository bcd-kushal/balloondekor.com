export type SVGType = {
  dimensions?: number | string;
  stroke?: string;
  fill?: string;
  className?: string;
};

export type SearchBarProps = {
  placeholder?: string;
  popupSide?: "top" | "right" | "bottom" | "left";
};

export type SearchBoxInputType = {
  placeholder: string;
  searchVal: string;
  onKeyUp: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export type SearchTagsType = {
  label: string;
  link: string;
  svg: JSX.Element;
}[];

export type SearchTagsListType = {
  _id: string;
  path: string;
  label: string;
}[];
