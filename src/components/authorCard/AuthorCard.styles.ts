type StyleType = {
  cardStyle: object;
  showMoreStyle: object;
};

const cardStyle = {
  marginLeft: 12,
  marginRight: 12,
  marginBottom: 8,
  paddingBottom: 2,
  maxWidth: 400,
};

const showMoreStyle={
  color: "#1e7b85"
}
export default function getStyles(): StyleType {
  return { cardStyle, showMoreStyle };
}
