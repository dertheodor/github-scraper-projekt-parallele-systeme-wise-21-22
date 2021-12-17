/**
 * A list of allowed data types which we want to further inspect
 * @type {RegExp[]}
 */
const allowedFileExtensions = [
    // fortran file extensions
    /\.f$/i,
    /\.for$/i,
    /\.fpp$/i,
    /\.f77$/i,
    /\.ftn$/i,
    /\.f90$/i,
    /\.f95$/i,
    /\.f03$/i,
    /\.f08$/i,
    // c and c++ file extensions
    /\.c$/i,
    /\.cc$/i,
    /\.cats$/i,
    /\.idc$/i,
    /\.w$/i,
    /\.cp$/i,
    /\.cpp$/i,
    /\.c\+\+$/i,
    /\.cxx$/i,
    /\.o$/i,
    /\.hpp$/i,
    /\.h$/i,
    /\.hh$/i,
    /\.h\+\+$/i,
    /\.hxx$/i,
    /\.inc$/i,
    /\.inl$/i,
    /\.icc$/i,
    /\.ipp$/i,
    /\.tcc$/i,
    /\.tpp$/i,
]

module.exports = allowedFileExtensions;
