export const addressString = ({
  street,
  house,
  state,
  postalCode,
  city,
  country,
}) => {
  return `${street} / ${house} / ${city} / ${postalCode} / ${state} / ${country} `;
};
