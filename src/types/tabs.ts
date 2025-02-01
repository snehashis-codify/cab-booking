type TabValues = "signin" | "signup";
interface tabContentObj {
  value: TabValues;
  Content: React.FC;
}
export type TabContentArrType = Array<tabContentObj>;
