type StyleType = {
  cardStyle: object;
};

const cardStyle = {
  marginLeft: 12,
  marginRight: 12,
  marginBottom: 8,
  paddingBottom: 2,
  maxWidth: 400,
};

export default function getStyles(): StyleType {
  return { cardStyle };
}
