import PropTypes from 'prop-types';


export const TethysAppPropType = PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.string,
    package: PropTypes.string,
    urlNamespace: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string,
    exitUrl: PropTypes.string,
    rootUrl: PropTypes.string,
});
