import PropTypes from 'prop-types';

export const LinkedPostShape = PropTypes.shape({
  title: PropTypes.string,
  spoiler: PropTypes.string,
  date: PropTypes.string,
  slug: PropTypes.string,
});
