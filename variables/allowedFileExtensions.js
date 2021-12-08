/**
 * A list of allowed data types which we want to further inspect
 * @type {RegExp[]}
 */
const allowedFileExtensions = [
    // fortran file extensions
    /\.f$/,
    /\.for$/,
    /\.fpp$/,
    /\.f77$/,
    /\.ftn$/,
    /\.f90$/,
    /\.f95$/,
    /\.f03$/,
    /\.f08$/,
    // c and c++ file extensions
    /\.c$/,
    /\.cc$/,
    /\.cats$/,
    /\.idc$/,
    /\.w$/,
    /\.cp$/,
    /\.cpp$/,
    /\.c\+\+$/,
    /\.cxx$/,
    /\.o$/,
    /\.hpp$/,
    /\.h$/,
    /\.hh$/,
    /\.h\+\+$/,
    /\.hxx$/,
    /\.inc$/,
    /\.inl$/,
    /\.icc$/,
    /\.ipp$/,
    /\.tcc$/,
    /\.tpp$/,
]

module.exports = allowedFileExtensions;
