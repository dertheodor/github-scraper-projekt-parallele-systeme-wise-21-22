/**
 * A list of allowed data types which we want to further inspect
 * @type {string[]}
 */
const allowedFileExtensions = [
    // fortran file extensions
    '.F',
    '.FOR',
    '.FPP',
    '.F77',
    '.FTN',
    '.F90',
    '.F95',
    '.F03',
    '.F08',
    // c and c++ file extensions
    '.c',
    '.C',
    '.cc',
    '.cats',
    '.idc',
    '.w',
    '.cp',
    '.cpp',
    '.CPP',
    '.c++',
    '.cxx',
    '.CXX',
    '.o',
    '.hpp',
    '.h',
    '.hh',
    '.h++',
    '.H',
    '.hxx',
    '.Hxx',
    '.HXX',
    '.inc',
    '.inl',
    '.icc',
    '.ipp',
    '.tcc',
    '.tpp'
]

module.exports = allowedFileExtensions;
