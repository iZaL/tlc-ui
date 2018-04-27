import PropTypes from 'prop-types';

const UserProp = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
});

const CountryProp = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const DriverProp = PropTypes.shape({
  id: PropTypes.number,
  user: UserProp.isRequired,
  nationalities: PropTypes.arrayOf(CountryProp).isRequired,
});

const TripProp = PropTypes.shape({
  id: PropTypes.number,
  driver: DriverProp.isRequired,
});

export {DriverProp, UserProp, TripProp};
